
export const createErrorFactory = (name:string) => {
    return class CustomizedError extends Error{
        constructor(message:string){
            super(message)
            this.name = name
        }
        
    }
} 

