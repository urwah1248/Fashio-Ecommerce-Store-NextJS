import ProductsTable from "@/components/ProductsTable";
import SidebarWithHeader from "@/components/Sidebar";
import React from "react";

const Products = () => {
  return <SidebarWithHeader children={<ProductsTable />} />;
};

export default Products;
