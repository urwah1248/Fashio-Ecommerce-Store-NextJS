import ProductsTable from "@/components/ProductsTable";
import SidebarWithHeader from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Router from "next/router";
import React, { useEffect } from "react";

const Products = () => {
  
  const {status} = useSession();

  useEffect(() => {
    if(status === 'unauthenticated'){
      Router.replace('/admin/login')
    }
  }, [status])
  
  if(status==='authenticated'){
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
  } 

  return <div className="text-center my-10">Loading</div>
};

export default Products;
