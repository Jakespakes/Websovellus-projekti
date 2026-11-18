import React from 'react'
import axios from 'axios'
import {useState} from 'react'
export default function Moviereview({movie_id, onSubmit}) {
const [comment, setComment] = useState("")
const [rating, setRating] = useState(0)
const [madeReview, setmadeReview] = useState(false)


const handleSubmit = async () => {
    if (rating === 0 || comment.trim() === ""){
        return
    }

    try {
        const response = await axios.post("/api/review/create", {
            movie_id,
            rating,
            comment
        })
    
    console.log("Review:", response.data)
    
    
    setRating(0)
    setComment("")
    setmadeReview(true)
    } catch (error){
        console.error("Couldn't save review", error)
    } finally{
        onSubmit({
        movie_id,
        rating,
        comment
    })
    }
} 
if (madeReview){
    return(
        <h3> Kiitos arvostelusta! </h3>
    )
} else{
  return (
    <div>
        
        <h3> Jätä arvostelu! </h3>

        <div>
            {[1,2,3,4,5].map((star) =>
            <button key={star} 
            type="button" 
            onClick={() => setRating(star)} >
            {star <= rating ? "★" : "☆"}
            </button>
            )}
        </div>

        <div>
        <textarea
            placeholder="Kirjoita tänne."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            />
        </div>
        <div>
            <button type="button" onClick={handleSubmit}>
                Tallenna arvostelu
            </button>
        </div>
       {/* TODO: Tee conditional formatting että kun "Tallena Arvostelu" painetaan niin tilalle tulee "Kiitos arvostelusta!"*/}
    </div>
  )} 

}
// menehän töihin