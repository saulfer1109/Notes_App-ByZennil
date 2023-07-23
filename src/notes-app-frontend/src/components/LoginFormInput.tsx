import { HTMLInputTypeAttribute, RefObject } from "react";
import { useRef } from "react";



const LoginFormInput = ({labelName, type, inputReference}:{labelName:String, type:HTMLInputTypeAttribute | undefined, inputReference: RefObject<HTMLInputElement>}) => { 

    let inputElement = inputReference
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
        <div onClick={focusEvent} onFocus={focusEvent} className="group cursor-text relative border-2 border-slate-950 rounded-lg p-4 px-4 w-full"
             onBlur={blurEvent}>
            <input type={type || "text"} ref={inputElement} className="peer text-xs w-full outline-none z-1"/>
            <label ref={labelElement} className="bg-white p-1 z-0 cursor-text  text-xs peer-:peer-empty:text-sm absolute left-4 top-5 peer-focus:text-xs select-none transition-all ">{labelName}</label>
        </div>
    </>
}

export default LoginFormInput