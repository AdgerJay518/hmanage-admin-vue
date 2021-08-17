import request from "../axios";

export function fetchList(parentId,params) {
    return request({
        url:'/sportCategory/list/'+parentId,
        method:'get',
        params:params
    })
}
export function deleteSportCate(id) {
    return request({
        url:'/sportCategory/delete/'+id,
        method:'post'
    })
}

export function createSportCate(data) {
    return request({
        url:'/sportCategory/create',
        method:'post',
        data:data
    })
}

export function updateSportCate(id,data) {
    return request({
        url:'/sportCategory/update/'+id,
        method:'post',
        data:data
    })
}

export function getSportCate(id) {
    return request({
        url:'/sportCategory/'+id,
        method:'get',
    })
}

export function updateShowStatus(id,params) {
    return request({
        url:'/sportCategory/update/showStatus/'+id,
        method:'post',
        params:params
    })
}

export function updateNavStatus(id,params) {
    return request({
        url:'/sportCategory/update/navStatus/'+id,
        method:'post',
        params:params
    })
}

export function fetchListWithChildren() {
    return request({
        url:'/sportCategory/list/withChildren',
        method:'get'
    })
}
