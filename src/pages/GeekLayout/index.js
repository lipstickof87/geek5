import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet,Link,useLocation} from 'react-router-dom'
import { useStore } from '../../store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const { Header, Sider } = Layout

const GeekLayout = () => {
  const location = useLocation()
  const selectedKey = location.pathname
  const { userStore } = useStore()//又忘记括号了！！！
  const {loginStore}=useStore()
  useEffect(() => {
    try {
      userStore.getUserInfo()
    } catch {
      console.log(3)
    }
    
  },[])
  const navigate = useNavigate()
  const onLoginOut = () => {
    loginStore.loginOUt()
    navigate('/login')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{ userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onLoginOut}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
           selectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}

          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/"></Link>数据概览
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to="/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to="/publish">发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}><Outlet /></Layout>
      </Layout>
    </Layout>
  )
}

export default GeekLayout