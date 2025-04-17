import { useEffect, useState, useRef } from "react"
import axios from "axios"

import { Navbar } from "../components/Navbar"
import { WatchPageSkeleton } from "../components/skeletons/WatchPageSkeleton"

import { Link, useParams } from "react-router-dom"
import { useContentStore } from "../store/content"

import  ReactPlayer  from "react-player"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants"

function formatReleaseDate(date){
  return new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

const WatchPage = () => {
  const { id } = useParams()
  const {contentType} = useContentStore()

  const [trailers, setTrailers] = useState([])
  const [currentTrailersIdx, setCurrentTrailersIdx] = useState(0)
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState({})
  const [similarContent, setSimilarContent] = useState([])

  const sliderRef = useRef();
  

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`)
        setTrailers(res.data.Trailer)
        console.log(res.data)
      } catch (error) {
        if(error.message.includes('404')){
            setTrailers([])
        }
      }
    }

    getTrailers()
  },[contentType, id])

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`)
        setSimilarContent(res.data.similar)
      } catch (error) {
        if(error.message.includes('404')){
          setSimilarContent([])
        }
      }
    }

    getSimilarContent()
  },[contentType, id])

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`)
        setContent(res.data.content)
        console.log(res.data)
      } catch (error) {
        if(error.message.includes('404')){
          setContent(null)
        }
      } finally{
        setLoading(false)
      }
    }

    getContentDetails()
  },[contentType, id])


  const handleNext = () => {
    if(currentTrailersIdx < trailers.length - 1){
      setCurrentTrailersIdx(currentTrailersIdx + 1)
    }
  }

  const handlePrev = () => {
    if(currentTrailersIdx > 0){
      setCurrentTrailersIdx(currentTrailersIdx - 1)
    }
  }

  const scrollLeft = () => {
    if(sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" })
    }
  }

  const scrollRight= () => {
    sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" })
  }

  if(loading) return (
    <div className="min-h-screen bg-black p-10">
      <WatchPageSkeleton/>
    </div>
  )

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar/>

        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button  
              className={
                `bg-gray-500/70  hover:bg-gray-500 text-white py-2 px-4 rounded ${
                  currentTrailersIdx === 0 ? 'opacity-50 cursor-not-allowed ' : ''
                }}
              `}
              disabled={currentTrailersIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24}
                
              />  
            </button>

            <button  
              className={
                `bg-gray-500/70  hover:bg-gray-500 text-white py-2 px-4 rounded ${
                  currentTrailersIdx === trailers.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                }}
              `}
              disabled={currentTrailersIdx === trailers.length - 1}
              onClick={handleNext}  
            >
              <ChevronRight size={24}
                
              />  
            </button>
          </div>
        )}

        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer 
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-auto rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailersIdx].key}`}
            />
          )}

          {trailers?.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              Nenhum trailer disponível para{" "}
              <span className="font-bold text-red-600">{content?.title || content?.name}</span>
            </h2>
          )}
        </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
            <div className="mb-4 md:mb-0">
              <h2 className="text-5xl font-bold text-balance">{content?.title || content?.name}</h2>

              <p className="mt-2 text-lg">
                {formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
                {content?.adult ? (
                  <span className="text-red-600">18+</span>
                ) : (
                  <span className="text-red-600">PG-13</span>
                )}{" "}
              </p>
              <p className="mt-4 text-lg">{content?.overview}</p>
            </div>
            <img 
              src={ORIGINAL_IMG_BASE_URL + content?.poster_path} 
              alt="Poster image" 
              className="max-h-[600px] rounded-md"
            />
          </div>
          {similarContent.length > 0 && (
            <div className="mt-12 max-w-5xl mx-auto relative">
              <h3 className="text-3xl font-bold mb-4">
                Filmes|Séries - Similares
              </h3>

              <div className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group" ref={sliderRef}>
                {similarContent.map((content) => (
                  <Link 
                    to={`/watch/${content.id}`}
                    key={content.id} 
                    className="w-52 flex-none"
                  >
                    <img 
                      src={SMALL_IMG_BASE_URL+content?.poster_path}
                      alt="Poster Path"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">{content.title || content.name}</h4>
                  </Link>
                ))}
                <ChevronRight
                  className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
                             opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
                           bg-red-600 text-white z-10 rounded-full" 
                  onClick={scrollRight}
                />
                <ChevronLeft 
                  className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8
                             opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
                           bg-red-600 text-white z-10 rounded-full"
                  onClick={scrollLeft}
                />              
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default WatchPage
