import React, { useState } from "react";
import type { DrawerProps } from "antd";
import { Button, Drawer, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const AppDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <MenuOutlined onClick={showDrawer} />
      </Space>
      <Drawer
        title="Basic Drawer"
        placement={"left"}
        closable={false}
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default AppDrawer;
