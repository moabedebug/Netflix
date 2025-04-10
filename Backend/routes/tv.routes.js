import express from "express";

import { 
    getTrendingTv, 
    getTrailersTv, 
    getDetailsTv, 
    getSimiliarTv,
    getTvsByCategory
} from "../controller/tv.controller.js"

const router = express.Router()

router.get("/trending", getTrendingTv)
router.get("/:id/trailers", getTrailersTv)
router.get("/:id/details", getDetailsTv)
router.get("/:id/similiar", getSimiliarTv)
router.get("/:category", getTvsByCategory)

export default router
