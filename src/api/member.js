import request from "../axios";

export function getlist(params) {
    return request({
        url: '/member/list',
        method: 'get',
        params: params
    })
}

export function updateStatus(id, params) {
    return request({
        url: '/member/updateStatus/' + id,
        method: 'post',
        params: params
    })
}

export function deleteMember(id) {
    return request({
        url: '/member/delete/' + id,
        method: 'post'
    })
}
