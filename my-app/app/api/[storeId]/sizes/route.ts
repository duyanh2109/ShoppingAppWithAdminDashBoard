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
    const { name,value } = body;
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("value is required", { status: 400 });
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
    const size = await prismadb.size.create({
      data: { name,value, storeId: params.storeId },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log(`[SIZES_POST] ${error}`);
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

    const sizes = await prismadb.size.findMany({
      where: { storeId: params.storeId },
    });
    return NextResponse.json(sizes);
  } catch (error) {
    console.log(`[SIZES_POST] ${error}`);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
