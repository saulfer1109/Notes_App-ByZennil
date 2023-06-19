import { HTMLInputTypeAttribute } from "react";
import { useRef } from "react";

export function LoginFormInput({labelName, type}:{labelName:String, type:HTMLInputTypeAttribute | undefined}){ 

    let inputElement = useRef<HTMLInputElement>(null)
    let labelElement = useRef<HTMLLabelElement>(null)

    function focusEvent(){
        if(labelElement.current){
            labelElement.current.style.top = '-0.7rem'
        }
        inputElement.current?.focus()
            
    }

    function blurEvent(){
        if(labelElement.current && inputElement.current?.value == ''){
            labelElement.current.style.top = '1.25rem'
        }

    }
    return <>
        <div className="group cursor-text relative border border-black rounded-lg p-4 px-4 w-60 "
            onClick={focusEvent} onBlur={blurEvent}
        >
            <input type={type || "text"} ref={inputElement} className="peer text-xs w-full outline-none z-1"/>
            <label ref={labelElement} className="bg-white p-1 z-0 cursor-text  text-xs peer-:peer-empty:text-sm absolute left-4 top-5 peer-focus:text-xs select-none transition-all">{labelName}</label>
        </div>
    </>
}