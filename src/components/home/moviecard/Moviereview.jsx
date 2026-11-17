import React from 'react'
import {useState} from 'react'
export default function Moviereview({movieID, onSubmit}) {
const [review, setReview] = useState("")
const [rating, setRating] = useState(0)
const [madeReview, setmadeReview] = useState(false)


const handleSubmit = () => {
    if (rating === 0 || review.trim() === ""){
        return
    }
    onSubmit({
        movieID,
        rating,
        review
    })

    setRating(0)
    setReview("")
    setmadeReview(true)
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
            value={review}
            onChange={(e) => setReview(e.target.value)}
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