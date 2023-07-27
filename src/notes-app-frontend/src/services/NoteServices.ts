import { getTokenFromSessionStorage } from "./UserServices"
import { NoteCreationAttributes } from "../types/notes.types"
import { host } from "../constants"

const hostURL = new URL(host)

const registerNotePathname = '/api/note/registerNote'
// const updateNotePathname = '/api/note/updateNote'
const getAllNotesPathname = '/api/note/getNotes'

export const createNote = async (note: NoteCreationAttributes) => {

    let token = getTokenFromSessionStorage()

    console.log(token)
    if (!token){
        console.log('No token')
        window.location.hostname = '/login/'
    }

    hostURL.pathname = registerNotePathname

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
                if(response.ok){
                    return response.json()
                }
                else{
                    return response.text()
                }
            }
        )
        .catch(
            err => console.log(err)
        )
}

export const getAllNotes = async () => {
    let token = getTokenFromSessionStorage()

    console.log(token)
    if (!token){
        console.log('No token')
        window.location.hostname = '/login/'
    }

    hostURL.pathname = getAllNotesPathname

    let headers = new Headers()
    headers.append("Authorization",`Bearer ${token}`)
    headers.append("Content-Type", "application/json")

    let request = new Request(
        hostURL,
        {
            headers,
            method: 'GET',            
        }
    )

    return (
        fetch(request)
            .then(response => response.json())
    )
        

}