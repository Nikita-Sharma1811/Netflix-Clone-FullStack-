import { useState } from "react";

function Hero({ movie }) {
    const [playTrailer, setPlayTrailer] = useState(false);

    if (!movie) return null;

    return (
        <div className="hero">
            {playTrailer ? (
                <iframe
                    width="100%"
                    height="100%"
                    src={`${movie.trailer}?autoplay=1`}
                    title={movie.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <div
                    style={{
                        backgroundImage: `url(${movie.banner || movie.poster})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <div className="overlay">
                        <h1>{movie.title}</h1>

                        <p>{movie.description}</p>

                        <button onClick={() => setPlayTrailer(true)}>
                            ▶ Play
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Hero;