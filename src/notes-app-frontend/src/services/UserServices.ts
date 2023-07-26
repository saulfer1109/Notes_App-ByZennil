import { host } from "../constants"
import { NoteCreationAttributes } from "../types/notes.types"
// import Cookies from "universal-cookie"
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

export const createNote = async (note: NoteCreationAttributes) => {

    let token = getTokenFromSessionStorage()

    
    console.log(token)
    if (!token){
        console.log('No token')
        window.location.hostname = '/login/'
    }

    hostURL.pathname = '/api/note/registerNote'

    let headers = new Headers()
    headers.append("Authorization",`Bearer ${token}`)
    headers.append("Content-Type", "application/json")

    let request = new Request(
        hostURL,
        {
            body: JSON.stringify({note: note}),
            headers,
            method: 'POST',
            redirect: "follow"  
            
        }
    )

    return fetch(request)
        .then(
            response => {
                if (response.ok){
                    console.log('register note')
                    return response.json()
                }
                return response.text()
            }
        )
        .catch(
            err => console.log(err)
        )
}