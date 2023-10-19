import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Route pour créer un nouvel item dans la liste de l'utilisateur
export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { id, name, title, poster_path, userId } = requestBody; // Extrayez les données du corps de la requête

    const result = await prisma.item.create({
      data: { id, name, title, poster_path, userId },
    });
    console.log("passla")

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erreur lors de la création de l'objet item", error);
    return NextResponse.error();
  }
}

// Route pour récupérer tous les items de l'utilisateur
export async function GET() {
  try {
    const result = await prisma.item.findMany();
    console.log("passla")
    return NextResponse.json(result);
  } catch (error) {
    console.error("Erreur lors de la récupération des items", error);
    return NextResponse.error();
  }
}




