import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { projects, gallery } from "@/data/projects";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Find project in either the featured projects or gallery
  const featured = projects.find((p) => p.slug === slug);
  const galleryItem = gallery.find((g) => g.slug === slug);

  if (!featured && !galleryItem) {
    notFound();
  }

  const title = featured?.title || galleryItem?.title || "Project";
  const category = featured?.category || galleryItem?.category || "Work";
  const description = featured?.description || "A beautiful digital experience built for modern audiences.";
  const image = featured?.image || galleryItem?.image;
  const tech = featured?.tech || ["Design", "Development"];
  
  // New details
  const techstack = featured?.techstack || galleryItem?.techstack;
  const requirement = featured?.requirement || galleryItem?.requirement;
  const delivered = featured?.delivered || galleryItem?.delivered;
  const additionalImages = featured?.images || galleryItem?.images || (image ? [image] : []);

  return (
    <main className="min-h-screen bg-[#fcfaf8] text-[#111]">
      <div className="pt-8 px-[4vw]">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] hover:text-[#e76a12] transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <header className="px-[4vw] pt-[clamp(60px,8vw,100px)] pb-[60px] max-w-[1400px] mx-auto">
        <p className="text-[#e76a12] text-[11px] font-bold tracking-[0.2em] uppercase mb-[28px]">
          {category}
        </p>
        <h1 className="font-serif text-[clamp(48px,8vw,120px)] leading-[0.9] font-normal tracking-[-0.05em] mb-12">
          {title}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-[8vw] items-start pt-12 border-t border-[#e9e7e4]">
          <div>
            <p className="text-[#5b5855] text-[clamp(16px,2vw,22px)] leading-[1.7] max-w-[700px] m-0 mb-12">
              {description}
            </p>

            {requirement && (
              <div className="mb-10">
                <h3 className="text-[14px] font-bold uppercase tracking-[0.1em] mb-4">The Requirement</h3>
                <p className="text-[#5b5855] text-[15px] leading-[1.8] max-w-[600px]">{requirement}</p>
              </div>
            )}
            
            {delivered && (
              <div>
                <h3 className="text-[14px] font-bold uppercase tracking-[0.1em] mb-4">What We Delivered</h3>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#e76a12] shrink-0 mt-1" size={20} />
                  <p className="text-[#5b5855] text-[15px] leading-[1.8] max-w-[600px] m-0">{delivered}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-10 bg-white p-8 border border-[#e9e7e4] rounded-xl shadow-sm">
            <div>
              <span className="block mb-2 text-[#999] text-[11px] uppercase tracking-[0.16em] font-semibold">Client</span>
              <p className="m-0 text-[16px] font-medium">{title}</p>
            </div>
            <div>
              <span className="block mb-2 text-[#999] text-[11px] uppercase tracking-[0.16em] font-semibold">Expertise</span>
              <p className="m-0 text-[16px] font-medium">{tech.join(" / ")}</p>
            </div>
            {techstack && (
              <div>
                <span className="block mb-2 text-[#999] text-[11px] uppercase tracking-[0.16em] font-semibold">Tech Stack</span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {techstack.map((t: string) => (
                    <span key={t} className="px-3 py-1.5 bg-[#f6f5f3] text-[13px] rounded-md font-medium text-[#444]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {additionalImages.length > 0 && (
        <section className="px-[4vw] pb-[clamp(100px,12vw,200px)] max-w-[1400px] mx-auto">
          <div className="flex flex-col gap-[4vw]">
            {/* Hero Image */}
            <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[16px] bg-[#ddd]">
              <img 
                src={additionalImages[0]} 
                alt={`${title} main showcase`} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Gallery Grid */}
            {additionalImages.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[4vw]">
                {additionalImages.slice(1).map((img: string, idx: number) => (
                  <div key={idx} className="w-full aspect-[4/3] overflow-hidden rounded-[12px] bg-[#ddd]">
                    <img 
                      src={img} 
                      alt={`${title} showcase ${idx + 2}`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
