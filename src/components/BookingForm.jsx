import { useEffect, useRef, useState } from 'react';
import { AlertCircle, Briefcase, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Clock, Heart, MessageSquare, Plane, Users } from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_NUMBER, FLEET } from '../data';
import ParallaxBg from './ParallaxBg';
import { api } from '../lib/api';

function useInView(t = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [t]);
  return [ref, inView];
}

const SERVICE_TYPES = [
  { id: 'airport', label: 'Airport Transfer', icon: Plane },
  { id: 'corporate', label: 'Corporate Travel', icon: Briefcase },
  { id: 'wedding', label: 'Wedding & Events', icon: Heart },
  { id: 'hourly', label: 'Hourly Service', icon: Clock },
  { id: 'group', label: 'Group Transportation', icon: Users },
];

const STEPS = ['Service', 'Details', 'Confirm'];

const EMPTY = {
  fullName: '', phone: '', pickup: '', dropoff: '',
  date: '', time: '', serviceType: '', vehicleType: '', specialRequest: '',
};

function buildWhatsAppMessage(d) {
  const dropoff = d.dropoff || 'N/A';
  const vehicle = d.vehicleType || 'No preference';
  const notes = d.specialRequest || 'None';

  return encodeURIComponent(
    `*NOVARIA LIMO | NEW BOOKING REQUEST*\n` +
    `-----------------------------------\n\n` +
    `*CLIENT*\n` +
    `Name: ${d.fullName}\n` +
    `Phone: ${d.phone}\n\n` +
    `*TRIP DETAILS*\n` +
    `Service: ${d.serviceType}\n` +
    `Vehicle: ${vehicle}\n` +
    `Date: ${d.date}\n` +
    `Time: ${d.time}\n\n` +
    `*ROUTE*\n` +
    `Pickup: ${d.pickup}\n` +
    `Drop-off: ${dropoff}\n\n` +
    `*NOTES*\n` +
    `${notes}\n\n` +
    `*STATUS:* PENDING CONFIRMATION\n` +
    `Please confirm availability and quote.`
  );

}

function buildSmsMessage(d) {
  const dropoff = d.dropoff || 'N/A';
  const vehicle = d.vehicleType || 'No preference';
  const notes = d.specialRequest || 'None';

  return encodeURIComponent(
    `NOVARIA LIMO BOOKING REQUEST\n` +
    `Status: PENDING CONFIRMATION\n\n` +
    `Client: ${d.fullName}\n` +
    `Phone: ${d.phone}\n` +
    `Service: ${d.serviceType}\n` +
    `Vehicle: ${vehicle}\n` +
    `Date/Time: ${d.date} at ${d.time}\n` +
    `Pickup: ${d.pickup}\n` +
    `Drop-off: ${dropoff}\n` +
    `Notes: ${notes}\n\n` +
    `Please confirm availability and quote.`
  );

}

function Field({ label, id, type = 'text', value, onChange, placeholder, required, min, error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-theme-subtle uppercase tracking-widest">
        {label} {required && <span className="text-gold-400">*</span>}
      </label>
      <input id={id} type={type} value={value} onChange={onChange}
        placeholder={placeholder} required={required} min={min}
        className="input-luxury w-full px-4 py-3.5 rounded-xl text-sm" />
      {error && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={11}/>{error}</p>}
    </div>
  );
}

export default function BookingForm({ preselectedVehicle }) {
  const [sectionRef, inView] = useInView();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitMethod, setSubmitMethod] = useState('WhatsApp');
  const [bookingStatus, setBookingStatus] = useState('');
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const vehicleDropdownRef = useRef(null);

  useEffect(() => {
    if (!preselectedVehicle) return;
    const timer = setTimeout(() => {
      setForm(f => ({ ...f, vehicleType: preselectedVehicle }));
    }, 0);
    return () => clearTimeout(timer);
  }, [preselectedVehicle]);

  useEffect(() => {
    const closeVehicleDropdown = (e) => {
      if (!vehicleDropdownRef.current?.contains(e.target)) setVehicleOpen(false);
    };
    document.addEventListener('mousedown', closeVehicleDropdown);
    return () => document.removeEventListener('mousedown', closeVehicleDropdown);
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(er => ({ ...er, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (step === 0 && !form.serviceType) errs.serviceType = 'Please select a service';
    if (step === 1) {
      if (!form.fullName.trim()) errs.fullName = 'Required';
      if (!form.phone.trim())    errs.phone    = 'Required';
      if (!form.pickup.trim())   errs.pickup   = 'Required';
      if (!form.dropoff.trim() && form.serviceType !== 'Hourly Service') errs.dropoff = 'Required';
      if (!form.date) errs.date = 'Required';
      if (!form.time) errs.time = 'Required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validate()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const saveBooking = () => {
    setBookingStatus('Saving booking to dashboard...');
    api.createBooking(form)
      .then(() => setBookingStatus('Saved to the Novaria dashboard.'))
      .catch((error) => setBookingStatus(error.message));
  };

  const submit = () => {
    saveBooking();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(form)}`, '_blank');
    setSubmitMethod('WhatsApp');
    setSubmitted(true);
  };

  const submitSms = () => {
    saveBooking();
    window.open(`sms:${PHONE_NUMBER}?&body=${buildSmsMessage(form)}`, '_self');
    setSubmitMethod('SMS');
    setSubmitted(true);
  };

  const reset = () => { setForm(EMPTY); setStep(0); setSubmitted(false); setSubmitMethod('WhatsApp'); setBookingStatus(''); setErrors({}); };

  return (
    <section id="booking" ref={sectionRef} className="relative py-24 overflow-hidden section-bg">
      <ParallaxBg factor={0.20} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gold-500/[0.03] blur-[150px]" />
      <ParallaxBg factor={0.38} className="top-0 right-0 w-72 h-72 rounded-full bg-gold-500/[0.025] blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: info */}
          <div className={`lg:sticky lg:top-32 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400 mb-4">Reserve Your Ride</p>
            <h2 className="playfair text-4xl md:text-5xl font-bold text-theme mb-6">
              Book Your<br />
              <span className="text-gradient-gold italic">Luxury Journey</span>
            </h2>
            <p className="text-theme-muted leading-relaxed mb-10">
              Complete the form and send your booking details through WhatsApp or direct SMS. Our team responds within 15 minutes.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { num:'01', title:'Choose Your Service',  desc:'Select from airport, corporate, wedding, or hourly.' },
                { num:'02', title:'Fill Trip Details',     desc:'Pickup, drop-off, date, time, and preferences.' },
                { num:'03', title:'Send Your Request',     desc:"Choose WhatsApp or SMS, then we'll confirm pricing in minutes." },
              ].map((s) => (
                <div key={s.num} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                    <span className="text-xs font-black text-gold-400">{s.num}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-theme mb-1">{s.title}</p>
                    <p className="text-xs text-theme-muted leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {['Instant Confirmation','24/7 Support','No Hidden Fees'].map((b) => (
                <div key={b} className="flex items-center gap-2 text-xs text-theme-muted px-3 py-2 rounded-full border border-theme">
                  <CheckCircle size={12} className="text-gold-400" />{b}
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {submitted ? (
              <SuccessCard onReset={reset} form={form} submitMethod={submitMethod} bookingStatus={bookingStatus} />
            ) : (
              <div className="glass rounded-3xl p-8 gold-border">
                {/* Step indicator */}
                <div className="flex items-center gap-0 mb-8">
                  {STEPS.map((s, i) => (
                    <div key={s} className="flex items-center flex-1">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-400 ${
                          i < step  ? 'bg-gold-500 text-black' :
                          i === step ? 'bg-gold-500/20 border-2 border-gold-500 text-gold-400' :
                          'border border-theme text-theme-subtle'
                        } ${i < step || i === step ? '' : 'bg-black/[0.03] dark:bg-white/5'}`}>
                          {i < step ? <CheckCircle size={15} /> : i + 1}
                        </div>
                        <span className={`text-[10px] font-semibold tracking-widest uppercase ${i <= step ? 'text-gold-400' : 'text-theme-subtle'}`}>
                          {s}
                        </span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className={`flex-1 h-px mx-2 transition-all duration-500 ${i < step ? 'bg-gold-500' : 'bg-theme'}`}
                          style={{ background: i < step ? '#f5a623' : 'var(--border)' }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 0 */}
                {step === 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-theme mb-2">Select Service Type</h3>
                    <p className="text-sm text-theme-muted mb-6">Choose the transportation service that fits your needs.</p>
                    <div className="grid gap-3">
                      {SERVICE_TYPES.map((svc) => {
                        const Icon = svc.icon;
                        return (
                        <button key={svc.id}
                          onClick={() => { setForm(f => ({...f, serviceType: svc.label})); setErrors(e => ({...e, serviceType:''})); }}
                          className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 text-left ${
                            form.serviceType === svc.label
                              ? 'border-gold-500/50 bg-gold-500/10'
                              : 'border-theme hover:border-gold-500/25 hover:bg-gold-500/4'
                          }`}>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-colors ${
                            form.serviceType === svc.label ? 'bg-gold-500/20' : 'bg-black/[0.04] dark:bg-white/5'
                          }`}>
                            <Icon size={20} className="text-gold-400" />
                          </div>
                          <span className={`text-sm font-semibold ${form.serviceType === svc.label ? 'text-gold-400' : 'text-theme'}`}>
                            {svc.label}
                          </span>
                          {form.serviceType === svc.label && <CheckCircle size={18} className="ml-auto text-gold-400" />}
                        </button>
                        );
                      })}
                    </div>
                    {errors.serviceType && (
                      <p className="text-red-400 text-xs mt-3 flex items-center gap-1">
                        <AlertCircle size={12}/>{errors.serviceType}
                      </p>
                    )}
                  </div>
                )}

                {/* Step 1 */}
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-lg font-bold text-theme mb-2">Trip Details</h3>
                      <p className="text-sm text-theme-muted mb-6">We need a few details to prepare your ride.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Field label="Full Name"     id="fullName" value={form.fullName} onChange={set('fullName')} placeholder="John Doe"              required error={errors.fullName} />
                      </div>
                      <div className="col-span-2">
                        <Field label="Phone Number"  id="phone"    type="tel" value={form.phone}    onChange={set('phone')}    placeholder="+1 (470) 419-0528" required error={errors.phone} />
                      </div>
                      <div className="col-span-2">
                        <Field label="Pickup Location" id="pickup" value={form.pickup}  onChange={set('pickup')}  placeholder="DFW Airport, Terminal D"  required error={errors.pickup} />
                      </div>
                      <div className="col-span-2">
                        <Field label={form.serviceType === 'Hourly Service' ? 'First Destination (optional)' : 'Drop-off Location'}
                          id="dropoff" value={form.dropoff} onChange={set('dropoff')} placeholder="Hotel, office, or address"
                          required={form.serviceType !== 'Hourly Service'} error={errors.dropoff} />
                      </div>
                      <div>
                        <Field label="Date" id="date" type="date" value={form.date} onChange={set('date')} min={today} required error={errors.date} />
                      </div>
                      <div>
                        <Field label="Time" id="time" type="time" value={form.time} onChange={set('time')} required error={errors.time} />
                      </div>
                    </div>

                    <div ref={vehicleDropdownRef} className="relative flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-theme-subtle uppercase tracking-widest">
                        Preferred Vehicle (optional)
                      </label>
                      <button
                        type="button"
                        onClick={() => setVehicleOpen(open => !open)}
                        className="input-luxury w-full px-4 py-3.5 rounded-xl text-sm cursor-pointer flex items-center justify-between gap-3 text-left"
                        aria-haspopup="listbox"
                        aria-expanded={vehicleOpen}
                      >
                        <span>{form.vehicleType || 'No preference'}</span>
                        <ChevronDown
                          size={16}
                          className={`text-theme-subtle transition-transform duration-200 ${vehicleOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {vehicleOpen && (
                        <div
                          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-gold-500/40 bg-black shadow-2xl"
                          role="listbox"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setForm(f => ({ ...f, vehicleType: '' }));
                              setVehicleOpen(false);
                            }}
                            className="w-full bg-gold-500 px-4 py-3 text-left text-sm font-semibold text-black transition-colors hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none"
                            role="option"
                            aria-selected={!form.vehicleType}
                          >
                            No preference - Let our team choose the best fit
                          </button>
                          {FLEET.map((v) => (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() => {
                                setForm(f => ({ ...f, vehicleType: v.name }));
                                setVehicleOpen(false);
                              }}
                              className="w-full border-t border-black/15 bg-gold-500 px-4 py-3 text-left text-sm font-semibold text-black transition-colors hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none"
                              role="option"
                              aria-selected={form.vehicleType === v.name}
                            >
                              {v.name} - {v.category} - {v.passengers} pax
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-theme-subtle uppercase tracking-widest">Special Requests</label>
                      <textarea value={form.specialRequest} onChange={set('specialRequest')}
                        placeholder="Child seat, extra stops, beverages, decorations..."
                        rows={3} className="input-luxury w-full px-4 py-3.5 rounded-xl text-sm resize-none" />
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div>
                    <h3 className="text-lg font-bold text-theme mb-2">Confirm Your Booking</h3>
                    <p className="text-sm text-theme-muted mb-6">Review your details before sending by WhatsApp or SMS.</p>
                    <div className="space-y-0">
                      {[
                        { label:'Service',    value: form.serviceType },
                        { label:'Name',       value: form.fullName },
                        { label:'Phone',      value: form.phone },
                        { label:'Pickup',     value: form.pickup },
                        { label:'Drop-off',   value: form.dropoff || 'Hourly / TBD' },
                        { label:'Date & Time',value: `${form.date} at ${form.time}` },
                        { label:'Vehicle',    value: form.vehicleType || 'No preference' },
                        ...(form.specialRequest ? [{ label:'Notes', value: form.specialRequest }] : []),
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between items-start py-3 border-b border-theme last:border-0">
                          <span className="text-xs text-theme-subtle uppercase tracking-widest w-28 flex-shrink-0">{row.label}</span>
                          <span className="text-sm text-theme text-right">{row.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 rounded-2xl bg-gold-500/8 border border-gold-500/20">
                      <p className="text-xs text-gold-500 leading-relaxed">
                        Choose WhatsApp or SMS to open your preferred messaging app with these details pre-filled. We respond within 15 minutes with a price quote.
                      </p>
                    </div>
                  </div>
                )}

                {/* Nav buttons */}
                <div className="flex gap-3 mt-8">
                  {step > 0 && (
                    <button onClick={back}
                      className="btn-outline flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold">
                      <ChevronLeft size={16} />Back
                    </button>
                  )}
                  {step < 2 ? (
                    <button onClick={next}
                      className="btn-primary flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold">
                      Continue <ChevronRight size={16} />
                    </button>
                  ) : (
                    <div className="flex-1 grid sm:grid-cols-2 gap-3">
                      <button onClick={submit}
                        className="btn-primary flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L0 24l6.335-1.51A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.791 9.791 0 01-4.994-1.368l-.358-.213-3.76.897.947-3.666-.234-.376A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
                        WhatsApp
                      </button>
                      <button onClick={submitSms}
                        className="btn-outline flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold">
                        <MessageSquare size={18} />
                        SMS
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SuccessCard({ onReset, form, submitMethod, bookingStatus }) {
  return (
    <div className="glass rounded-3xl p-10 gold-border text-center">
      <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6 animate-pulse-gold">
        <CheckCircle size={36} className="text-green-500" />
      </div>
      <h3 className="playfair text-2xl font-bold text-theme mb-3">Booking Request Sent!</h3>
      <p className="text-theme-muted text-sm leading-relaxed mb-8">
        Thank you <span className="text-gold-400">{form.fullName}</span>. Your booking has been sent to our team via {submitMethod}. We'll confirm within 15 minutes.
      </p>
      <div className="text-left space-y-2 mb-8 p-5 rounded-2xl border border-theme" style={{ background: 'var(--bg-card)' }}>
        <p className="text-xs text-theme-subtle uppercase tracking-widest mb-3">Booking Summary</p>
        <p className="text-sm text-theme"><span className="text-gold-400">Service:</span> {form.serviceType}</p>
        <p className="text-sm text-theme"><span className="text-gold-400">Date:</span> {form.date} at {form.time}</p>
        <p className="text-sm text-theme"><span className="text-gold-400">From:</span> {form.pickup}</p>
        {form.dropoff && <p className="text-sm text-theme"><span className="text-gold-400">To:</span> {form.dropoff}</p>}
        <p className="text-xs text-theme-subtle mt-3 pt-3 border-t border-theme">Status: PENDING - awaiting confirmation</p>
        {bookingStatus && <p className="text-xs text-gold-400">{bookingStatus}</p>}
      </div>
      <button onClick={onReset} className="btn-outline w-full py-3.5 rounded-2xl text-sm font-semibold">
        Book Another Ride
      </button>
    </div>
  );
}
