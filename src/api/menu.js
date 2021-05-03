export function updateHidden(id, params) {
    return request({
        url: '/menu/updateHidden/' + id,
        method: 'post',
        params: params
    })
}

