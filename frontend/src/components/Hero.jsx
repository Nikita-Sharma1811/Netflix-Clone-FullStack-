import { useState } from "react";

function Hero({ movie }) {
    const [playTrailer, setPlayTrailer] = useState(false);

    if (!movie) return null;

    const getEmbedUrl = (url) => {
        if (!url) return "";
        let embed = url;
        if (url.includes("youtube.com/watch?v=")) {
            embed = url.replace("watch?v=", "embed/");
        } else if (url.includes("youtu.be/")) {
            const id = url.split("youtu.be/")[1]?.split("?")[0];
            embed = `https://www.youtube.com/embed/${id}`;
        }
        return embed.includes("?") ? `${embed}&autoplay=1` : `${embed}?autoplay=1`;
    };

    return (
        <div className="hero">
            {playTrailer ? (
                <iframe
                    width="100%"
                    height="100%"
                    src={getEmbedUrl(movie.trailer)}
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