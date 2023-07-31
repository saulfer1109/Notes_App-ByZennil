export interface NoteCreationAttributes {
    name: string
    content: string
    color: string
    createdAt: Date
    updatedAt: Date
}

export interface NoteAttributes extends NoteCreationAttributes{
    id:number
    isFavorite: boolean
}

export interface updatableNoteData {
    name?: string
    content?: string
    isFavorite?: boolean
}


export function isNoteCreationAttributes(note: NoteCreationAttributes | NoteAttributes | any): note is NoteCreationAttributes{
    return 'name' in note && 'content' in note && 'color' in note && 'updatedAt' in note && 'createdAt' in note
}

export function isNoteAttributes(note: NoteCreationAttributes | NoteAttributes): note is NoteAttributes{
    return 'id' in note && 'content' in note && 'color' in note && 'createdAt' in note && 'updatedAt' in note && 'id' in note
}