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
