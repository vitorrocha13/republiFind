'use server';

import { deleteSessionCookie } from "@/app/libs/session";
import { redirect } from "next/navigation";

export async function logout() {
    await deleteSessionCookie();
    redirect("/login");
}
