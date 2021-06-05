import {request} from '../services/request'

export const getCategory = (parentId) => {
    return request({
        url:'/manage/category/list',
        method:'get',
        params:{
            parentId
        }
    })
}

export const reqUpdateCategory = ({categoryId,categoryName}) => {
    return request({
        url:'/manage/category/update',
        method:'post',
        data:{
            categoryName,
            categoryId
        }
    })
}

export const reqAddCategory = ({categoryName,parentId}) => {
    return request({
        url:'/manage/category/add',
        method:'post',
        data:{
            categoryName,
            parentId
        }
    })
}