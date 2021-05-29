import request from "../axios";

export function updateHidden(id, params) {
    return request({
        url: '/menu/updateHidden/' + id,
        method: 'post',
        params: params
    })
}

export function TreeList() {
    return request({
        url: '/ums/menu/List',
        method: 'get'
    })
}
