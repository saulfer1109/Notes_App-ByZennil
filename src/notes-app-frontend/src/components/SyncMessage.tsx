import { NoteProps } from './Note'
import closeIcon from '../assets/close.svg'
import accomplishedIcon from '../assets/correct.svg'
import errorIcon from '../assets/error.svg'
import { MouseEventHandler, useEffect } from 'react'
import { MouseEvent } from 'react'
import { useState } from 'react'

interface SyncMessageProps {
    accomplished?: boolean
    note?: NoteProps,
    showing: boolean
    disappear: MouseEventHandler<HTMLButtonElement>
}

export const SyncMessage = ({accomplished, note, showing, disappear}: SyncMessageProps) => {
    if (!showing || !note)
        return <></>


    return (
        <section
            className={`${accomplished? 'bg-green-200': 'bg-red-200'} absolute px-5 py-3 z-50 top-full left-1/2 -translate-x-1/2 -translate-y-full flex gap-3 justify-center items-center rounded-t-lg`}
        >
            <img className="w-8" src={accomplished? accomplishedIcon: errorIcon}/>
            <span className="">
            {(accomplished)?'Note successfully synchronized':'Synchronization failed'}
            </span>
            <button className="w-4 hover:scale-110 transition-transform self-start" onClick={disappear}>
                <img src={closeIcon} />
            </button>
        </section>
    )


}