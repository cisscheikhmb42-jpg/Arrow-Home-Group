import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icon";

/** Bouton flottant sur grand écran ; sur téléphone, WhatsApp est dans la barre d'actions du bas. */
export default function WhatsAppButton({ label, message }: { label: string; message: string }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed right-6 bottom-6 z-40 hidden lg:inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
