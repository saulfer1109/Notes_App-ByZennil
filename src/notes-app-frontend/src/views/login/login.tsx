import React from "react";
import ReactDOM from "react-dom/client";
import LoginFormInput from "../../components/LoginFormInput";
import LoginFormButton from "../../components/LoginFormButton";

function handleEvent(){
    console.log('Event submited')
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <main className="flex justify-center items-center selection:bg-black selection:text-white">
            <form className="flex flex-col gap-4 items-center justify-center border-2 border-black rounded-lg p-10 w-96">
                <LoginFormInput labelName="Email" type="email"/>
                <LoginFormInput labelName="Password" type="password"/>
                <div className="p-2"></div>
                <LoginFormButton label="Log in" type="submit" submitHandler={handleEvent}/>
            </form>
        </main>
    </React.StrictMode>
)


