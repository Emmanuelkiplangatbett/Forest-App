import React, { useEffect, useState } from "react";
import NationalPark from "./NationalPark";
import NationalParkFocus from "./NationalParkFocus";
import Search from "./Search";


const BASE_URL = 'https://developer.nps.gov/api/v1/parks?api_key=3nGt9ZQTH0fW8byyMhNt9bA1avBgXX7gbGuT7Rt4&limit='


function NationalParksContainer() {

    const [parks, setParks] = useState([])
    const [limitNum, setLimitNum] = useState(9)
    const [focus, setFocus] = useState(null)
    const [databaseParks, setDataBaseParks] = useState([]) 
    const [search, setSearch] = useState("");
    const [buttonNeeded, setButtonNeeded] = useState(true)
   

    useEffect(() => {
        fetch(BASE_URL + limitNum)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setParks(data.data)
            })
    }, [limitNum])

useEffect(() => {
        fetch('http://localhost:3000/parks')
        .then(res=>res.json())
        .then(data => setDataBaseParks(data));
    }, [])

  
    function addToTrip(park){
        setDataBaseParks(databaseParks => {
            if(databaseParks.some(dbPark => dbPark.id === park.id)){
               return databaseParks.map(dbPark => {
                   return dbPark.id ===  park.id ? park : dbPark;
               })
            } else {
                return [...databaseParks, park]
            }
        })
    }


    function HandleSearch(e) {
        e.preventDefault()
        fetch("https://developer.nps.gov/api/v1/parks?api_key=3nGt9ZQTH0fW8byyMhNt9bA1avBgXX7gbGuT7Rt4&limit=465")
            .then(res => res.json())
            .then(data => {
                const displayedParks = data.data.filter((park) => park.states.toLowerCase().includes(search.toLowerCase()))
                setParks(displayedParks)
                setButtonNeeded(false)
            })
        
    }

   


    const parksToRender = parks.map(park => {
        if(databaseParks.some(dbPark => dbPark.id === park.id)){
            return databaseParks.find(dbPark => dbPark.id === park.id)
        }
        return park
    })

    const nationalParkComponents = parksToRender.map(park => {

        return (
            <NationalPark
                key={park.id}
                name={park.fullName}
                imageUrl={park.images[0].url}
                imageAlt={park.images[0].altText}
                park={park}
                onFocus={setFocus}
                handleClick={addToTrip}
            />
        )
    })



    return (
    <div className="cards-container">
        <div className="search-bar">
            <Search onSearch={HandleSearch} onChange={setSearch} search={search}/>
        </div>    
        {focus ? <NationalParkFocus focus={focus} onClick={setFocus}/> : null}

        {nationalParkComponents}
        {buttonNeeded ? <button id="load-button" onClick={() => setLimitNum(limitNum => limitNum + 9)}>LoadMore</button> : null}
    </div>
    )
}

export default NationalParksContainer;