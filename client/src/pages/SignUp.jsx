import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setError(null);

        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            setError("All fields are required");
            return;
        }

        try {
            setLoading(true)
            setError(null);

            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json()

            // console.log(JSON.stringify(data))

            if (!res.ok) {
                throw new Error(data.message);
            }

            setFormData({
                username: '',
                email: '',
                password: '',
            });

            navigate('/sign-in')

        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }

    }
    // console.log(formData)

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form
                className="flex flex-col gap-4 justify-center"
                onSubmit={handleSubmit}

            >
                <input
                    id="username"
                    type="text"
                    required
                    value={formData.username}
                    placeholder="Enter Your Username"
                    className="border rounded-lg p-3 outline-none"
                    onChange={handleInputChange}
                />
                <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    placeholder="Enter Your Email"
                    className="border rounded-lg p-3 outline-none"
                    onChange={handleInputChange}
                />
                <input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    placeholder="Enter Your Password"
                    className="border rounded-lg p-3 outline-none"
                    autoComplete="new-password webauthn"
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? "Loading....." : "Sign Up"}
                </button>
            </form>
            {error ?
                <p className="text-red-500 mt-5">
                    {error}
                </p>
                : null}
            <div className="flex gap-2 mt-5">
                <p>Already have an account? </p>
                <Link to="/sign-in"><span className="text-blue-700">Sign In</span></Link>
            </div>
        </div>
    )
}

export default SignUp