import React from "react";
import CardStatus from "./CardStatus";


const url = "http://localhost:3000/parks"

function NationalPark({ imageUrl, imageAlt, name, park, onFocus, handleClick }) {

    function addToTrip(park) {
        const newPark = { ...park, haveBeen: false }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPark)
        }
        )
        handleClick(newPark);
    }

    function setToBeen(park) {

        const reviewPark = { ...park, haveBeen: "true" }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewPark)
        }
        )
        handleClick(reviewPark);
    }

    function leaveReview(review, id){
        fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({starRating: review})
        })
    }

    return (
        <div className="national-park-card"
            onClick={(e) => {
                e.stopPropagation()
                onFocus(park)
            }}
        >

            <h2 className="card-title">{name}</h2>

            <div className="card-image">
                <img src={imageUrl} alt={imageAlt}></img>
            </div>

            {window.location.pathname === "/" ?  
            <CardStatus park={park} onReview={leaveReview}>
                <button className="orange"
                    onClick={(e) => {
                        e.stopPropagation()
                        addToTrip(park)
                    }}>
                    Add to my trip
                </button>
                <button className="already-been"
                    onClick={(e) => {
                        e.stopPropagation()
                        setToBeen(park)
                    }}>
                    I've already been!
                </button>
            </CardStatus> :
                null
            }

            {/* {window.location.pathname === "/" ? 
                park.starRating ? 
                <ul className="star-container">
                        {
                        park.starRating.map((star) => {
                            return <li className="star">{star}</li>
                        })
                        }
                </ul> : <button className="already-been"
                onClick={(e) => {
                    e.stopPropagation()
                    leaveReview(park)
                }}>
                I've already been!
            </button>: null
            } */}

        </div>
    )
}

export default NationalPark;