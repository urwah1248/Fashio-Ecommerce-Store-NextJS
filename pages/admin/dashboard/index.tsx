import React from "react";
import SidebarWithHeader from "@/components/Sidebar";
import OrdersTable from "../../../components/OrdersTable";
import Head from "next/head";

const Dashboard = () => {
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
};

export default Dashboard;
