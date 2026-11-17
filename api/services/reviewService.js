import { findReviewById, createReviewQuery, deleteReviewQuery } from "../models/reviewModel.js";

// Haetaan kannasta arvostelu id:n perusteella
export async function getReview(id) {
    const review = await findReviewById(id);
    return review;
}

// Luo uuden arvioinnin
export async function createReviewRecord(userId, movieId, rating, comment) {
    // Käyttäjä voi tehdä vain yhden arvostelun per elokuva
    /* const reviewExists = await findReviewById(); */

    const newReview = await createReviewQuery(userId, movieId, rating, comment);
    return newReview;
}

export async function deleteReviewById(id) {
    // Käyttäjä voi poistaa arvostelun
    const deletedReview = await deleteReviewQuery(id);
    return deletedReview;
}