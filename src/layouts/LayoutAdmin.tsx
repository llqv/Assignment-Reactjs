import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;


const items1: MenuProps["items"] = ["Thống kê", "Sản phẩm", "Danh mục"].map((key) => ({
    key,
    label: `${key}`
}));

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type
    } as MenuItem;
}


const items2: MenuItem[] = [
    getItem(<Link to="/admin">Thống kê</Link>, "sub1", <MailOutlined />),
    getItem("Sản phẩm", "sub2", <AppstoreOutlined />, [
        getItem(<Link to="/admin/products">Danh sách sản phẩm</Link>, "5"),
        getItem(<Link to="/admin/products/add">Thêm sản phẩm</Link>, "6",),
    ]),
    getItem("Danh mục", "sub4", <SettingOutlined />, [
        getItem("Quản lý danh mục", "9"),
        getItem("Thêm danh mục", "10")
    ]),
    getItem("Tài khoản", "sub5", <SettingOutlined />, [
        getItem("Admin", "11"),
        getItem("User", "12")
    ])
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
const logout = () => {
    localStorage.removeItem("user")
}
const LayoutAdmin: React.FC = () => (

    <Layout>
        <Header className="header">
            <div className="absolute right-4 h-[-50px] w-64">
                <Link to={"/"}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-boldrounded w-24 font-semibold">
                        Home
                    </button>
                </Link >
                <Link to={"/auth"}>
                    <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-boldrounded w-24">
                        Sign Out
                    </button>
                </Link >
            </div>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                items={items1}
            />

        </Header>
        <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    style={{ height: "100%", borderRight: 0 }}
                    items={items2}
                />
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    </Layout>
);

export default LayoutAdmin;
