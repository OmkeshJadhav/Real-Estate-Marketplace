import { useSelector } from "react-redux"

const Profile = () => {
    const { currentUser } = useSelector((state) => state.user)

    console.log(currentUser);


    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">
                Profile
            </h1>
            <form action="" className="flex flex-col gap-4 mt-10 max-w-2xl">
                <img
                    src={currentUser.data.avatar}
                    alt="avatar"
                    className="w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2"
                />
                <input
                    id="username"
                    type="text"
                    placeholder="username"
                    value={currentUser.data.username}
                    className="border outline-none p-3 rounded-lg"
                />
                <input
                    id="email"
                    type="email"
                    placeholder="email"
                    value={currentUser.data.email}
                    className="border outline-none p-3 rounded-lg"
                />
                <input
                    id="password"
                    type="password"
                    placeholder="password"
                    className="border outline-none p-3 rounded-lg"
                />
                <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80">
                    Update Profile
                </button>
                <button className="bg-green-600 p-3 rounded-lg text-white uppercase hover:opacity-80">
                    Create Listing
                </button>
                <div className="flex justify-between">
                    <p className="text-red-700 cursor-pointer">Delete Account</p>
                    <p className="text-red-700 cursor-pointer">Sign Out</p>
                </div>
                <div className="text-center text-green-600">
                    Show Listing
                </div>
            </form>
        </div>
    )
}

export default Profile