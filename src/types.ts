import { NoteAttributes } from "./models/note";

export interface updateApiResponse{
    updated: boolean;
    message: updateMessage | updatingEmailMessage | updatingPasswordMessage;
}

export type updateMessage = 'Non-existing-account' | 'Updated succesfully' | 'Unexpected error'

export type updatingEmailMessage =  updateMessage | 'Account with repeated email'

export type updatingPasswordMessage = updateMessage | 'Incorrect password'

export type loggingMessage = 'Not enough credentials' | 'Incorrect credentials' | 'Logged in'


export interface updateNoteContent {
    name: string,
    content: string
}

type operationStatus = 'success' | 'failure'

export const NoteColors = <const>['red' , 'green' , 'blue' , 'yellow' , 'purple']

export type NoteColor = typeof NoteColors[number]


export interface updatingNoteResult{
    status:operationStatus
    message:string
    payload: NoteAttributes | undefined
}