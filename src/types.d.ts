export interface updateApiResponse{
    updated: boolean;
    message: updateMessage | updatingEmailMessage | updatingPasswordMessage;
}

export type updateMessage = 'Non-existing-account' | 'Updated succesfully' | 'Unexpected error'

export type updatingEmailMessage =  updateMessage | 'Account with repeated email'

export type updatingPasswordMessage = updateMessage | 'Incorrect password'

export type loggingMessage = 'Not enough credentials' | 'Incorrect credentials' | 'Logged in'


export type updatableNoteAttribute = 'label' | 'description'

type operationStatus = 'success' | 'failure'

export interface updatingNoteResult{
    status:operationStatus
    message:string
    payload:NoteAttributes | undefined
}