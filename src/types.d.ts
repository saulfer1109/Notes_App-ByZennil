export interface UserAttributes{
    id: BigInt;
    name: string;
    email: string;
    password: string;
}

export type updatingMessage = 'Non-existing-object' | 'Updated succesfully' | 'Account with existing email'