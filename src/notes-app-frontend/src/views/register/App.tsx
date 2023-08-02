import { useRef } from "react"
import LoginFormInput from "../../components/LoginFormInput"
import LoginFormButton from "../../components/LoginFormButton"
import notesAppLogo from '../../assets/notesApp.logo.svg'

export const App = () => {

    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const submitHandler = () => {

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
                <form className="flex flex-col gap-4 p-4">
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