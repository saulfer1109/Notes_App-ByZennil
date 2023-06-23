import React from "react";
import ReactDOM from "react-dom/client";
import LoginFormInput from "../../components/LoginFormInput";
import LoginFormButton from "../../components/LoginFormButton";
import notesAppLogo from '../../assets/notesApp.logo.svg'

function handleEvent(){
    console.log('Event submited')
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    
    <React.StrictMode>
        <main className="flex justify-center items-center selection:bg-slate-950  selection:text-white h-screen">
            <section className="flex items-center justify-between border-2 border-slate-950 rounded-lg">

            <section className="border-r-2 border-slate-900 flex gap-8 flex-col">
            <div className="flex items-center justify-between w-4/5 self-start bg-slate-950 text-white p-5 pr-16 rounded-br-2xl font-medium text-xl">
                    <img src={notesAppLogo} alt="Notes App logo" className="w-10"/>
                    Notes App
            </div>
            <form className="flex flex-col p-11 pt-0 gap-4 items-center justify-center w-96 ">
                <LoginFormInput labelName="Email" type="email"/>
                <LoginFormInput labelName="Password" type="password"/>
                <div className="p-2"></div>
                <LoginFormButton label="Log in" type="submit" submitHandler={handleEvent}/>
                <a href="" className="text-slate-600 underline">Aren't you registered? Sign up here</a>
            </form>

            </section>

            <div className="w-96 p-10"></div>
            </section>
        </main>
    </React.StrictMode>
)


