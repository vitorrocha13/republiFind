import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isSessionValid } from "@/app/libs/session";

const rotasLivres = new Set(["/", "/login", "/cadastro"]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const caminho = url.pathname;

  const sessao = await isSessionValid();

  if (sessao && rotasLivres.has(caminho)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (!sessao && !rotasLivres.has(caminho)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
