import request from "../axios";

export function fetchList(params) {
    return request({
        url:'/food/list',
        method:'get',
        params:params
    })
}

export function updateDeleteStatus(params) {
    return request({
        url:'/food/update/deleteStatus',
        method:'post',
        params:params
    })
}


export function updateRecommendStatus(params) {
    return request({
        url:'/food/update/recommendStatus',
        method:'post',
        params:params
    })
}

export function createFood(data) {
    return request({
        url:'/food/create',
        method:'post',
        data:data
    })
}

export function updateFood(id,data) {
    return request({
        url:'/food/update/'+id,
        method:'post',
        data:data
    })
}

export function getFood(id) {
    return request({
        url:'/food/updateInfo/'+id,
        method:'get',
    })
}



