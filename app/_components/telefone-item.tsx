"use client";

import { SmartphoneIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface TelefoneItemProps {
  telefone: string;
}

const TelefoneItem = ({ telefone }: TelefoneItemProps) => {
  const handleCopiarTelefone = () => {
    navigator.clipboard.writeText(telefone);
    toast.success("Telefone copiado com sucesso!");
  };

  return (
    <div className="flex justify-between" key={telefone}>
      {/* Ícone + número */}
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{telefone}</p>
      </div>

      {/* [WHITE-LABEL] Texto do botão de copiar telefone */}
      <Button variant="outline" size="sm" onClick={handleCopiarTelefone}>
        Copiar
      </Button>
    </div>
  );
};

export default TelefoneItem;
