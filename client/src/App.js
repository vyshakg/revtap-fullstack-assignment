import { Layout, Menu } from "antd";
import Analytics from "./components/Analytics";
import MainLayout from "./components/MainLayout";
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Order details</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <MainLayout />
        <Analytics />
      </Content>
      <Footer style={{ textAlign: "center", marginTop: 64 }}>
        revtap task ©2020 Created by vyshak g
      </Footer>
    </Layout>
  );
}

export default App;
