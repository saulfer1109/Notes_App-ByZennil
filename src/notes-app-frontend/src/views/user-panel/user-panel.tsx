import React from "react";
import ReactDOM from "react-dom/client";
import { PanelDashboard } from "../../components/PanelDashboard";
import { NotesBoard} from "../../components/NotesBoard";
import { noteProps } from "../../components/Note";

const notes: Array<noteProps> = [
    {
        id: 5,
        name: 'Primera Nota',
        content: 'Contenido de la primera nota',
        color: 'green',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        id: 6,
        name: 'Segunda Nota',
        content: 'Contenido de la segunda nota',
        color: 'red',
        date: new Date(Date.now()),
        isFavorite: false
    },
    {
        id: 7,
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        id: 8,
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        id: 9,
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        id: 10,
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
/*     {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    },
    {
        name: 'Tercera Nota',
        content: 'Contenido de la tercera nota',
        color: 'yellow',
        date: new Date(Date.now()),
        isFavorite: true
    }, */


]

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>

        <main 
            className="w-screen h-screen grid grid-flow-row grid-cols-8 selection:text-white selection:bg-slate-950"
        >
            <PanelDashboard 
             
            />

            <NotesBoard
                tailwindStyles="col-start-2 col-end-9"
                notes={notes}
            />
        </main>

    </React.StrictMode>
)