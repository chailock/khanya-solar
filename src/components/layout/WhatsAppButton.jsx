import { siteConfig } from '../../data/siteConfig';
// Floating chat shortcut using the WhatsApp number from siteConfig.
export default function WhatsAppButton() {
  const n = siteConfig.contact.whatsapp.replace(/\s/g, '').replace(/^0/, '27');
  const href = `https://wa.me/${n}?text=${encodeURIComponent(`Hi ${siteConfig.brand.name}, I would like to know more about solar.`)}`;
  return (
    <a className="wa" href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.2A8.5 8.5 0 1 1 20 11.5z" /><path d="M9 8.6c0 3.4 2.9 6.2 6.3 6.2l1.1-1.5-1.9-.9-.8.7c-1.1-.4-2-1.3-2.4-2.4l.7-.8-.9-1.9z" fill="currentColor" stroke="none" />
      </svg>
      <span>Chat with us</span>
    </a>
  );
}
