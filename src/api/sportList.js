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

export function getOrderDetail(id) {
    return request({
        url:'/order/'+id,
        method:'get'
    });
}


export function updateOrderNote(params) {
    return request({
        url:'/order/update/note',
        method:'post',
        params:params
    })
}

export function deleteOrder(params) {
    return request({
        url:'/order/delete',
        method:'post',
        params:params
    })
}
