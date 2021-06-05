import axios from 'axios'
import { TEST_URL, TIME } from './config'

export const request = axios.create({
    baseURL: TEST_URL,
    timeout: TIME
})

export const reqWeather = axios.create({
    baseURL: 'https://restapi.amap.com/v3/weather/weatherInfo',
    timeout: 6000
})

reqWeather.interceptors.response.use(res => {
    return res.data
},err => {
    if (err && err.response) {
        switch (err.response.status) {
          case 400:
            console.log("请求错误");
            break;
          case 401:
            console.log("未授权访问");
            break;
          default:
            console.log("其他错误信息");
        }
      }
      return err;
})

request.interceptors.response.use(res => {
    return res.data
}, err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log("请求错误");
          break;
        case 401:
          console.log("未授权访问");
          break;
        default:
          console.log("其他错误信息");
      }
    }
    return err;
  })