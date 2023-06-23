import AddProductForm from "@/components/AddProductForm";
import SidebarWithHeader from "@/components/Sidebar";
import Head from "next/head";
import React from "react";

const AddProduct = () => {
  return (
    <>
      <Head>
        <title>Add Product | Admin</title>
      </Head>
      <SidebarWithHeader>
        <AddProductForm />
      </SidebarWithHeader>
    </>
  );
};

export default AddProduct;
