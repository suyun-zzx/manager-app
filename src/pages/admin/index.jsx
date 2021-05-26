import React, { Component } from 'react'
import { Redirect,Switch,Route } from 'react-router-dom'
import { Layout, Menu} from 'antd'
import {
    PieChartOutlined,
    FileOutlined,
    UserOutlined
} from '@ant-design/icons'
import memory from '../../utils/memory'
import MyLink from '../../taplib/MyLink'
import Home from '../../pages/home'
import User from '../../pages/user'
import Category from '../../pages/category'
import Commodity from '../../pages/commodity'
import Header from '../../components/Header'

export default class Admin extends Component {

    render() {
        const { user } = memory
        if (!user || !user._id) {
            return <Redirect to='/login' />
        }

        const { Sider, Content, Footer} = Layout
        const { SubMenu } = Menu 

        return (
            <Layout className='admin'>
                <Sider collapsible className='admin-leftnav'>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined/>}>
                           <MyLink to='/admin/home'>首页</MyLink>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="商品">
                            <Menu.Item key="2">
                                <MyLink to='/admin/category'>品类管理</MyLink>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <MyLink to='/admin/commodity'>商品管理</MyLink>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key='4' icon={<UserOutlined />}>
                            <MyLink to='/admin/user'>用户管理</MyLink>
                        </Menu.Item>
                        <Menu.Item key="9" icon={<FileOutlined />}>
                            角色管理
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout>
                    <Header/>
                    <Content className='content'>
                        <Switch>
                            <Route path='/admin/home' component={Home}/>
                            <Route path='/admin/category' component={Category}/>
                            <Route path='/admin/commodity' component={Commodity} />
                            <Route path='/admin/user' component={User}/>
                            <Redirect to='/admin/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}