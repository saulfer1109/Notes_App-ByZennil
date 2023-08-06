import { CreateNoteButton, CreateNoteHandler } from "./CreateNoteButton"
import logout from '../assets/logout.svg'

export const PanelDashboard = ({
    onCreateNote = () => {}, onLogOut = () => {}
    } : {onCreateNote: Function, onLogOut: Function}) => {


    
    const handleLogOut = () => {
        console.log('Logint out')
        onLogOut()
    }

    const handleCreateNote: CreateNoteHandler = (color: string) => {
        console.log(`New ${color} note`)

        onCreateNote(color)
    }


    return (
        <nav className="flex md:flex-col  md:items-center gap-20 border-r border-slate-400 py-7 px-5 md:h-screen md:w-fit w-screen fixed md:top-0 bottom-0 md:left-0 z-10 bg-white">
            <h4 className="text-slate-950 text-sm font-bold hidden md:block">Notes App</h4>
            <CreateNoteButton onCreateNote={handleCreateNote}/> 
            <button className="w-9 mt-auto outline-none select-none transition-all hover:scale-110 ml-auto" onClick={handleLogOut}>
                <img src={logout} alt="Logout Icon"/>
            </button>
        </nav>
    )
}