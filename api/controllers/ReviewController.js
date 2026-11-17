import { getReview, createReviewRecord, deleteReviewById } from "../services/reviewService.js";

export async function findReview(req, res, next) {
    try {
        const result = await getReview(req.review.id);
        res.status(200).json(result);
    } catch(error) {
        next(error);
    }
}

export async function createReview(req, res) {
    try {
        const { movie_id, rating, comment } = req.body;
        await createReviewRecord(req.user.id, movie_id, rating, comment);

        res.status(201).json({ 
            message: "Review created" 
        });
    } catch(error) {
        res.status(500).json({
            message: "Couldnt create the review",
            error: error.message
        });
    }
}

export async function deleteReview(req, res) {
    deleteReviewById(req.params.id);

    res.json({ message: "Review deleted" });
}