import Heading from "@/components/UI/Heading";
import prismadb from "@/lib/prisma-db";
import { Separator } from "@/components/UI/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { CreditCardIcon, DollarSignIcon, PackageIcon } from "lucide-react";
import { formatter } from "@/lib/utils";
import { getTotalRevenue } from "@/actions/getTotalRevenue";
import { getSalesCount } from "@/actions/getSalesCount";
import { getStockCount } from "@/actions/getStockCount";
interface DashBoardPageProps {
  params: { storeId: string };
}
const DashBoardPage: React.FC<DashBoardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="DashBoard"
          description="Overview of your store"
        ></Heading>
        <Separator />
        <div className="grid gap-4 grid-cols-3 ">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="">
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="">
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Product In Stock
              </CardTitle>
              <PackageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="">
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default DashBoardPage;
