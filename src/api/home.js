import {reqWeather} from '../services/request'
const key = '92e41f15c130e8d748d1b400b7e05e4e'
const city = '510108'

export const getWeather = () => {
    return reqWeather({
        method:'GET',
        params:{
            key,
            city
        }
    })
}