import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_MOBILE = /^[6-9]\d{9}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { village, mobile } = body as { village?: string; mobile?: string };

    if (!village || !village.trim()) {
      return NextResponse.json({ error: "Village is required." }, { status: 400 });
    }
    if (!mobile || !VALID_MOBILE.test(mobile)) {
      return NextResponse.json({ error: "Enter a valid 10-digit Indian mobile number." }, { status: 400 });
    }

    // Prevent duplicate mobile registrations
    const existing = await prisma.registration.findFirst({
      where: { mobile },
    });
    if (existing) {
      return NextResponse.json(
        { error: "This mobile number is already registered.", village: existing.village },
        { status: 409 }
      );
    }

    const registration = await prisma.registration.create({
      data: { village: village.trim(), mobile },
    });

    return NextResponse.json({ success: true, id: registration.id }, { status: 201 });
  } catch (err) {
    console.error("[register]", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
