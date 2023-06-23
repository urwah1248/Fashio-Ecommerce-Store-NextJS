import ProductsTable from "@/components/ProductsTable";
import SidebarWithHeader from "@/components/Sidebar";
import Head from "next/head";
import React from "react";

const Products = () => {
  return (
    <>
      <Head>
        <title>Products | Admin</title>
      </Head>
      <SidebarWithHeader>
        
        <ProductsTable />
      </SidebarWithHeader>
    </>
  );
};

export default Products;
