import { NoteProps } from "./Note"
import { colors } from "../constants"
import { SetStateAction, useEffect, useRef} from "react"
import closeIcon from '../assets/close.svg'
import syncIcon from '../assets/sync.svg'

export type SyncDataHandler = (changes: Partial<NoteProps>) => void

interface EditNoteMenuProps {
    noteProperties?: NoteProps
    setIsActive: React.Dispatch<SetStateAction<boolean>>
    onSyncData: SyncDataHandler
}



export const EditNoteMenu = ({noteProperties = undefined, setIsActive, onSyncData}:EditNoteMenuProps) => {

    const title = useRef<HTMLInputElement>(null)
    const description = useRef<HTMLTextAreaElement>(null)

    const syncOnEnter = (event:KeyboardEvent) => {
        if (event.key == 'Enter'){
            handleSyncData()

        }
    }
    
    useEffect(() => {
        window.addEventListener('keypress',syncOnEnter)

        return () => {
            window.removeEventListener('keypress',syncOnEnter)
        }
    },[])
    
    const handleSyncData = () => {

        if (!noteProperties)
            return
        
        if ( !title.current || !description.current)
            throw new Error('No title or description element')
        
        let changes: Partial<NoteProps> = {id: noteProperties.id}

        
        if (title.current.value != noteProperties.name)
            changes.name = title.current.value

        if (description.current.innerText != noteProperties.content)
            changes.content = description.current.value
        
        onSyncData(changes)
    }

    
    if (!noteProperties)
        return <></>

    // console.log(colors.find((color) => color.includes(noteProperties.color)))
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
                        className="w-5 hover:scale-150 transition-all absolute right-5 top-5 outline-none"
                        onClick={() => setIsActive(false)}
                    >
                        <img src={closeIcon} alt="" />
                    </button>
                    <input type="text"
                        ref={title}
                        placeholder="New Title"
                        defaultValue={noteProperties.name}
                        className="bg-inherit border-b-2 border-b-black outline-none text-3xl placeholder:text-black placeholder:opacity-60 w-full"
                    />

                    <div className="w-full flex flex-col flex-1 gap-5">
                        <label
                            className="text-black opacity-60 text-xl"
                        >
                            Description
                        </label>
                        <textarea
                            ref={description}
                            className="bg-inherit border-2 border-black rounded-xl resize-none outline-none flex-1 p-5"
                            defaultValue={noteProperties.content}
                        >
                        </textarea>
                    </div>
                    <div
                        className="flex w-full"
                    >
                        <button 
                        className="ml-auto w-6   outline-none"
                        onClick={handleSyncData}
                    >
                        <img src={syncIcon} alt="" className="w-6 hover:scale-150  transition-all" />
                    </button>
                    </div>

                </section>
            </>
        )
}

