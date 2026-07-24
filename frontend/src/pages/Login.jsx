import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import heroImage from "../assets/images/hero.jpg";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );

            alert("Login Successful");

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        }

    };

    return (

        <div
            className="login-container"
            style={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >

            <div className="login-box">

                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;