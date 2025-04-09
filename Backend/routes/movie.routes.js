import express from "express";
import { getTrendingMovie, getMovieTrailers, getMovieDetails, getMovieSimiliar } from "../controller/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie)
router.get("/:id/trailers", getMovieTrailers)
router.get("/:id/details", getMovieDetails)
router.get("/:id/similiar", getMovieSimiliar)

export default router
