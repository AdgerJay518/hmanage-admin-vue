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

export function deleteSubject(data) {
    return request({
        url:'/subject/delete/',
        method:'post',
        data:data
    })
}
export function updateSubject(id,data) {
    return request({
        url:'/subject/update/'+id,
        method:'post',
        data:data
    })
}

export function getSubject(id) {
    return request({
        url:'/subject/'+id,
        method:'get',
    })
}

export function create(data) {
    return request({
        url:'/subject/create',
        method:'post',
        data:data
    })
}


