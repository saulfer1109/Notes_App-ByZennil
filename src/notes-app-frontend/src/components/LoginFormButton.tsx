import { MouseEvent } from "react"

export default function LoginFormButton({label,type,submitHandler}:{label:String, type:"button" | "submit" | "reset", submitHandler:Function}){

    function handleSubmit(event:MouseEvent<HTMLElement>){
        event.preventDefault()
        submitHandler()
    }

    return <>
        <button type={type} onClick={handleSubmit} className=" bg-black text-white p-4 w-full rounded-lg font-bold hover:bg-white hover:text-black transition-all border-2 border-black">
            {label}
        </button>
    </>
}