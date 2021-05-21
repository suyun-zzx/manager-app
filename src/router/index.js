import React from 'react'

const Admin = React.lazy(()=>import('../pages/admin'))
const Login = React.lazy(()=>import('../pages/login'))

const routes = [
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