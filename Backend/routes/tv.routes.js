import express from "express";

import { 
    getTrendingTv, 
    getTrailersTv, 
    getDetailsTv, 
    getSimilarTv,
    getTvsByCategory
} from "../controller/tv.controller.js"

const router = express.Router()

router.get("/trending", getTrendingTv)
router.get("/:id/trailers", getTrailersTv)
router.get("/:id/details", getDetailsTv)
router.get("/:id/similar", getSimilarTv)
router.get("/:category", getTvsByCategory)

export default router
