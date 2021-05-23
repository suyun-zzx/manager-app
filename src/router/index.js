import React from 'react'
import {Redirect} from 'react-router-dom'

const Admin = React.lazy(()=>import('../pages/admin'))
const Login = React.lazy(()=>import('../pages/login'))

const routes = [
    {
        path: "/",
        exact: true,
        render: () => (
            <Redirect to="/login" />
        )
    },
    {
        path:'/admin',
        component:Admin
    },
    {
        path:'/login',
        component:Login
    }
]



export default routes