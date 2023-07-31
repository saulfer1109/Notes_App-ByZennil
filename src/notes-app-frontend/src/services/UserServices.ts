import { host } from "../constants"
const hostURL = new URL(host)

export const login = (email:string, password:string) => {

    let headers = new Headers()
    headers.append("Content-Type","application/json")
    headers.append("Accept","*/*")

    hostURL.pathname = 'api/user/login'

    let request = new Request(hostURL,
        {
            method: 'POST', 
            credentials: 'same-origin',
            headers,
            body: JSON.stringify({email,password})
        }
    )
    
    return fetch(request)
}


export const getTokenFromSessionStorage = () => {
    return sessionStorage.getItem('token')
}
export const removeTokenFromSessionStorage = () => {
    sessionStorage.removeItem('token')
}

