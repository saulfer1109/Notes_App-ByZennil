import { NoteProps } from "./Note"
import { colors } from "../constants"
import { SetStateAction} from "react"
import closeIcon from '../assets/close.svg'

interface EditNoteMenuProps {
    noteProperties?: NoteProps
    setIsActive: React.Dispatch<SetStateAction<boolean>>
}



export const EditNoteMenu = ({noteProperties = undefined, setIsActive}:EditNoteMenuProps) => {

    
    if (!noteProperties)
        return <></>

    console.log(colors.find((color) => color.includes(noteProperties.color)))
        return (
            <>
                <section
                    className="bg-slate-800 opacity-40 absolute w-screen h-screen z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    onClick={() => setIsActive(false)}
                ></section>
                <section
                    className={`${colors.find((color) => color.includes(noteProperties.color))} z-20 h-3/4 aspect-video absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-10 flex flex-col gap-12`}
                >
                    <button 
                        className="w-5 hover:w-7 hover:translate-x-1 hover:-translate-y-1  transition-all absolute right-5 top-5 outline-none"
                        onClick={() => setIsActive(false)}
                    >
                        <img src={closeIcon} alt="" />
                    </button>
                    <input type="text"
                        placeholder="New Title"
                        value={noteProperties.name}
                        className="bg-inherit border-b-2 border-b-black outline-none text-3xl placeholder:text-black placeholder:opacity-60 w-full"
                    />

                    <div className="w-full flex flex-col flex-1 gap-5">
                        <label
                            className="text-black opacity-60 text-xl"
                        >
                            Description
                        </label>
                        <textarea
                            className="bg-inherit border-2 border-black rounded-xl resize-none outline-none flex-1 p-5"
                        >
                            {noteProperties.content}
                        </textarea>
                    </div>
                </section>
            </>
        )
}

