import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { useSelector } from "react-redux";
import { selectLoading } from "./loadingSlice";

export function Loading({ children }) {
  const isLoading = useSelector(selectLoading);
  return (
    <Flex align="center" gap="middle">
      <Spin
        spinning={isLoading}
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      >
        {children}
      </Spin>
    </Flex>
  );
}
