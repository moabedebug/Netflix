import { fetchFromTMDB } from "../services/tmdb.services.js"

export async function getTrendingMovie(req, res){
    try{ 
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US")
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        
        res.json({ content: randomMovie })
    
    }catch(error) {
        console.log("Error no getTrendingMovie controller", error.message)
        res.status(500).json({ message: "Erro interno do servidor" })
    }
}
