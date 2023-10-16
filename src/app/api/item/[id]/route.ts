import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Route pour supprimer un item de la liste de l'utilisateur
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const result = await prisma.item.delete({
      where: { id: parseInt(id) },
    });

    console.log("passla");
    return NextResponse.json(result);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'item", error);
    return NextResponse.error();
  }
}