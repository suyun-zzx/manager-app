import React, { Component, Fragment } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { reqLogin } from '../../api/login'
import memory from '../../utils/memory'
import local from '../../utils/local'

export default class Login extends Component {

    onFinish = async (values) => {
        const { username, password } = values
        const res = await reqLogin(username, password)
        if (res && res.status === 0) {
            memory.user = res.data
            local.saveUser(res.data)
            this.props.history.replace('/admin')
        } else {
            alert('登陆失败')
        }

    }

    showLogin = () => {
        return (
            <div className="login">
                <header>
                    <h1>Manager System</h1>
                </header>
                <section>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <h2>管理员登录</h2>
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: '用户名不能为空!' },
                                { pattern: /^[a-zA-Z][a-zA-Z0-9@.]*$/, message: '必须以字母开头，且由英文、数字或@ .组成' },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: '密码不能为空!' },
                                { min: 6, message: '密码不少于6位' },
                                { max: 15, message: '密码不能超过15位' },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }

    render() {
        const { user } = memory
        if (user && user._id) {
            return <Redirect to='/admin' />
        }

        return (
            <Fragment>
                {this.showLogin()}
            </Fragment>
        )
    }
}