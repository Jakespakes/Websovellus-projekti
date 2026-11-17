import { findReviewById, createReviewQuery, deleteReviewQuery, updateReviewQuery } from "../models/reviewModel.js";

// Haetaan kannasta arvostelu id:n perusteella
export async function getReview(id) {
    const review = await findReviewById(id);
    return review;
}

// Luo uuden arvioinnin
export async function createReviewRecord(userId, movieId, rating, comment) {
    const newReview = await createReviewQuery(userId, movieId, rating, comment);
    return newReview;
}

// Poistaa arvioinnin id:n perusteella
export async function deleteReviewById(id) {
    // Käyttäjä voi poistaa arvostelun
    const deletedReview = await deleteReviewQuery(id);
    return deletedReview;
}

// Muokkaa arviointia vain arvostelun ja kommentin perusteella
export async function updateReviewById(rating, comment, id, userId) {
    const updatedReview = await updateReviewQuery(rating, comment, id, userId);
    return updatedReview;
}