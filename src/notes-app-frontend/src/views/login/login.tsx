import React from "react";
import ReactDOM from "react-dom/client";
import { LoginFormInput } from "../../components/LoginFormInput/LoginFormInput";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <main className="flex justify-center items-center">
            <div className="flex flex-col gap-4 items-center justify-center border-2 border-black rounded-lg p-10">
                <LoginFormInput labelName="Email" type="email"/>
                <LoginFormInput labelName="Password" type="password"/>
            </div>
        </main>
    </React.StrictMode>
)


