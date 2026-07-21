import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {

    const [search, setSearch] = useState("");

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    const navigate = useNavigate();


    // Check login status
    useEffect(() => {

        const checkUser = () => {

            setUser(
                JSON.parse(localStorage.getItem("user"))
            );

        };


        window.addEventListener(
            "storage",
            checkUser
        );


        return () => {

            window.removeEventListener(
                "storage",
                checkUser
            );

        };


    }, []);



    const handleSearch = (e) => {

        if(e.key === "Enter" && search.trim()){

            navigate(`/search?query=${search}`);

            setSearch("");

        }

    };



    const handleLogout = () => {

        localStorage.removeItem("user");

        setUser(null);

        navigate("/login");

    };



    return (

        <nav className="navbar">


            <h1 className="logo">
                NETFLIX
            </h1>



            <input
                className="nav-search"
                type="text"
                placeholder="Search movies..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                onKeyDown={handleSearch}
            />



            <div>


                <Link to="/">
                    Home
                </Link>


                <Link to="/search">
                    Search
                </Link>



                {
                    user ? (

                        <>

                            <Link to="/watchlist">
                                My List
                            </Link>


                            <Link to="/profile">
                                Profile
                            </Link>


                            <Link to="/admin">
                                Admin
                            </Link>
                            <button 
    className="nav-link"
    onClick={handleLogout}
>
    Logout
</button>


                            


                        </>


                    ) : (

                        <>

                            <Link to="/login">
                                Login
                            </Link>


                            <Link to="/signup">
                                Signup
                            </Link>


                        </>

                    )
                }


            </div>


        </nav>

    );

}


export default Navbar;