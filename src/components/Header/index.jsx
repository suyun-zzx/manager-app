import React, { Component } from 'react'
import {Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import moment from 'moment'
import memory from '../../utils/memory'
import local from '../../utils/local'
import {getWeather} from '../../api/home'

class Header extends Component {
    state = {
        date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        temperature: '',
        weather: ''
    }

    getTime = () => {
        this.interval = setInterval(() => {
            const date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            this.setState({date})
        },1000)
    }

    async getWeather(){
        const res = await getWeather()
        if(res.lives) {
            const {temperature,weather} = res.lives[0]
            this.setState({temperature,weather})
        }
    }

    componentDidMount(){
        this.getTime()
        this.getWeather()
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    exit = () => {
        Modal.confirm({
            content:'确定退出登录？',
            onOk:()=>{
                local.removeUser()
                memory.user = {}
                this.props.history.replace('/login')
            }
        })
    }

    render() {
        const {date,temperature,weather} = this.state

        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎</span>
                    <span>{memory.user.username}</span>
                    <span onClick={this.exit}>退出</span>
                </div>
                <div className='header-bottom'>
                    <div className='left'>管理员系统</div>
                    <div className='right'>
                        <span>{date}</span>
                        <span>{temperature}℃</span>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)