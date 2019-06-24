import React from "react";
import City from "./City";
import Restaurants from "./Restaurants";
import { Layout } from "antd";

const { Content } = Layout;
const BodyComponent = () => (
  <Content style={{ minHeight: "500px", marginTop: "50px" }}>
    <div className="container">
      <City />
      <Restaurants />
    </div>
  </Content>
);

export default BodyComponent;
