const middlewareUserAuth=(req, res, next)=>{
    const token = "xyz";
    const isUSerAuthenticated = token==="xyz";
    if(!isUSerAuthenticated){
        res.status(401).send("user is not authorized")
    }
    else{
        next();
    }
    }
    module.exports ={
        middlewareUserAuth
    }