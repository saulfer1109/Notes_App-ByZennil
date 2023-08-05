import {createHash} from 'node:crypto'
import { User, UserCreationAttributes, UserInstance } from "../models/user";
import { updatingEmailMessage, updatingPasswordMessage } from "../types";

export const createUser = async (user:UserCreationAttributes):Promise<UserInstance> => {
    user.password = sha256(user.password)
    
    return User.create(user).catch(() => {throw new Error()})
}

export const updateEmail = async (id:bigint, email:string): Promise<updatingEmailMessage> => {
    let user = await User.findByPk(id)

    if (!user){
        return 'Non-existing-account' 
    }

    try{
        user.email = email
        await user.save()

        return 'Updated succesfully'
    }
    catch(error){
        console.log(error);
        
        return "Account with repeated email"
    }
}

export const updatePassword = async (id:bigint, oldPassword:string, newPassword:string): Promise<updatingPasswordMessage> => {
    let user = await User.findByPk(id)

    if (!user) return 'Non-existing-account'

    if (user.password != sha256(oldPassword)) return 'Incorrect password'

    try {
        user.password = sha256(newPassword)
        await user.save()
        return 'Updated succesfully'
    } catch (error) {
        
        return 'Unexpected error'
    }
}

export const authenticate = async (email: string, password: string): Promise <UserInstance | null> => {
    return  await User.findOne({where: {
        email: email,
        password: sha256(password)
    }})

}


export const sha256 = (content: string) => {
    return createHash('sha256').update(content).digest('hex')
}