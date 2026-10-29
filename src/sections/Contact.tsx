import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import SocialLinks from '../components/SocialLinks';
import { siteConfig } from '../data/portfolio';
import { useWebGL } from '../hooks/useWebGL';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ContactGlobe = lazy(() => import('../three/ContactGlobe'));

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const webGL = useWebGL();
  const reducedMotion = useReducedMotion();

  const [form, setForm] = useState<FormState>({
    name: '', email: '', subject: '', message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID;

    if (formspreeId) {
      try {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          setStatus('success');
          setForm({ name: '', email: '', subject: '', message: '' });
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    } else {
      // Fallback: open mailto
      const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
      window.location.href = mailto;
      setTimeout(() => {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      }, 800);
    }
  };

  return (
    <section id="contact" className="relative section-padding" aria-label="Contact section">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="// GET IN TOUCH"
          title="Contact Me"
          subtitle="Have a project in mind or want to collaborate? Let's talk."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <GlassCard className="p-8">
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <FormField
                    label="Full Name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Rusiru Pramod"
                    required
                  />
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <FormField
                  label="Subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration"
                  required
                  className="mb-4"
                />
                <div className="mb-6">
                  <label className="block text-xs font-orbitron text-white/50 tracking-widest mb-2 uppercase">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project..."
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/80 text-sm font-sans placeholder:text-white/25 focus:border-cyan-DEFAULT/50 focus:outline-none transition-colors resize-none"
        style={{ background: 'rgba(255,255,255,0.05)' }}
                    aria-label="Message"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-space font-semibold text-space-900 bg-cyan-DEFAULT hover:bg-cyan-bright disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-cyan-sm hover:shadow-cyan-md"
                  aria-live="polite"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-space-900/50 border-t-space-900 rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>

                {/* Status messages */}
                {status === 'success' && (
                  <div role="alert" className="mt-4 flex items-center gap-2 text-sm text-emerald-400 font-space">
                    <CheckCircle size={16} />
                    Message sent! I'll get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div role="alert" className="mt-4 flex items-center gap-2 text-sm text-red-400 font-space">
                    <AlertCircle size={16} />
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}
              </form>
            </GlassCard>
          </motion.div>

          {/* Right — Info + Globe */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Contact info */}
            <GlassCard className="p-6">
              <h3 className="font-orbitron text-base font-semibold text-gradient-blue mb-5">
                Let&apos;s Connect
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg glass border-glow flex items-center justify-center flex-shrink-0">
                    <Mail size={15} className="text-cyan-DEFAULT" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-orbitron tracking-widest">EMAIL</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-white/80 text-sm font-space hover:text-cyan-DEFAULT transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg glass border-glow flex items-center justify-center flex-shrink-0">
                    <MapPin size={15} className="text-cyan-DEFAULT" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-orbitron tracking-widest">LOCATION</p>
                    <p className="text-white/80 text-sm font-space">Colombo, Sri Lanka 🇱🇰</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-5 pt-5 border-t border-white/5">
                <p className="text-white/40 text-xs font-orbitron tracking-widest mb-3">FIND ME ON</p>
                <SocialLinks showEmail={false} size={17} />
              </div>
            </GlassCard>

            {/* Interactive globe */}
            {webGL && !reducedMotion && (
              <GlassCard className="p-0 overflow-hidden" hover={false}>
                <div className="h-56 relative">
                  <Suspense
                    fallback={
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-cyan-DEFAULT/30 border-t-cyan-DEFAULT rounded-full animate-spin" />
                      </div>
                    }
                  >
                    <ContactGlobe />
                  </Suspense>
                  <div className="absolute bottom-3 left-0 right-0 text-center">
                    <span className="text-xs font-orbitron text-cyan-DEFAULT/60 tracking-widest">
                      📍 SRI LANKA
                    </span>
                  </div>
                </div>
              </GlassCard>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Form field ────────────────────────────────────────────────
interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  className?: string;
}

function FormField({ label, name, type, value, onChange, placeholder, required, className = '' }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-xs font-orbitron text-white/50 tracking-widest mb-2 uppercase">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/80 text-sm font-sans placeholder:text-white/25 focus:border-cyan-DEFAULT/50 focus:outline-none transition-colors"
      />
    </div>
  );
}
