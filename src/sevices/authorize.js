// load data to session storage

export const authenticate = (res,next) =>{
    if(window !== 'undefined'){
        sessionStorage.setItem("token",JSON.stringify(res.data.token))
        sessionStorage.setItem("user",JSON.stringify(res.data.username))
    }
    next()
}

export const getToken = () =>{
    if(window !== 'undefined'){
        if(sessionStorage.getItem("token")){
            // JSON.parse = convert STRING to JSON
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}

export const getUser = () =>{
    if(window !== 'undefined'){
        if(sessionStorage.getItem("user")){
            // JSON.parse = convert STRING to JSON
            return JSON.parse(sessionStorage.getItem("user"))
        }else{
            return false
        }
    }
}

export const logout = (next) =>{
    if(window !== 'undefined'){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }
    next()
}