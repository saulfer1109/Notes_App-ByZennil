import { getTokenFromSessionStorage } from "./UserServices"
import { NoteAttributes, NoteCreationAttributes } from "../types/notes.types"
import { host } from "../constants"

const hostURL = new URL(host)

const REGISTER_NOTE_PATHNAME = '/api/note/registerNote'
const UPDATE_NOTE_PATHNAME = '/api/note/updateNote'
const GET_NOTES_PATHNAME = '/api/note/getNotes'
const DELETE_NOTE_PATHNAME = '/api/note/deleteNote'

export const createNote = async (note: NoteCreationAttributes) => {

    let token = getTokenFromSessionStorage()

    console.log(token)
    if (!token){
        console.log('No token')
        window.location.hostname = '/login/'
    }

    hostURL.pathname = REGISTER_NOTE_PATHNAME

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

    hostURL.pathname = GET_NOTES_PATHNAME

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

export const updateNote = async (noteUpdate: Partial<NoteAttributes>) => {

    const token = getTokenFromSessionStorage()
    
    let headers = new Headers()
    headers.append("Authorization",`Bearer ${token}`)
    headers.append("Content-Type", "application/json")

    hostURL.pathname = UPDATE_NOTE_PATHNAME

    console.log(noteUpdate)

}

export const deleteNote = async (noteId:number) => {
    const token = getTokenFromSessionStorage()
    
    let headers = new Headers()
    headers.append("Authorization",`Bearer ${token}`)
    headers.append("Content-Type", "application/json")

    hostURL.pathname = DELETE_NOTE_PATHNAME

    let request = new Request(hostURL,{
        method: 'DELETE',
        body: JSON.stringify({id: noteId}),
        headers
    })

    return fetch(request)
            .then(response => response.ok)

    
    
}