import { MouseEventHandler, useRef } from 'react'
import addNoteIcon from '../assets/addNote.svg'
import { useState } from 'react'



const CreateNoteButton = ({onCreateNote}:{onCreateNote:MouseEventHandler<HTMLLIElement>}) => {

    const [showingColorOptions, setShowingColorOptions] = useState(false)
    const showColorOptionsButton = useRef<HTMLButtonElement>(null)
    const colorOptionsList = useRef<HTMLUListElement>(null)

    const colors = {
        Green: "bg-green-600",
        Blue : "bg-blue-600",
        Red : "bg-red-600",
        Yellow : "bg-yellow-400",
        Purple : "bg-purple-600",
    }

    const handleShowColorOptions: MouseEventHandler<HTMLButtonElement> = () => {
        if (!showColorOptionsButton.current){
            throw new Error('No reference to showColorOptionsButton in CreateNoteButton')
        }
        if (!colorOptionsList.current){
            throw new Error('No reference to colorOptionsList in CreateNoteButton')
        }

        
        setShowingColorOptions(!showingColorOptions)
    }
    

    return (
        <section className="flex flex-col items-center gap-7 ">
            <button ref={showColorOptionsButton} onClick={handleShowColorOptions}  className={"hover:w-10 outline-none select-none transition-all " + (showingColorOptions?"rotate-45 w-10":"w-8")}>
                <img src={addNoteIcon} alt="Add Note Icon" />   
            </button>
            

                <ul ref={colorOptionsList} className={`flex flex-col items-center gap-3 `}>
                    {
                        ...Object.values(colors).map( (color:string, index:number) => {
                            console.log(8*(index))
                            return   <li key={color} onClick={onCreateNote} className={`${(showingColorOptions? `` : `w-0 `)}  w-5 hover:w-6 max-w-xs aspect-square rounded-full cursor-pointer transition-all ${color}`} ></li>
                        })
                    } 
                </ul>
            
            
        </section>
)
}

export default CreateNoteButton
