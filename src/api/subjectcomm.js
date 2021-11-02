import request from "../axios";

export function listById(params) {
    return request({
        url:'/subjectComment/listById',
        method:'get',
        params:params
    })
}

export function updateStatus(id,params) {
    return request({
        url:'/subjectComment/update/status/'+id,
        method:'post',
        params:params
    })
}

export function deleteComment(id) {
    return request({
        url:'/subjectComment/delete/'+id,
        method:'post'
    })
}
