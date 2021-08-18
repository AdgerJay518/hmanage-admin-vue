import request from "../axios";

export function fetchList(params) {
    return request({
        url:'/sport/list',
        method:'get',
        params:params
    })
}

export function updateDeleteStatus(params) {
    return request({
        url:'/sport/update/deleteStatus',
        method:'post',
        params:params
    })
}


export function updateRecommendStatus(params) {
    return request({
        url:'/sport/update/recommendStatus',
        method:'post',
        params:params
    })
}

export function createSport(data) {
    return request({
        url:'/sport/create',
        method:'post',
        data:data
    })
}

export function updateSport(id,data) {
    return request({
        url:'/sport/update/'+id,
        method:'post',
        data:data
    })
}

export function getSport(id) {
    return request({
        url:'/sport/updateInfo/'+id,
        method:'get',
    })
}



