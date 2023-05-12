import React, { useState, useEffect} from "react";
// import ParkDetailsCard from "./ParkDetailsCard";
// import MyNationalPark from "./MyNationalPark";
import NationalParkFocus from "./NationalParkFocus";
import NationalPark from "./NationalPark";

const url = "http://localhost:3000/parks"



function WhereIveBeen() {


    const [parks, setParks] = useState([])
    const [focus, setFocus] = useState(null)



    useEffect(() => {
        fetch(url)
            .then(res => {
                return res.json()
            })
            .then(data => {
                const parksIBeenTo = data.filter(park => park.haveBeen)
                setParks(parksIBeenTo);
            })
    }, [])

    function handleReview(review, id){
        fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({starRating: review})
        })
        .then(res=>res.json())
        .then(data => {
            setParks(parks => {
                return parks.map(park => {
                    if(park.id === data.id){
                        return data;
                    } else{
                        return park;
                    }
                })
            })
        })
    }

    const nationalParkComponents = parks.map(park => {

        return (
            <NationalPark
                key={park.id}
                name={park.fullName}
                imageUrl={park.images[0].url}
                imageAlt={park.images[0].altText}
                park={park}
                onFocus={setFocus}
                onReview={handleReview}
            />
        )
    })


    return (
        <div className="cards-container">
            {focus ? <NationalParkFocus focus={focus}  onClick={setFocus} onReview={handleReview}/> : null}
            {nationalParkComponents}
        </div>
    )

}

export default WhereIveBeen