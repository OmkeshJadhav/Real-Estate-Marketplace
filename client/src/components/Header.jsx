import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {
    const { currentUser } = useSelector(state => state.user)

    return (
        <header className="bg-slate-200 shadow-md">
            <div className="flex justify-between mx-auto items-center p-3 max-w-6xl">
                <Link to="/">
                    <h1 className="text-sm sm:text-xl font-bold flex-wrap">
                        <span className="text-slate-500">Property</span>
                        <span className="text-slate-700">Bazaar</span>
                    </h1>
                </Link>
                <form className="bg-slate-100 p-3 rounded-lg flex items-center">
                    <input type="text" placeholder="Search...." className="bg-transparent focus:outline-none w-24 sm:w-64" />
                    <FaSearch className="text-slate-600" />
                </form>
                <ul className="flex gap-4">
                    <Link to="/" className="hidden sm:inline text-slate-700 hover:underline hover:cursor-pointer">Home</Link>
                    <Link to="/about" className="hidden sm:inline text-slate-700 hover:underline hover:cursor-pointer">About</Link>
                    <Link to="/profile" className="text-slate-700 hover:underline hover:cursor-pointer">
                        {currentUser ?
                            (<img 
                                src={currentUser.data.avatar} 
                                alt="avatar" 
                                className="rounded-full h-7 w-7 object-cover"
                            />
                            ) : (
                                <li>Sign in</li>
                            )}
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header