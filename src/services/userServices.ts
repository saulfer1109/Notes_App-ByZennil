import User from "../models/user";
import { UserAttributes, updatingEmailMessage, updatingPasswordMessage } from "../types";

export const createUser = async (user:UserAttributes):Promise<User> => {
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

    if (user.password != oldPassword) return 'Incorrect password'

    try {
        user.password = newPassword
        await user.save()
        return 'Updated succesfully'
    } catch (error) {
        
        return 'Unexpected error'
    }
}

export const authenticate = async (email: string, password: string): Promise <User | null> => {
    return  await User.findOne({where: {
        email: email,
        password: password
    }})

}
