export default function FAQSection({ eyebrow = 'Questions', title = 'Frequently Asked Questions', faqs }) {
  return (
    <section id="faq" className="relative py-16 sm:py-20 section-bg">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] sm:tracking-[0.3em] text-gold-400">{eyebrow}</p>
          <h2 className="playfair text-3xl sm:text-4xl font-bold text-theme">{title}</h2>
          <div className="section-divider mx-auto mt-6" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <article key={faq.question} className="surface-bg border border-theme p-5 sm:p-6">
              <h3 className="text-base sm:text-lg font-black text-theme">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-theme-muted">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
