import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Route pour récupérer les informations de l'utilisateur
export async function GET() {
    try {
      const result = await prisma.user.findMany();
      console.log("passla")
      return NextResponse.json(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des informations du user", error);
      return NextResponse.error();
    }
  }