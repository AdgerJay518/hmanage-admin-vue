import request from "../axios";

export function fetchList(parentId,params) {
    return request({
        url:'/foodCategory/list/'+parentId,
        method:'get',
        params:params
    })
}
export function deleteFoodCate(id) {
    return request({
        url:'/foodCategory/delete/'+id,
        method:'post'
    })
}

export function createFoodCate(data) {
    return request({
        url:'/foodCategory/create',
        method:'post',
        data:data
    })
}

export function updateFoodCate(id,data) {
    return request({
        url:'/foodCategory/update/'+id,
        method:'post',
        data:data
    })
}

export function getFoodCate(id) {
    return request({
        url:'/foodCategory/'+id,
        method:'get',
    })
}

export function updateShowStatus(id,params) {
    return request({
        url:'/foodCategory/update/showStatus/'+id,
        method:'post',
        params:params
    })
}

export function updateNavStatus(id,params) {
    return request({
        url:'/foodCategory/update/navStatus/'+id,
        method:'post',
        params:params
    })
}

export function fetchListWithChildren() {
    return request({
        url:'/foodCategory/list/withChildren',
        method:'get'
    })
}
