import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile(){

    const navigate = useNavigate();

    const [user] = useState(
        JSON.parse(localStorage.getItem("user"))
    );


    const handleLogout = () => {

        localStorage.removeItem("user");

        navigate("/login");

    };


    if(!user){

        return <h2>Please Login First</h2>;

    }


    return (

        <div className="profile">


            <div className="profile-card">


                <div className="avatar">
                    👤
                </div>


                <h1>
                    My Profile
                </h1>


                <h2>
                    {user.name}
                </h2>


                <p>
                    📧 {user.email}
                </p>


                <button 
                    onClick={handleLogout}
                >
                    Logout
                </button>


            </div>


        </div>

    );

}


export default Profile;