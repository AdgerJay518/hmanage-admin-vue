import request from "../axios";

export function fetchList(params) {
    return request({
        url:'/subjectCategory/list',
        method:'get',
        params:params
    })
}

export function updateRecommendStatus(data) {
    return request({
        url:'/subjectCategory/update/recommendStatus',
        method:'post',
        data:data
    })
}

export function deleteHomeSubject(data) {
    return request({
        url:'/subjectCategory/home/subject/delete',
        method:'post',
        data:data
    })
}

export function updateHomeSubjectSort(params) {
    return request({
        url:'/subjectCategory/update/sort/'+params.id,
        method:'post',
        params:params
    })
}

export function getSubjectCate(id) {
    return request({
        url:'/subjectCategory/'+id,
        method:'get',
    })
}

export function create(data) {
    return request({
        url:'/subjectCategory/create',
        method:'post',
        data:data
    })
}

export function updateSubject(id,data) {
    return request({
        url:'/subjectCategory/update/'+id,
        method:'post',
        data:data
    })
}
