import React from "react";
import ReactDOM from "react-dom/client";
import { PanelDashboard } from "../../components/PanelDashboard";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>

        <main 
            className="w-screen h-screen grid grid-flow-row grid-cols-8 selection:text-white selection:bg-slate-950"
        >
            <PanelDashboard/>
        </main>

    </React.StrictMode>
)