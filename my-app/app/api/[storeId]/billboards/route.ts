import prismadb from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;
    if (!label) {
      return new NextResponse("label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("label is required", { status: 400 });
    }
    if (!userId) {
      return new NextResponse("unauthenticated", { status: 403 });
    }
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: { userId, id: params.storeId },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const billboard = await prismadb.billboard.create({
      data: { label, imageUrl, storeId: params.storeId },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log(`[STORE_POST] ${error}`);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const billboard = await prismadb.billboard.findMany({
      where: { storeId: params.storeId },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log(`[STORE_POST] ${error}`);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
