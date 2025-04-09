import { fetchFromTMDB } from "../services/tmdb.services.js"

export async function getTrendingMovie(req, res){
    try{ 
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US")
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        
        res.json({ content: randomMovie })
    
    }catch(error) {
        res.status(500).json({ message: "Erro interno do servidor" })
    }
}


export async function getMovieTrailers(req, res) {
    const { id } = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        res.json({ Trailer: data.results })
    }catch (error){
        if(error.message.includes("404")){
            return res.status(404).send(null)
        }

        res.status(500).json({ message: "Erro interno do servidor" })
    }
}
