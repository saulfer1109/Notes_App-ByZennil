import User from "../database/models/user";
import { UserAttributes, updatingMessage } from "../types";

export const createUser = async (user:UserAttributes):Promise<User> => {
    return User.create(user).catch(() => {throw new Error()})
}

export const updateEmail = async (id:bigint, email:string): Promise<updatingMessage> => {
    let user = await User.findByPk(id)

    if (!user){
        return 'Non-existing-object'
    }

    try{
        user.email = email
        await user.save()

        return 'Updated succesfully'
    }
    catch(error){
        console.log(error);
        
        return 'Account with existing email'
    }
}