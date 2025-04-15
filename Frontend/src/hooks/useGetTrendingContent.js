import { useEffect, useState } from "react"
import axios from "axios"

import { useContenteStore } from "../store/content"

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null)
  const { contentType } = useContenteStore()

  useEffect(() => {
    const getTrendingContent = async () => {
        const res= await axios.get(`/api/v1/${contentType}/trending`)
        setTrendingContent(res.data.content)
    }

    getTrendingContent()
  }, [contentType])

  return { trendingContent }
}

export default useGetTrendingContent
