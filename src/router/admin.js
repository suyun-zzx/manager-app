import React from 'react'
import {Redirect} from 'react-router-dom'

const Home = React.lazy(()=>import('../pages/home'))

const routes = [
    {
        path: '/admin',
        exact: true,
        render: () => (
            <Redirect to='/admin/home'/>
        )
    },
    {
        path:'/admin/home',
        component:Home
    }
]