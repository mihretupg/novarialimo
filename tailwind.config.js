/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f5a623',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-gold': 'pulseGold 2.5s ease-in-out infinite',
        'drive-left': 'driveInLeft 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
        'drive-right': 'driveInRight 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
        'count-up': 'fadeIn 0.4s ease-out forwards',
        'border-spin': 'borderSpin 4s linear infinite',
        'reveal': 'revealUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(40px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-14px)' } },
        shimmer: { '0%': { backgroundPosition: '0% center' }, '100%': { backgroundPosition: '200% center' } },
        pulseGold: {
          '0%,100%': { boxShadow: '0 0 15px rgba(245,166,35,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(245,166,35,0.55), 0 0 80px rgba(245,166,35,0.15)' },
        },
        driveInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-90px) skewX(3deg)', filter: 'blur(4px)' },
          '70%': { filter: 'blur(0px)' },
          '100%': { opacity: '1', transform: 'translateX(0) skewX(0deg)', filter: 'blur(0px)' },
        },
        driveInRight: {
          '0%': { opacity: '0', transform: 'translateX(90px) skewX(-3deg)', filter: 'blur(4px)' },
          '70%': { filter: 'blur(0px)' },
          '100%': { opacity: '1', transform: 'translateX(0) skewX(0deg)', filter: 'blur(0px)' },
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(28px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        borderSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
