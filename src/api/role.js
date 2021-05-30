import request from "../axios";

export function createRole(data) {
    return request({
        url: '/role/create',
        method: 'post',
        data: data
    })
}

export function updateRole(id, data) {
    return request({
        url: '/role/update/' + id,
        method: 'post',
        data: data
    })
}

export function deleteRole(id, data) {
    return request({
        url: '/role/delete',
        method: 'post',
        data: data
    })
}

export function listMenuByRole(roleId) {
    return request({
        url: '/role/listMenu/'+roleId,
        method: 'get'
    })
}

export function allocMenu(data) {
    return request({
        url: '/role/allocMenu',
        method: 'post',
        data:data
    })
}

export function allocResource(data) {
    return request({
        url: '/role/allocResource',
        method: 'post',
        data:data
    })
}
export function listResourceByRole(roleId) {
    return request({
        url: '/role/listResource/'+roleId,
        method: 'get'
    })
}