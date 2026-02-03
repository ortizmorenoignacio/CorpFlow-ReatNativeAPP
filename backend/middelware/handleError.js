module.exports = (error,request,response,next)=>{
    console.error(error)
    console.log(error.name)
    if (error.name == 'Cast Error') {
        response.status(400).send({error : "Se esta usando un id incorrecto"})
    } else {
        response.status(500).end()
    }
    
}