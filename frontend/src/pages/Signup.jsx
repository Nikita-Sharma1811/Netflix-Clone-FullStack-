import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Signup() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:""
    });


    const handleChange = (e)=>{

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async(e)=>{

        e.preventDefault();


        try{


            const response = await API.post(
                "/auth/register",
                formData
            );


            console.log(response.data);



            localStorage.setItem(
                "token",
                response.data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user || response.data)
            );



            alert("Signup Successful");


            navigate("/");


        }
        catch(error){


            console.log(error);


            alert(
                error.response?.data?.message ||
                "Signup Failed"
            );


        }

    };



    return(

        <div className="login-container">


            <div className="login-box">


                <h1>
                    Sign Up
                </h1>



                <form onSubmit={handleSubmit}>


                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                    />


                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />


                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />


                    <button>
                        Sign Up
                    </button>


                </form>


            </div>


        </div>

    );

}

export default Signup;