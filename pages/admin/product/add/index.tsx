import AddProductForm from "@/components/AddProductForm";
import SidebarWithHeader from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import React, { useEffect } from "react";

const AddProduct = () => {
  const {status, data} = useSession();

  useEffect(() => {
    if(status === 'unauthenticated'){
      Router.replace('/admin/login')
    }
  }, [status])
  
  if(status==='authenticated'){
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
  } 

  return <div className="text-center my-10">Loading</div>
};

export default AddProduct;
