import React from 'react';
import { GroupOutlined, CalendarOutlined, DatabaseOutlined  } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import './style.css'; // Import the CSS file
import Dashboard from './Component/DashBoard'
import ThemDanhMuc from './Component/DanhMuc/Them';
import ThemLoaiSanPham from './Component/LoaiSanPham/Them';
import ThemSanPham from './Component/SanPham/Them';
import DanhSachDanhMuc from './Component/DanhMuc/DanhSach';
import DanhSachLoaiSanPham from './Component/LoaiSanPham/DanhSach';
import DanhSachSanPham from './Component/SanPham/DanhSach';
// ... (previous imports)

// ... (previous imports)

const { Header, Content, Footer, Sider } = Layout;
 
const items1 = [<Link key="0" to="/admin">Dashboard</Link>, 'Danh Mục', 'Loại Sản Phẩm', 'Sản Phẩm'].map((label, index) => ({
  key: String(index + 1),
  label,
}));


const icons = [ DatabaseOutlined ,GroupOutlined , CalendarOutlined ];

const items2 = icons.map((icon, index) => {
  const key = `sub${index + 1}`;
  return {
    key,
    icon: React.createElement(icon),
    label: items1[index + 1] ? items1[index + 1].label : '',
  };
});

items2.forEach((item, index) => {
  if (items1[index + 1]) {
    const { label } = items1[index + 1];

    item.children = [
      {
        key: `option${index + 1}-1`,
        label: (
          <Link key={`link1-${index + 1}`} to={`/admin/them-${label.toLowerCase().replace(/\s/g, "-")}`}>
            Thêm
          </Link>
        ),
      },
      {
        key: `option${index + 1}-2`,
        label: (
          <Link key={`link2-${index + 1}`} to={`/admin/danh-sach-${label.toLowerCase().replace(/\s/g, "-")}`}>
            Danh Sách
          </Link>
        ),
      },
    ];
  }
});
const Admin = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header className="header">
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1.filter(item => item.key === '1')}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb items={[
          { key: 'home', label: 'Home' },
          { key: 'list', label: 'List' },
          { key: 'app', label: 'App' },
        ]} />
        <Layout style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }} items={items2} />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/them-danh-mục" element={<ThemDanhMuc />} />
            <Route path="/them-loại-sản-phẩm" element={<ThemLoaiSanPham />} />
            <Route path="/them-sản-phẩm" element={<ThemSanPham />} />
            <Route path="/danh-sach-danh-mục" element={<DanhSachDanhMuc />} />
            <Route path="/danh-sach-loại-sản-phẩm" element={<DanhSachLoaiSanPham />} />
            <Route path="/them-sản-phẩm-sản-phẩm" element={<DanhSachSanPham />} />
            <Route path="/danh-sach-Sản-Phẩm" element={<DanhSachSanPham />} />
            </Routes>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </Layout>
  );
};

export default Admin;
