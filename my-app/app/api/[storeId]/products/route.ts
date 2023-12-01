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
    const {
      name,
      price,
      colorId,
      sizeId,
      categoryId,
      image,
      isFeatured,
      isArchived,
    } = body;
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("price is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("colorId is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("sizeId is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("categoryId is required", { status: 400 });
    }
    if (!image) {
      return new NextResponse("image is required", { status: 400 });
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
    const product = await prismadb.product.create({
      data: {
        name,
        price,
        colorId,
        sizeId,
        categoryId,
        storeId: params.storeId,
        isFeatured,
        isArchived,
        image: {
          createMany: {
            data: [...image.map((item: { url: string }) => item)],
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(`[PRODUCT_POST] ${error}`);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const product = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        sizeId,
        colorId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include:{
        image:true,
        category:true,
        color:true,
        size:true,
      },
      orderBy:{
        createdAt:"desc"
      }
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(`[PRODUCT_POST] ${error}`);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
