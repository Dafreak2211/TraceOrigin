import { useState } from "react";

import { Flex, Image, ListIcon, Text } from "@chakra-ui/core";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  BorderVerticleOutlined,
  InfoCircleOutlined,
  FileOutlined,
  InsertRowBelowOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Test = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Flex
          dir="row"
          align="center"
          justify="center"
          height="80px"
          w="100%"
          borderBottom="1px solid #353638"
        >
          <Image src="/water.svg" height="32px" mr={2}></Image>
          <Text color="#fff" fontWeight="medium" fontSize="20px">
            Trace Origin.
          </Text>
        </Flex>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<InfoCircleOutlined />}>
            <Link href="/dashboard">
              <a>Thông tin</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BorderVerticleOutlined />}>
            <Link href="/dashboard/ponds">
              <a>Ao</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FileOutlined />}>
            <Link href="/dashboard/notes">
              <a>Ghi chú</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<InsertRowBelowOutlined />}>
            <Link href="/dashboard/diary">
              <a>Nhật ký hằng ngày </a>
            </Link>
          </Menu.Item>

          <SubMenu
            icon={<PlusCircleOutlined />}
            key="5"
            title={
              <span>
                <span>Thêm</span>
              </span>
            }
          >
            <Menu.Item key="6" icon={<DesktopOutlined />}>
              <Link href="/dashboard/addfood">
                <a> Nhập thức ăn</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<DesktopOutlined />}>
              <Link href="/dashboard/addfood">
                <a> Nhập thuốc</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            icon={<DesktopOutlined />}
            key="8"
            title={
              <span>
                <span>Biểu đồ</span>
              </span>
            }
          >
            <Menu.Item key="9" icon={<DesktopOutlined />}>
              <Link href="/dashboard/feedingchart">
                <a> Cho ăn</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="10" icon={<DesktopOutlined />}>
            <Link href="/dashboard/food">
              <a> Thức ăn</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<DesktopOutlined />}>
            <Link href="/dashboard/food">
              <a> Thuốc</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="12" icon={<DesktopOutlined />}>
            <Link href="/dashboard/food">
              <a> Cho ăn</a>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>Header here</Header>
        <Content
          style={{
            margin: "0 16px",
            fontSize: "100px",
            height: "100vh",
            overflowY: "scroll",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis minus
          repudiandae culpa exercitationem nulla corporis quisquam architecto,
          rem accusamus, nobis natus asperiores sed? Ipsa perspiciatis tempora
          architecto, explicabo quae nam? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugiat labore accusamus beatae esse placeat
          explicabo expedita numquam sed similique asperiores accusantium dolore
          quia ut harum, magnam veniam itaque mollitia vitae?
        </Content>
      </Layout>
    </Layout>
  );
};

export default Test;
