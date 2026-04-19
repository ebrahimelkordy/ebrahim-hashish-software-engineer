"use client";

import { EditableText } from "../EditableText";
import { EditableImage } from "../EditableImage";

export const CertificatesSection = ({ certificates, isEditable = false, onAdd, onDelete, onUpdate }: {
  certificates: any[],
  isEditable?: boolean,
  onAdd?: () => void,
  onDelete?: (id: string) => void,
  onUpdate?: (id: string, data: any) => void
}) => {

  const handleUpdateImage = (cert: any, src: string) => {
    onUpdate?.(cert.id, { imageUrl: src });
  };

  const CertificateCard = ({ cert }: { cert: any }) => (
    <article className="relative bg-[#131313] border border-white/5 group overflow-hidden h-full flex flex-col">
      <div className="aspect-[16/10] relative overflow-hidden flex items-center justify-center flex-shrink-0">
        <EditableImage
          src={cert.imageUrl}
          alt={cert.title}
          onChange={(src) => handleUpdateImage(cert, src)}
          isEditable={isEditable}
          containerClassName="absolute inset-0 w-full h-full pointer-events-auto"
          className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
        />

        <div className={`absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent transition-opacity ${isEditable ? 'opacity-0 pointer-events-none' : 'opacity-60 group-hover:opacity-40'}`}></div>

        <div className="absolute top-3 left-3 z-20">
          <span className="bg-[#d90429] text-white text-[7px] lg:text-[8px] font-bold px-2 py-0.5 uppercase tracking-tighter">Verified</span>
        </div>

        {isEditable && (
          <button
            onClick={() => onDelete?.(cert.id)}
            className="absolute top-3 right-3 w-7 h-7 bg-black text-[#d90429] border border-[#d90429] flex items-center justify-center hover:bg-[#d90429] hover:text-white transition-all shadow-[0_0_10px_rgba(217,4,41,0.3)] z-200 pointer-events-auto"
          >
            <span className="material-symbols-outlined text-[14px]">delete</span>
          </button>
        )}
      </div>

      <div className="p-5 lg:p-6 flex-grow flex flex-col justify-between">
        <div className="space-y-3">
          <span className="font-label text-[8px] text-[#00f4fe] tracking-[0.2em] uppercase opacity-70">
            <EditableText value={cert.date} onChange={(v) => onUpdate?.(cert.id, { date: v })} isEditable={isEditable} />
          </span>
          <h3 className="font-headline text-base lg:text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#d90429] transition-colors line-clamp-2">
            <EditableText value={cert.title} onChange={(v) => onUpdate?.(cert.id, { title: v })} isEditable={isEditable} />
          </h3>
        </div>
        <p className="font-body text-[9px] text-zinc-500 uppercase tracking-widest border-l border-[#d90429] pl-3 mt-4">
          <EditableText value={cert.issuer} onChange={(v) => onUpdate?.(cert.id, { issuer: v })} isEditable={isEditable} />
        </p>
      </div>
    </article>
  );

  return (
    <section className="relative z-10 w-full mt-16 lg:mt-32">
      <div className="flex items-center gap-4 mb-8 lg:mb-12">
        <span className="material-symbols-outlined text-[#d90429] text-2xl lg:text-3xl">workspace_premium</span>
        <h2 className="font-headline text-2xl lg:text-4xl font-bold tracking-tight text-white uppercase">CREDENTIAL_VAULT</h2>
        <div className="h-[1px] flex-grow bg-white/5 ml-2 lg:ml-4 relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#d90429]/10 border-r border-[#d90429] border-b border-[#d90429] hidden sm:block"></div>
        </div>
      </div>

      {/* Grid that scales from 1 to 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {certificates.map((cert) => (
          <CertificateCard key={cert.id} cert={cert} />
        ))}

        {isEditable && (
          <button
            onClick={onAdd}
            className="flex flex-col items-center justify-center p-8 border border-dashed border-white/10 text-white/20 hover:text-[#d90429] hover:border-[#d90429] transition-all min-h-[200px]"
          >
            <span className="material-symbols-outlined text-3xl mb-2">add</span>
            <span className="font-label text-[10px] uppercase tracking-widest">ADD_NEW_CERTIFICATE</span>
          </button>
        )}
      </div>
    </section>
  );
};
