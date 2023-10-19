import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Route pour récupérer tous les items de l'utilisateur
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log("id", id);
    try {
      const result = await prisma.item.findMany({
        where: { userId: id },
      });
      console.log("result",result);
      return NextResponse.json(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des items", error);
      return NextResponse.error();
    }
  }