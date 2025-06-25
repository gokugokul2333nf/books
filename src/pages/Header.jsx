import { useNavigate, Link } from "react-router-dom";
import { Layout, Menu, Button, Grid } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  BookOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { useBreakpoint } = Grid;

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const username = localStorage.getItem("username"); // 👈 get username
  const screens = useBreakpoint();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/", { replace: true });
  };

  return (
    <AntHeader
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 16px",
      }}
    >
      {/* Title */}
      <div style={{ color: "#fff", fontSize: "20px", display: "flex", alignItems: "center" }}>
        <BookOutlined style={{ marginRight: 8 }} />
        Bookmark Saver
      </div>

      {/* Right Menu */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center", color: "white" }}>
        {isLoggedIn && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <UserOutlined />
            <span style={{ fontWeight: 500 }}>{username}</span>
          </div>
        )}
        <Menu theme="dark" mode="horizontal" selectable={false} style={{ borderBottom: "none" }}>
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/main">Home</Link>
          </Menu.Item>
        </Menu>
        {isLoggedIn && (
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </AntHeader>
  );
}
