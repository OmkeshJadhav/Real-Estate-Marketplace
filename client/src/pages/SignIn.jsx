import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { signInStart, signInSuccess, signInFailure, clearError } from "../redux/user/userSlice"
import OAuth from "../components/OAuth/OAuth"

const SignIn = () => {
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    })
    // const [error, setError] = useState(null)
    // const [loading, setLoading] = useState(false)
    const { loading, error } = useSelector((state) => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        dispatch(clearError());

        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.identifier || !formData.password) {
            // setError('All fields are mandatory')
            dispatch(signInFailure('All fields are mandatory'))
            return;
        }

        try {
            dispatch(signInStart())

            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message)
            }

            dispatch(signInSuccess(data.data))

            setFormData({
                identifier: "",
                password: ""
            })

            navigate('/')

        } catch (error) {
            console.log(error);
            dispatch(signInFailure(error.message))
        }
    }

    return (
        <div className="flex flex-col gap-4 mt-20 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">
                Sign In
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    id="identifier"
                    required
                    value={formData.identifier}
                    placeholder="username or email"
                    onChange={handleInputChange}
                    className="border rounded-lg p-3 outline-none"
                />
                <input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    placeholder="password"
                    onChange={handleInputChange}
                    className="border rounded-lg p-3 outline-none"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? "Loading..." : "Sign In"}
                </button>
                <OAuth/>
            </form>
            {error ?
                <div className="text-red-500">
                    <p>{error}</p>
                </div>
                : null
            }
            <div>
                <p>Don't have an account? <Link to="/sign-up" className="text-blue-700">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default SignIn