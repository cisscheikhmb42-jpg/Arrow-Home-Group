import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icon";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter avec Arrow Home sur WhatsApp"
      className="focus-ring fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:right-6 sm:bottom-6 sm:px-5"
    >
      <WhatsAppIcon className="size-7 sm:size-6" />
      <span className="hidden text-sm font-bold sm:inline">WhatsApp</span>
    </a>
  );
}
