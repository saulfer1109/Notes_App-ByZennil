import { host } from "../constants"
const hostURL = new URL(host)

const REGISTER_USER_PATHNAME = '/api/user/createUser'
const LOGIN_PATHNAME = 'api/user/login'

let headers = new Headers()
headers.append("Content-Type","application/json")
headers.append("Accept","*/*")

export const login = (email:string, password:string) => {
    hostURL.pathname = LOGIN_PATHNAME

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

export const registerUser = (name: string, email: string, password: string) => {
    hostURL.pathname = REGISTER_USER_PATHNAME

    let request = new Request(hostURL,
        {
            method: 'POST',
            credentials: 'same-origin',
            headers,
            body: JSON.stringify({name,email,password})
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

