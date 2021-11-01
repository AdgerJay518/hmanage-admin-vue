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
        url:'/home/recommendSubject/delete',
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
