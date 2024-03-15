const Handlers = ((statusCode,message,data,success)=>{
    return{
        statusCode:statusCode,
        message:message,
        data:data,
        success:success
    }
})

module.exports = Handlers