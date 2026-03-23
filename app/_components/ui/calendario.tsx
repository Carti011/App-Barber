"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/app/_lib/utils";
import { buttonVariants } from "@/app/_components/ui/button";

export type CalendarioProps = React.ComponentProps<typeof DayPicker>;

function Calendario({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarioProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col",
        month: "w-full space-y-4",
        // [WHITE-LABEL] Caption: mês à esquerda, setas à direita
        caption: "flex items-center justify-between px-1 pt-1",
        caption_label: "text-sm font-semibold capitalize",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        // Sem absolute — as setas ficam dentro do flex do nav (lado direito)
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse",
        head_row: "flex w-full",
        // flex-1 para distribuir colunas uniformemente
        head_cell:
          "text-muted-foreground flex-1 text-center font-normal text-[0.8rem] uppercase",
        row: "mt-2 flex w-full",
        cell: "flex-1 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "w-full h-9 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendario.displayName = "Calendario";

export { Calendario };
