export interface NoteCreationAttributes {
    name: string
    content: string
    color: string
    date: Date
}

export interface NoteAttributes extends NoteCreationAttributes{
    id:number
    isFavorite: boolean
}


export function isNoteCreationAttributes(note: NoteCreationAttributes | NoteAttributes): note is NoteCreationAttributes{
    return 'name' in note && 'content' in note && 'color' in note && 'date' in note
}

export function isNoteAttributes(note: NoteCreationAttributes | NoteAttributes): note is NoteAttributes{
    return isNoteCreationAttributes(note) && 'id' in note && 'isFavorite' in note
}