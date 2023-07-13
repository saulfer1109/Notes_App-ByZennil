import { motion } from 'framer-motion'
import { NoteAttributes } from '../types/notes.types'
import closeIcon from '../assets/close.svg'
import accomplishedIcon from '../assets/correct.svg'
import errorIcon from '../assets/error.svg'
import { MouseEventHandler} from 'react'

interface SyncMessageProps {
    accomplished?: boolean
    note?: NoteAttributes,
    disappear: MouseEventHandler<HTMLButtonElement>
}

export const SyncMessage = ({accomplished, note, disappear}: SyncMessageProps) => {
    if (!note)
        return <></>


    return (
        <motion.section
            initial={{transform:"translate(-50%,0)"}}
            animate={{ transform: "translate(-50%,-100%)" }}
            exit={{ transform: "translate(-50%,0)" }}
            className={`${accomplished? 'bg-green-200': 'bg-red-200'} absolute px-5 py-3 z-50 top-full left-1/2  flex gap-3 justify-center items-center rounded-t-lg`}
        >
            <img className="w-8" src={accomplished? accomplishedIcon: errorIcon}/>
            <span className="">
            {(accomplished)?'Note successfully synchronized':'Synchronization failed'}
            </span>
            <button className="w-4 hover:scale-110 transition-transform self-start" onClick={disappear}>
                <img src={closeIcon} />
            </button>
        </motion.section>
    )


}