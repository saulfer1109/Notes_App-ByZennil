import { useRef } from "react"
import LoginFormInput from "../../components/LoginFormInput"
import LoginFormButton from "../../components/LoginFormButton"
import notesAppLogo from '../../assets/notesApp.logo.svg'
import { registerUser } from "../../services/UserServices"

export const App = () => {

    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const submitHandler = () => {
        if (!nameRef.current || !emailRef.current || !passwordRef.current)
            return
        
        const name = nameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value
        
        registerUser(name,email,password)
            .then(
                (response) => {
                    if (response.ok){
                        window.location.pathname = '/login/'
                    }
                }
            )
        
    }

    return(
        <main
            className="flex justify-center items-center w-screen h-screen"
        >
            <section
                className="border-2 border-black rounded-xl flex flex-col w-1/4 overflow-hidden"
            >
                <header className="flex items-center justify-between w-full self-start bg-slate-950 text-white p-5 pr-24 font-medium text-xl">
                        <img src={notesAppLogo} alt="Notes App logo" className="w-10"/>
                        Notes App
                </header>
                <br/>
                <h1
                    className="font-bold text-center text-xl"
                >
                    Create new Account
                </h1>
                <br/>
                
                <form className="flex flex-col gap-4 p-4 px-8">
                    <LoginFormInput
                        labelName="Name"
                        type="text"
                        key='name'
                        inputReference={nameRef}
                    />
                    <LoginFormInput
                        labelName="Email"
                        type="email"
                        key='email'
                        inputReference={emailRef}
                    />
                    <LoginFormInput
                        labelName="Password"
                        type="password"
                        key='password'
                        inputReference={passwordRef}
                    />
                    <br/>
                    <LoginFormButton
                        label='Sign Up'
                        type='submit'
                        submitHandler={submitHandler}
                        key='submit'
                    />
                </form>
                <br/>

            </section>

        </main>
    )
}