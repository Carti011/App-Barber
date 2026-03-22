"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const esquemaBusca = z.object({
  titulo: z.string().trim().min(1, {
    message: "Digite algo para buscar",
  }),
});

const Busca = () => {
  const form = useForm<z.infer<typeof esquemaBusca>>({
    resolver: zodResolver(esquemaBusca),
    defaultValues: {
      titulo: "",
    },
  });
  const router = useRouter();

  const handleSubmit = (data: z.infer<typeof esquemaBusca>) => {
    router.push(`/barbearias?titulo=${data.titulo}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                {/* [WHITE-LABEL] Placeholder do campo de busca */}
                <Input
                  placeholder="Faça sua busca..."
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  );
};

export default Busca;
