import { MouseEvent } from "react"

export default function LoginFormButton({label,type,submitHandler}:{label:String, type:"button" | "submit" | "reset", submitHandler:Function}){

    function handleSubmit(event:MouseEvent<HTMLElement>){
        event.preventDefault()
        submitHandler()
    }

    return <>
        <button type={type} onClick={handleSubmit} className=" bg-slate-950 text-white p-4 w-full rounded-lg font-bold hover:bg-white hover:text-slate-950 transition-all border-2 border-slate-950">
            {label}
        </button>
    </>
}