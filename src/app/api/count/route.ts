import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 60; // revalidate every 60 seconds

export async function GET() {
  try {
    const count = await prisma.registration.count();
    return NextResponse.json({ count });
  } catch (err) {
    console.error("[count]", err);
    return NextResponse.json({ count: 0 });
  }
}
