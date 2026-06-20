import { Link } from "react-router-dom"

const SignUp = () => {
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form className="flex flex-col gap-4 justify-center">
                <input id="username" type="text" placeholder="Enter Your Username" className="border rounded-lg p-3 outline-none" />
                <input id="email" type="email" placeholder="Enter Your Email" className="border rounded-lg p-3 outline-none" />
                <input id="password" type="password" placeholder="Enter Your Password" className="border rounded-lg p-3 outline-none" />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    Sign Up
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Already have an account? </p>
                <Link to="/sign-in"><span className="text-blue-700">Sign In</span></Link>
            </div>
        </div>
    )
}

export default SignUp