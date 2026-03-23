"use client";

import { ChevronRightIcon } from "lucide-react";
import { useRef } from "react";

interface CarrosselBarbeariaProps {
  children: React.ReactNode;
}

const CarrosselBarbearias = ({ children }: CarrosselBarbeariaProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleScrollClick = () => {
    ref.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    /*
     * [WHITE-LABEL] Contêiner do carrossel com botão de navegação
     * O botão de seta aparece apenas em telas maiores (md:flex)
     */
    <div className="relative">
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {/* [WHITE-LABEL] Botão de navegação — cores vêm de --card e --border */}
      <button
        onClick={handleScrollClick}
        className="border-border bg-card absolute top-1/2 right-0 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-lg md:flex"
      >
        <ChevronRightIcon size={18} />
      </button>
    </div>
  );
};

export default CarrosselBarbearias;
