import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
      const result = await prisma.user.findMany()
      return NextResponse.json(result);
    } catch (error) {
      console.log(error);
      return NextResponse.error();
    }
  }