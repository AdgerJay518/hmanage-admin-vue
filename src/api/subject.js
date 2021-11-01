import request from "../axios";

export function fetchList(params) {
    return request({
        url:'/subject/list',
        method:'get',
        params:params
    })
}

export function listByCateId(params) {
    return request({
        url:'/subject/listById',
        method:'get',
        params:params
    })
}

export function deleteSubject(id) {
    return request({
        url:'/subject/delete/'+id,
        method:'post'
    })
}
export function updateSubject(id,data) {
    return request({
        url:'/subject/update/'+id,
        method:'post',
        data:data
    })
}
