<# 
Novaria backend setup and launcher.

What it does:
1. Finds XAMPP PHP and MySQL tools.
2. Starts XAMPP MySQL/MariaDB if it is not already running.
3. Imports backend/database/schema.sql.
4. Seeds the admin and test rider accounts.
5. Starts the PHP backend at http://localhost:8000.

Run from PowerShell:
  .\scripts\setup_backend.ps1

Useful options:
  .\scripts\setup_backend.ps1 -BackendPort 8080
  .\scripts\setup_backend.ps1 -MySqlPassword "your-password"
  .\scripts\setup_backend.ps1 -SkipStartBackend
#>

[CmdletBinding()]
param(
    [string] $ProjectRoot = '',
    [string] $XamppRoot = 'C:\xampp',
    [string] $DbHost = '127.0.0.1',
    [int] $DbPort = 3306,
    [string] $DbName = 'novaria',
    [string] $MySqlUser = 'root',
    [string] $MySqlPassword = '',
    [string] $BackendHost = 'localhost',
    [int] $BackendPort = 8000,
    [string] $AdminEmail = 'admin@novaria.test',
    [string] $AdminPassword = 'AdminPass123',
    [string] $AdminName = 'Novaria Admin',
    [switch] $SkipImport,
    [switch] $SkipSeed,
    [switch] $SkipStartBackend
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Write-Step {
    param([string] $Message)
    Write-Host ""
    Write-Host "==> $Message" -ForegroundColor Cyan
}

function Write-Ok {
    param([string] $Message)
    Write-Host "OK: $Message" -ForegroundColor Green
}

function Write-Warn {
    param([string] $Message)
    Write-Host "WARN: $Message" -ForegroundColor Yellow
}

function Fail {
    param([string] $Message)
    throw $Message
}

function Require-File {
    param(
        [string] $Path,
        [string] $Label
    )
    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        Fail "$Label not found at: $Path"
    }
    return (Resolve-Path -LiteralPath $Path).Path
}

function New-MySqlArgs {
    $args = @(
        '--host', $DbHost,
        '--port', [string] $DbPort,
        '--user', $MySqlUser
    )

    if ($MySqlPassword.Length -gt 0) {
        $args += "--password=$MySqlPassword"
    }

    return $args
}

function Invoke-Native {
    param(
        [string] $FilePath,
        [string[]] $Arguments,
        [string] $FailureMessage,
        [string] $InputText = ''
    )

    if ($InputText.Length -gt 0) {
        $InputText | & $FilePath @Arguments
    } else {
        & $FilePath @Arguments
    }

    if ($LASTEXITCODE -ne 0) {
        Fail "$FailureMessage Exit code: $LASTEXITCODE"
    }
}

function Test-MySqlReady {
    param([string] $MysqlAdminExe)

    $args = New-MySqlArgs
    $args += 'ping'
    $output = & $MysqlAdminExe @args 2>$null
    return ($LASTEXITCODE -eq 0 -and ($output -join "`n") -match 'alive')
}

function Wait-ForMySql {
    param(
        [string] $MysqlAdminExe,
        [int] $TimeoutSeconds = 30
    )

    $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
    do {
        if (Test-MySqlReady -MysqlAdminExe $MysqlAdminExe) {
            return $true
        }
        Start-Sleep -Seconds 1
    } while ((Get-Date) -lt $deadline)

    return $false
}

function Start-XamppMySql {
    param(
        [string] $MysqlAdminExe,
        [string] $MysqlStartBat
    )

    if (Test-MySqlReady -MysqlAdminExe $MysqlAdminExe) {
        Write-Ok "MySQL/MariaDB is already running."
        return
    }

    Write-Warn "MySQL/MariaDB is not responding. Trying to start it with XAMPP..."
    if (-not (Test-Path -LiteralPath $MysqlStartBat -PathType Leaf)) {
        Fail "MySQL is not running and XAMPP start script was not found: $MysqlStartBat"
    }

    Start-Process `
        -FilePath 'cmd.exe' `
        -ArgumentList @('/c', "`"$MysqlStartBat`"") `
        -WorkingDirectory (Split-Path -Parent $MysqlStartBat) `
        -WindowStyle Hidden

    if (-not (Wait-ForMySql -MysqlAdminExe $MysqlAdminExe -TimeoutSeconds 45)) {
        Fail "MySQL/MariaDB did not become ready within 45 seconds. Open XAMPP Control Panel and check the MySQL logs."
    }

    Write-Ok "MySQL/MariaDB started."
}

function Test-HttpJson {
    param([string] $Url)

    try {
        $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5
        return ($response.StatusCode -ge 200 -and $response.StatusCode -lt 300)
    } catch {
        return $false
    }
}

function Start-Backend {
    param(
        [string] $PhpExe,
        [string] $Root,
        [string] $HostName,
        [int] $Port
    )

    $url = "http://${HostName}:${Port}/backend/api/session.php"
    if (Test-HttpJson -Url $url) {
        Write-Ok "Backend is already reachable at $url"
        return
    }

    $existing = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($null -ne $existing) {
        Fail "Port $Port is already in use by process $($existing.OwningProcess), but $url is not responding. Use -BackendPort with a free port."
    }

    $logsDir = Join-Path $Root 'logs'
    if (-not (Test-Path -LiteralPath $logsDir)) {
        New-Item -ItemType Directory -Path $logsDir | Out-Null
    }

    $stdout = Join-Path $logsDir 'php-backend.out.log'
    $stderr = Join-Path $logsDir 'php-backend.err.log'

    Start-Process `
        -FilePath $PhpExe `
        -ArgumentList @('-S', "${HostName}:${Port}") `
        -WorkingDirectory $Root `
        -WindowStyle Hidden `
        -RedirectStandardOutput $stdout `
        -RedirectStandardError $stderr

    $deadline = (Get-Date).AddSeconds(15)
    do {
        if (Test-HttpJson -Url $url) {
            Write-Ok "Backend started at $url"
            Write-Host "Logs: $stdout"
            Write-Host "Logs: $stderr"
            return
        }
        Start-Sleep -Seconds 1
    } while ((Get-Date) -lt $deadline)

    Fail "PHP backend did not become reachable at $url. Check logs in: $logsDir"
}

try {
    if ([string]::IsNullOrWhiteSpace($ProjectRoot)) {
        if ([string]::IsNullOrWhiteSpace($PSScriptRoot)) {
            $ProjectRoot = (Get-Location).Path
        } else {
            $ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
        }
    }

    Write-Step "Checking project and XAMPP paths"
    if (-not (Test-Path -LiteralPath $ProjectRoot -PathType Container)) {
        Fail "Project root does not exist: $ProjectRoot"
    }

    $phpExe = Require-File -Path (Join-Path $XamppRoot 'php\php.exe') -Label 'XAMPP PHP'
    $mysqlExe = Require-File -Path (Join-Path $XamppRoot 'mysql\bin\mysql.exe') -Label 'XAMPP mysql.exe'
    $mysqlAdminExe = Require-File -Path (Join-Path $XamppRoot 'mysql\bin\mysqladmin.exe') -Label 'XAMPP mysqladmin.exe'
    $mysqlStartBat = Join-Path $XamppRoot 'mysql_start.bat'
    $schemaPath = Require-File -Path (Join-Path $ProjectRoot 'backend\database\schema.sql') -Label 'Database schema'
    $seedAdminPath = Require-File -Path (Join-Path $ProjectRoot 'backend\database\seed_admin.php') -Label 'Admin seed script'
    $seedUsersPath = Require-File -Path (Join-Path $ProjectRoot 'backend\database\seed_test_users.php') -Label 'Test users seed script'
    Write-Ok "Required files found."

    Write-Step "Starting/checking MySQL"
    Start-XamppMySql -MysqlAdminExe $mysqlAdminExe -MysqlStartBat $mysqlStartBat

    if (-not $SkipImport) {
        Write-Step "Importing database schema"
        $schemaSql = Get-Content -Raw -LiteralPath $schemaPath
        Invoke-Native `
            -FilePath $mysqlExe `
            -Arguments (New-MySqlArgs) `
            -InputText $schemaSql `
            -FailureMessage 'Failed to import database schema.'
        Write-Ok "Schema imported into MySQL. Database: $DbName"
    } else {
        Write-Warn "Skipping schema import because -SkipImport was supplied."
    }

    if (-not $SkipSeed) {
        Write-Step "Seeding admin and test users"
        $env:NOVARIA_DB_HOST = $DbHost
        $env:NOVARIA_DB_PORT = [string] $DbPort
        $env:NOVARIA_DB_NAME = $DbName
        $env:NOVARIA_DB_USER = $MySqlUser
        $env:NOVARIA_DB_PASS = $MySqlPassword

        Invoke-Native `
            -FilePath $phpExe `
            -Arguments @($seedAdminPath, $AdminEmail, $AdminPassword, $AdminName) `
            -FailureMessage 'Failed to seed admin user.'

        Invoke-Native `
            -FilePath $phpExe `
            -Arguments @($seedUsersPath) `
            -FailureMessage 'Failed to seed test users.'

        Write-Ok "Users seeded."
    } else {
        Write-Warn "Skipping user seeds because -SkipSeed was supplied."
    }

    Write-Step "Verifying database contents"
    $verifySql = "USE $DbName; SHOW TABLES; SELECT id, full_name, email, role, auth_provider FROM users ORDER BY id;"
    Invoke-Native `
        -FilePath $mysqlExe `
        -Arguments (New-MySqlArgs) `
        -InputText $verifySql `
        -FailureMessage 'Database verification failed.'

    if (-not $SkipStartBackend) {
        Write-Step "Starting/checking PHP backend"
        $env:NOVARIA_DB_HOST = $DbHost
        $env:NOVARIA_DB_PORT = [string] $DbPort
        $env:NOVARIA_DB_NAME = $DbName
        $env:NOVARIA_DB_USER = $MySqlUser
        $env:NOVARIA_DB_PASS = $MySqlPassword
        $env:NOVARIA_FRONTEND_URL = 'http://localhost:5173'
        $env:NOVARIA_ALLOWED_ORIGINS = 'http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174'

        Start-Backend -PhpExe $phpExe -Root $ProjectRoot -HostName $BackendHost -Port $BackendPort
    } else {
        Write-Warn "Skipping backend start because -SkipStartBackend was supplied."
    }

    Write-Step "Done"
    Write-Host "Database: $DbName"
    Write-Host "Backend:  http://${BackendHost}:${BackendPort}/backend/api/session.php"
    Write-Host "Login:    http://127.0.0.1:5173/#login"
    Write-Host ""
    Write-Host "Admin: admin@novaria.test / AdminPass123"
    Write-Host "User:  rider@novaria.test / RiderPass123"
    Write-Host "User:  client@novaria.test / ClientPass123"
} catch {
    Write-Host ""
    Write-Host "SETUP FAILED" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Checks to try:" -ForegroundColor Yellow
    Write-Host "- Make sure XAMPP is installed at: $XamppRoot"
    Write-Host "- Make sure MySQL is not blocked by another service on port $DbPort"
    Write-Host "- If root has a password, rerun with: -MySqlPassword `"your-password`""
    Write-Host "- If port $BackendPort is busy, rerun with: -BackendPort 8080"
    exit 1
}
