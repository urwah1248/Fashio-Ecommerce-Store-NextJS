import React from "react";
import SidebarWithHeader from "@/components/Sidebar";
import OrdersTable from "../../../components/OrdersTable";

const Dashboard = () => {
  return (
    <div>
      {/* <AppDrawer /> */}
      <SidebarWithHeader children={<OrdersTable />} />
    </div>
  );
};

export default Dashboard;
