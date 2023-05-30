export interface UserAttributes{
    id: bigint;
    name: string;
    email: string;
    password: string;
}

export interface updateApiResponse{
    updated: boolean;
    message: updateMessage | updatingEmailMessage | updatingPasswordMessage;
}

export type updateMessage = 'Non-existing-account' | 'Updated succesfully' | 'Unexpected error'

export type updatingEmailMessage =  updateMessage | 'Account with repeated email'

export type updatingPasswordMessage = updateMessage | 'Incorrect password'