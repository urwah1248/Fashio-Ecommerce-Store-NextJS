import React, { useEffect } from "react";
import SidebarWithHeader from "@/components/Sidebar";
import OrdersTable from "../../../components/OrdersTable";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Router from "next/router";

const Dashboard = () => {
  const {status, data} = useSession();

  useEffect(() => {
    if(status === 'unauthenticated'){
      Router.replace('/admin/login')
    }
  }, [status])

  if(status === 'authenticated'){
    return (
      <>
        <Head>
          <title>Dashboard | Admin</title>
        </Head>
        <div>
          {/* <AppDrawer /> */}
          <SidebarWithHeader children={<OrdersTable />} />
        </div>
      </>
    )
  }

  return <div className="text-center my-10">Loading</div>
};

export default Dashboard;
