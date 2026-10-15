import Image from "next/image";

export function InstitutionalLogos({ className = "" }: { className?: string }) {
  return (
    <div className={`institutional-logos ${className}`} aria-label="Marcas institucionais">
      <Image src="/logo/descubra-viana.png" alt="Descubra Viana" width={217} height={77} className="institutional-logo-discover" />
      <Image src="/logo/prefeitura-viana.png" alt="Prefeitura de Viana" width={242} height={101} className="institutional-logo-city" />
    </div>
  );
}
