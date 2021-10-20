import request from "../axios";

export function fetchList(params) {
    return request({
        url:'/order/list',
        method:'get',
        params:params
    })
}

export function deleteList(params) {
    return request({
        url:'/order/delete',
        method:'post',
        params:params
    })
}
