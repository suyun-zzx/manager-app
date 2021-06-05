import {request} from '../services/request'

export const reqCommodity = ({pageNum,pageSize}) => {
    return request({
        url:'/manage/product/list',
        method:'get',
        params:{
            pageNum,
            pageSize
        }
    })
}

export const searchCommodity = ({searchType,searchName,pageNum,pageSize}) => {
    return request ( {
        url:'/manage/product/search',
        method:'get',
        params:{
            [searchType]:searchName,
            pageNum,
            pageSize
        }
    })
}