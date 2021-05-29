const Mock=require('mockjs')
const Random=Mock.Random
let Result={
    code:200,
    msg:'操作成功',
    data:null
}
Mock.mock('/getCode','get',()=>{
    Result.data={
        token:Random.string(32),
        Img:Random.dataImage( "120x40", "11111" )
    }
    return Result
})

Mock.mock('/login','post',(options)=>{
    const {code}=JSON.parse(options.body)
    if ("11111"!==code){
        Result.code=400
        Result.msg="验证码错误"
    }

    return Result
})

Mock.mock('/ums/UserInfo','get',()=>{
    Result.data={
        id:"",
        username:"Admin",
        avatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    }

    return Result
})

Mock.mock('/logout','post',()=>{

    return Result
})

Mock.mock('/ums/menu','get',()=>{
    let menu=[{
        name:'ums',
        title:'权限',
        icon:'el-icon-s-operation',
        path:'',
        children:[
            {
                name:'umsAdmin',
                title:'用户列表',
                icon:'el-icon-s-custom',
                path:'/ums/admin',
                component:'/ums/admin/User'
            },
            {
                name:'umsRole',
                title:'角色列表',
                icon:'el-icon-rank',
                path:'/ums/role',
                component:'/ums/role/Role'
            },
            {
                name:'umsMenu',
                title:'菜单列表',
                icon:'el-icon-menu',
                path:'/ums/menu',
                component:'/ums/menu/Menu'
            },
            {
                name:'umsResource',
                title:'资源列表',
                icon:'el-icon-reading',
                path:'/ums/resource',
                component:'/ums/resource/Resource'
            },
        ]
    }]
    let aut=[]
    Result.data={
        menu:menu,
        aut:aut
    }
    return Result
})

Mock.mock('/ums/menu/List','get',()=>{
    Result.data=[{
        id:1,
        title:'权限',
        level:'一级',
        name:'ums',
        icon:'el-icon-s-operation',
        sort:'0',
        children:[{
            id:2,
            title:'用户列表',
            level:'二级',
            name:'umsAdmin',
            icon:'el-icon-s-operation',
            sort:'0',
        },
            {
                id:3,
                title:'菜单列表',
                level:'二级',
                name:'umsMenu',
                icon:'el-icon-s-operation',
                sort:'0',
            }]
    }]

    return Result
})

Mock.mock(RegExp('/ums/menu/info/*'), 'get', () => {

    Result.data ={
        id:1,
        title:'权限',
        level:'一级',
        name:'ums',
        icon:'el-icon-s-operation',
        sort:'0',
        children:[{
            id:2,
            title:'用户列表',
            level:'二级',
            name:'umsAdmin',
            icon:'el-icon-s-operation',
            sort:'0',
        },
            {
                id:3,
                title:'菜单列表',
                level:'二级',
                name:'umsMenu',
                icon:'el-icon-s-operation',
                sort:'0',
            }]
    }

    return Result
})

Mock.mock(RegExp('/ums/menu/*'), 'post', () => {

    return Result
})

Mock.mock('/ums/role/List','get',()=> {
    Result.data={
        "list":[
            {
                id:1,
                name:"超级管理员",
                description:"拥有所有查看和操作功能",
                adminCount:0,
                createTime:"2021-05-28 15:11:05",
                status:1
            },
            {
                id:2,
                name:"项目管理员",
                description:"只能管理及操作运动项目",
                adminCount:0,
                createTime:"2021-05-28 15:21:05",
                status:1
            }
            ]
    }
    return Result
})

Mock.mock('/role/create','post',()=>{

    return Result
})

Mock.mock(RegExp('/role/update/*'), 'post', () => {

    return Result
})

Mock.mock('/role/delete','post',()=>{

    return Result
})

Mock.mock(RegExp('/role/listMenu/*'), 'get', () => {

    return Result
})

Mock.mock('/role/allocMenu','post',()=>{

    return Result
})

Mock.mock(RegExp('/admin/list'),'get',()=> {
    Result.data={
        "list":[
            {
                id: "1",
                username: "test",
                nickName: "测试账号",
                email: "994057864@qq.com",
                password:"1234567",
                createTime:"2021-05-29 15:11:05",
                loginTime:"2021-05-29 15:31:05",
                status: 1
            },
            {
                id: "2",
                username: "admin",
                nickName: "管理员账号",
                email: "994857864@qq.com",
                password:"1234567",
                createTime:"2021-05-29 15:12:05",
                loginTime:"2021-05-29 15:30:05",
                status: 1
            }
        ]
    }
    return Result
})
