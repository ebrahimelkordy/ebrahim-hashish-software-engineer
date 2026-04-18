"use client";

import { useState, useTransition } from "react";
import { EditableText } from "../EditableText";
import { sendEmail } from "@/lib/actions";

export const ContactSection = ({ contact, isEditable = false, onUpdate }: { contact: any, isEditable?: boolean, onUpdate?: (data: any) => void }) => {
  const [data, setData] = useState(contact);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const handleSocialUpdate = (field: string, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onUpdate?.(newData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setErrorMessage("");

    startTransition(async () => {
      const result = await sendEmail(formData);
      if (result.success) {
        setStatus('success');
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(result.error || "Uknown transmission error.");
      }
    });
  };

  return (
    <section id="contact" className="bg-[#1c1b1b] border border-white/10 p-5 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-8 md:gap-12 items-center neon-border-tl holographic-shadow min-h-[500px] w-full max-w-full">
      {/* Scanline Overlay */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-30"></div>
      
      {/* LEFT COLUMN: INFO & SOCIALS */}
      <div className="w-full md:w-1/2 space-y-6 relative z-10 text-center md:text-left">
        <div className="space-y-2">
          <p className="font-body text-[#d90429] text-xs uppercase tracking-[0.2em] before:content-['//'] before:mr-2">Sector 05</p>
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-[#e5e2e1] uppercase">CONTACT_NODE</h2>
        </div>
        
        <p className="font-body text-[#e7bcba] text-sm leading-relaxed max-w-md mx-auto md:mx-0 opacity-80">
           Ready to forge a new digital reality? Transmit your coordinates and project parameters. Secure connection guaranteed.
        </p>

        {/* SOCIAL LINKS */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
          {[
            { 
              id: 'linkedin', 
              label: 'LINKEDIN', 
              icon: (
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              )
            },
            { 
              id: 'github', 
              label: 'GITHUB', 
              icon: (
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              )
            },
            { 
              id: 'whatsapp', 
              label: 'WHATSAPP', 
              icon: (
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.89 4.44-9.892 9.886-.001 2.125.597 3.702 1.592 5.392l-.999 3.646 3.899-.999zm11.387-4.604c-.12-.201-.441-.321-.922-.561s-2.845-1.403-3.286-1.563-.761-.241-1.082.241-1.243 1.563-1.524 1.883-.561.361-1.042.121c-.481-.241-2.032-.749-3.869-2.389-1.429-1.275-2.394-2.848-2.675-3.328s-.03-.741.211-.981c.216-.216.481-.561.722-.842.241-.281.321-.481.481-.802s.08-.601-.04-.842-.857-2.404-1.178-3.175c-.312-.751-.624-.65-.862-.661-.22-.011-.471-.013-.722-.013s-.661.101-1.002.481c-.341.381-1.303 1.273-1.303 3.105s1.332 3.593 1.517 3.834c.184.243 2.624 4.025 6.357 5.631 3.733 1.606 3.733 1.071 4.407.991.674-.08 2.167-.883 2.473-1.741s.306-1.597.214-1.741z"/>
                </svg>
              )
            },
          ].map((social) => (
            <div key={social.id} className="relative group">
               {isEditable ? (
                 <div className="flex flex-col gap-1 bg-black/40 p-2 border border-white/5">
                    <span className="text-[8px] text-[#00f4fe] uppercase tracking-widest">{social.label}</span>
                    <input 
                      value={data[social.id] || ''} 
                      onChange={(e) => handleSocialUpdate(social.id, e.target.value)}
                      className="bg-black/60 border border-white/10 text-[10px] text-white px-2 py-1 outline-none focus:border-[#d90429]"
                    />
                 </div>
               ) : (
                <a 
                  href={social.id === 'whatsapp' ? `https://wa.me/${data[social.id]}` : data[social.id]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center border border-white/10 text-[#e7bcba] hover:border-[#00f4fe] hover:text-[#00f4fe] hover:bg-[#00f4fe]/5 transition-all group/icon"
                >
                  <div className="group-hover/icon:scale-110 transition-transform">
                    {social.icon}
                  </div>
                </a>
               )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: CONTACT FORM */}
      <div className="w-full md:w-1/2 relative z-10 glass-panel p-6 md:p-8 border border-white/10">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="relative group">
            <input 
              className="block w-full bg-transparent border-0 border-b border-white/20 text-[#e5e2e1] font-body text-sm py-2 px-0 focus:ring-0 focus:border-[#00f4fe] peer transition-colors" 
              id="node_id" 
              placeholder=" " 
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <label 
              className="absolute left-0 top-2 font-label text-xs uppercase tracking-widest text-[#e7bcba]/60 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#00f4fe] transition-all pointer-events-none peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#00f4fe]" 
              htmlFor="node_id"
            >
              TRANSMITTER_ID [Name]
            </label>
          </div>

          <div className="relative group">
            <input 
              className="block w-full bg-transparent border-0 border-b border-white/20 text-[#e5e2e1] font-body text-sm py-2 px-0 focus:ring-0 focus:border-[#00f4fe] peer transition-colors" 
              id="comm_link" 
              placeholder=" " 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <label 
              className="absolute left-0 top-2 font-label text-xs uppercase tracking-widest text-[#e7bcba]/60 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#00f4fe] transition-all pointer-events-none peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#00f4fe]" 
              htmlFor="comm_link"
            >
              COMM_LINK [Email]
            </label>
          </div>

          <div className="relative group">
            <textarea 
              className="block w-full bg-transparent border-0 border-b border-white/20 text-[#e5e2e1] font-body text-sm py-2 px-0 focus:ring-0 focus:border-[#00f4fe] peer transition-colors resize-none" 
              id="data_packet" 
              placeholder=" " 
              rows={3}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <label 
              className="absolute left-0 top-2 font-label text-xs uppercase tracking-widest text-[#e7bcba]/60 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#00f4fe] transition-all pointer-events-none peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#00f4fe]" 
              htmlFor="data_packet"
            >
              DATA_PACKET [Message]
            </label>
          </div>

          <div className="space-y-4">
            <button 
              disabled={isPending}
              className={`w-full py-4 font-headline uppercase tracking-[0.2em] text-sm font-bold transition-all active:scale-95 border-none mt-4 flex items-center justify-center gap-2 ${
                status === 'success' 
                  ? 'bg-green-600 shadow-[0_0_20px_rgba(22,163,74,0.5)]' 
                  : status === 'error'
                  ? 'bg-orange-600'
                  : 'bg-[#d90429] hover:shadow-[0_0_25px_rgba(217,4,41,0.5)]'
              }`} 
              type="submit"
            >
              {isPending ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                  TRANSMITTING_SIGNAL...
                </>
              ) : status === 'success' ? (
                <>
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  SIGNAL_RECEIVED
                </>
              ) : status === 'error' ? (
                <>
                  <span className="material-symbols-outlined text-sm">warning</span>
                  TRANSMISSION_FAILED
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xs">send</span>
                  TRANSMIT SIGNAL
                </>
              )}
            </button>

            {status === 'error' && (
              <p className="text-[10px] text-orange-400 font-mono uppercase tracking-widest text-center animate-pulse">
                &gt; ERROR: {errorMessage}
              </p>
            )}

            {status === 'success' && (
              <p className="text-[10px] text-green-400 font-mono uppercase tracking-widest text-center">
                &gt; SUCCESS: MESSAGE_LOGGED_IN_VAULT
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
