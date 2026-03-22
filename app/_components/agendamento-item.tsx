import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

// TODO: receber agendamento como prop
const AgendamentoItem = () => {
  return (
    <>
      {/* [WHITE-LABEL] Título da seção de agendamentos */}
      <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
        Agendamentos
      </h2>

      <Card>
        <CardContent className="flex justify-between p-0">
          {/* ── ESQUERDA: status, serviço e barbearia ── */}
          <div className="flex flex-col gap-2 py-5 pl-5">
            {/* [WHITE-LABEL] Cor do badge de status vem de --primary em globals.css */}
            <Badge className="w-fit">Confirmado</Badge>
            <h3 className="font-semibold">Corte de Cabelo</h3>

            <div className="flex items-center gap-2">
              {/* Avatar da barbearia — será substituído pela foto real via prop */}
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
              </Avatar>
              <p className="text-sm">Barbearia FSW</p>
            </div>
          </div>

          {/* ── DIREITA: data e horário ──
           * [WHITE-LABEL] A borda esquerda (border-l-2) divide as duas colunas
           * Ajuste a espessura: border-l / border-l-2 / border-l-4
           * Ajuste a cor da borda em --border dentro de globals.css
           */}
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm">Agosto</p>
            <p className="text-2xl">05</p>
            <p className="text-sm">20:00</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AgendamentoItem;
