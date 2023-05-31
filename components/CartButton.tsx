import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
import 'bootstrap-icons/font/bootstrap-icons.css'

interface Props {
  count?: String,
}

const CartButton = (props:Props) => (
  <Space size="middle">
    <Badge count={props.count}>
      <i className="bi bi-bag text-lg"></i>
    </Badge>
  </Space>
);

export default CartButton;
