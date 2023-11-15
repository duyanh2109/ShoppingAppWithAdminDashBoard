import React from "react";
import { BillBoardClient } from "./components/client";

const BillBoardsPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6 p-8">
        <BillBoardClient />
      </div>
    </div>
  );
};

export default BillBoardsPage;
