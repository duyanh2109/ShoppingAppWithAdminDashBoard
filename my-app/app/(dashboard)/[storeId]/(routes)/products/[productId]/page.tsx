import prismadb from "@/lib/prisma-db";
import ProductForm from "./components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeID: string };
}) => {
  const product = await prismadb.product.findUnique({
    where: { id: params.productId },
    include: {
      image: true,
    },
  });
  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeID },
  });
  const sizes = await prismadb.size.findMany({
    where: { storeId: params.storeID },
  });
  const colors = await prismadb.color.findMany({
    where: { storeId: params.storeID },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm initialData={product} categories={categories} sizes={sizes} colors={colors}/>
      </div>
    </div>
  );
};

export default ProductPage;
