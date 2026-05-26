import { useCallback, useEffect, useMemo, useState } from 'react';
import { Calendar, Car, CheckCircle, Clock, DollarSign, Home, LogOut, RefreshCw, ShieldCheck, UserRound, Users } from 'lucide-react';
import { api } from '../lib/api';

const STATUSES = ['pending', 'confirmed', 'assigned', 'completed', 'cancelled'];

function money(value) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

function niceDate(date, time) {
  if (!date) return 'TBD';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${date}T${time || '00:00'}`));
}

export default function Dashboard({ user, onLogout }) {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [serviceMix, setServiceMix] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.role === 'admin';

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const bookingData = await api.bookings();
      setBookings(bookingData.bookings || []);
      if (isAdmin) {
        const adminData = await api.adminStats();
        setStats(adminData.stats);
        setServiceMix(adminData.service_mix || []);
      }
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (!user) {
      window.location.hash = '#login';
      return;
    }
    const timer = setTimeout(() => {
      load();
    }, 0);
    return () => clearTimeout(timer);
  }, [load, user]);

  const userMetrics = useMemo(() => {
    const upcoming = bookings.filter((booking) => !['completed', 'cancelled'].includes(booking.status)).length;
    const completed = bookings.filter((booking) => booking.status === 'completed').length;
    return [
      { label: 'Total rides', value: bookings.length, icon: Car },
      { label: 'Upcoming', value: upcoming, icon: Calendar },
      { label: 'Completed', value: completed, icon: CheckCircle },
    ];
  }, [bookings]);

  const logout = async () => {
    await api.logout();
    onLogout();
    window.location.hash = '#home';
  };

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen section-bg">
      <header className="border-b border-theme bg-black text-white dark:bg-black">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt="" className="h-14 w-14 rounded-full border border-gold-500/40 object-cover" />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/10">
                {isAdmin ? <ShieldCheck className="text-gold-400" /> : <UserRound className="text-gold-400" />}
              </div>
            )}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">{isAdmin ? 'Admin Dashboard' : 'User Dashboard'}</p>
              <h1 className="mt-1 text-2xl font-black">{user.full_name}</h1>
              <p className="text-sm text-white/55">{user.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => { window.location.hash = '#home'; }} className="btn-outline flex items-center gap-2 border-white/20 px-4 py-3 text-white">
              <Home size={17} /> Site
            </button>
            <button onClick={load} className="btn-outline flex items-center gap-2 border-white/20 px-4 py-3 text-white">
              <RefreshCw size={17} /> Refresh
            </button>
            <button onClick={logout} className="btn-primary flex items-center gap-2 px-4 py-3">
              <LogOut size={17} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {isAdmin ? (
          <AdminDashboard stats={stats} serviceMix={serviceMix} bookings={bookings} loading={loading} onUpdated={load} />
        ) : (
          <UserDashboard metrics={userMetrics} bookings={bookings} loading={loading} />
        )}
      </div>
    </main>
  );
}

function UserDashboard({ metrics, bookings, loading }) {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="card-luxury p-6">
              <Icon className="mb-5 text-gold-400" size={26} />
              <p className="text-4xl font-black text-theme">{metric.value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-theme-subtle">{metric.label}</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <BookingList bookings={bookings} loading={loading} />
        <div className="surface-bg border border-theme p-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">Concierge Notes</p>
          <h2 className="mt-3 text-2xl font-black text-theme">Ride readiness</h2>
          <div className="mt-6 space-y-4">
            {['Confirm pickup address before dispatch', 'Keep your phone available near pickup time', 'Status changes appear here once admin confirms'].map((item) => (
              <div key={item} className="flex gap-3 border-b border-theme pb-4 last:border-0">
                <CheckCircle className="mt-0.5 flex-shrink-0 text-gold-400" size={18} />
                <p className="text-sm leading-6 text-theme-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function AdminDashboard({ stats, serviceMix, bookings, loading, onUpdated }) {
  const cards = [
    { label: 'Bookings', value: stats?.total_bookings || 0, icon: Car },
    { label: 'Pending', value: stats?.pending_bookings || 0, icon: Clock },
    { label: 'Users', value: stats?.total_users || 0, icon: Users },
    { label: 'Quoted revenue', value: money(stats?.quoted_revenue), icon: DollarSign },
  ];

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="card-luxury p-6">
              <Icon className="mb-5 text-gold-400" size={26} />
              <p className="text-3xl font-black text-theme">{card.value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-theme-subtle">{card.label}</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.7fr_1.3fr]">
        <div className="surface-bg border border-theme p-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">Demand Mix</p>
          <h2 className="mt-3 text-2xl font-black text-theme">Services</h2>
          <div className="mt-6 space-y-4">
            {serviceMix.length ? serviceMix.map((item) => (
              <div key={item.service_type}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-bold text-theme">{item.service_type}</span>
                  <span className="text-theme-muted">{item.total}</span>
                </div>
                <div className="h-2 bg-black/[0.06] dark:bg-white/[0.06]">
                  <div className="h-full bg-gold-500" style={{ width: `${Math.min(100, Number(item.total) * 18)}%` }} />
                </div>
              </div>
            )) : <p className="text-sm text-theme-muted">No bookings yet.</p>}
          </div>
        </div>

        <AdminBookings bookings={bookings} loading={loading} onUpdated={onUpdated} />
      </section>
    </div>
  );
}

function BookingList({ bookings, loading }) {
  return (
    <section className="surface-bg border border-theme p-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">Ride Timeline</p>
          <h2 className="mt-3 text-2xl font-black text-theme">My bookings</h2>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-theme-muted">Loading bookings...</p>
      ) : bookings.length ? (
        <div className="space-y-3">
          {bookings.map((booking) => <BookingRow key={booking.id} booking={booking} />)}
        </div>
      ) : (
        <p className="text-sm text-theme-muted">No saved bookings yet. Book a ride and it will appear here when you are signed in.</p>
      )}
    </section>
  );
}

function BookingRow({ booking }) {
  return (
    <article className="border border-theme bg-black/[0.02] p-4 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-black text-theme">{booking.service_type}</p>
          <p className="mt-1 text-sm text-theme-muted">{booking.pickup} to {booking.dropoff || 'TBD'}</p>
        </div>
        <StatusPill status={booking.status} />
      </div>
      <div className="mt-4 grid gap-3 text-sm text-theme-muted sm:grid-cols-3">
        <span><Calendar className="mr-2 inline text-gold-400" size={15} />{niceDate(booking.ride_date, booking.ride_time)}</span>
        <span><Clock className="mr-2 inline text-gold-400" size={15} />{booking.ride_time?.slice(0, 5)}</span>
        <span><Car className="mr-2 inline text-gold-400" size={15} />{booking.vehicle_type || 'No preference'}</span>
      </div>
    </article>
  );
}

function AdminBookings({ bookings, loading, onUpdated }) {
  return (
    <section className="surface-bg border border-theme p-6">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">Operations</p>
        <h2 className="mt-3 text-2xl font-black text-theme">Booking control</h2>
      </div>

      {loading ? (
        <p className="text-sm text-theme-muted">Loading operations board...</p>
      ) : bookings.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-theme text-xs uppercase tracking-widest text-theme-subtle">
                <th className="py-3 pr-4">Client</th>
                <th className="py-3 pr-4">Trip</th>
                <th className="py-3 pr-4">Schedule</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Quote</th>
                <th className="py-3">Save</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <AdminBookingRow key={booking.id} booking={booking} onUpdated={onUpdated} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-theme-muted">No bookings yet.</p>
      )}
    </section>
  );
}

function AdminBookingRow({ booking, onUpdated }) {
  const [status, setStatus] = useState(booking.status);
  const [price, setPrice] = useState(booking.quoted_price || '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await api.updateBooking({ id: booking.id, status, quoted_price: price });
      await onUpdated();
    } finally {
      setSaving(false);
    }
  };

  return (
    <tr className="border-b border-theme align-top last:border-0">
      <td className="py-4 pr-4">
        <p className="font-black text-theme">{booking.full_name}</p>
        <p className="mt-1 text-xs text-theme-muted">{booking.phone}</p>
        <p className="mt-1 text-xs text-theme-muted">{booking.user_email || 'Guest booking'}</p>
      </td>
      <td className="py-4 pr-4">
        <p className="font-bold text-theme">{booking.service_type}</p>
        <p className="mt-1 max-w-xs text-xs leading-5 text-theme-muted">{booking.pickup} to {booking.dropoff || 'TBD'}</p>
      </td>
      <td className="py-4 pr-4 text-theme-muted">
        <p>{niceDate(booking.ride_date, booking.ride_time)}</p>
        <p className="mt-1 text-xs">{booking.ride_time?.slice(0, 5)}</p>
      </td>
      <td className="py-4 pr-4">
        <select className="input-luxury px-3 py-2 text-sm" value={status} onChange={(event) => setStatus(event.target.value)}>
          {STATUSES.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </td>
      <td className="py-4 pr-4">
        <input className="input-luxury w-24 px-3 py-2 text-sm" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="0.00" />
      </td>
      <td className="py-4">
        <button onClick={save} disabled={saving} className="btn-primary px-4 py-2 text-xs font-black disabled:opacity-60">
          {saving ? 'Saving' : 'Save'}
        </button>
      </td>
    </tr>
  );
}

function StatusPill({ status }) {
  const tone = {
    pending: 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30',
    confirmed: 'bg-green-500/15 text-green-500 border-green-500/30',
    assigned: 'bg-blue-500/15 text-blue-500 border-blue-500/30',
    completed: 'bg-white/10 text-theme border-theme',
    cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
  }[status] || 'bg-white/10 text-theme border-theme';

  return (
    <span className={`inline-flex w-fit border px-3 py-1 text-xs font-black uppercase tracking-widest ${tone}`}>
      {status}
    </span>
  );
}
