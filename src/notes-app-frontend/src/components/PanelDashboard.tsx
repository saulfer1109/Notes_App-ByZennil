import addNoteIcon from '../assets/addNote.svg'

export const PanelDashboard = () => {

    return (
        <nav>
            <h4 className="text-slate-950">Notes App</h4>
            <img src={addNoteIcon} alt="Add Note Icon" />
        </nav>
    )
}