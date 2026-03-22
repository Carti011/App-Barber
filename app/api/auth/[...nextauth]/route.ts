import { opcoesAuth } from "@/app/_lib/autenticacao";
import NextAuth from "next-auth";

const handler = NextAuth(opcoesAuth);

export { handler as GET, handler as POST };
