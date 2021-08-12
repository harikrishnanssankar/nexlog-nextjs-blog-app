import { useContext } from "react"
import { AuthContext } from "../store/Context"

const Profile = () => {
    const { user } = useContext(AuthContext);

    if (!user) return (
        <div className="pl-10 pt-40 md:pl-40" >
            <span className="text-5xl"  >no user found</span>
        </div>
    )
    return (
        <div className="pl-10 pt-40 md:pl-40">
            <span className="text-5xl" >Email: {user.email}</span>
        </div>
    )
}

export default Profile
