import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isSessionValid } from "@/app/libs/session";

// Rotas que qualquer visitante pode acessar
const rotasPublicas = ["/", "/login", "/cadastro"];

// Rotas que, com sessão ativa, redirecionam para o painel
const rotasSoVisitante = ["/login", "/cadastro"];

function corresponde(caminho: string, rotas: string[]) {
  return rotas.some((rota) => caminho === rota || caminho.startsWith(`${rota}/`));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const caminho = url.pathname;

  // Link antigo: a lista agora é uma seção da landing page
  if (caminho === "/moradias") {
    url.pathname = "/";
    url.hash = "moradias-disponiveis";
    return NextResponse.redirect(url);
  }

  const sessao = await isSessionValid();

  if (sessao && corresponde(caminho, rotasSoVisitante)) {
    url.pathname = "/dashboard";
    url.hash = "";
    return NextResponse.redirect(url);
  }

  if (!sessao && !corresponde(caminho, rotasPublicas)) {
    url.pathname = "/login";
    url.hash = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
