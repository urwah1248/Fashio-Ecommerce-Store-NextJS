import AddProductForm from "@/components/AddProductForm";
import SidebarWithHeader from "@/components/Sidebar";
import React from "react";

const AddProduct = () => {
  return <SidebarWithHeader children={<AddProductForm />} />;
};

export default AddProduct;
