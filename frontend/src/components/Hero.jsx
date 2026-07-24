import { useState } from "react";
import heroImage from "../assets/images/hero.jpg";

function Hero() {

    const [playTrailer, setPlayTrailer] = useState(false);

    const trailer =
        "https://www.youtube.com/embed/b9EkMc79ZSU?autoplay=1";

    return (

        <div className="hero">

            {

                playTrailer ?

                    <iframe

                        width="100%"
                        height="100%"
                        src={trailer}
                        title="Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen

                    />

                    :

                    <div

                        className="hero-bg"

                        style={{

                            backgroundImage: `url(${heroImage})`

                        }}

                    >

                        <div className="overlay">

                            <h1>

                                Unlimited Movies,
                                TV Shows and More

                            </h1>

                            <p>

                                Watch anywhere.
                                Cancel anytime.

                            </p>

                            <div className="hero-buttons">

                                <button
                                    onClick={() =>
                                        setPlayTrailer(true)
                                    }
                                >
                                    ▶ Play
                                </button>

                            </div>

                        </div>

                    </div>

            }

        </div>

    );

}

export default Hero;