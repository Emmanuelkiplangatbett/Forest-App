import React from 'react'
import StarRating from './StarRating'

export default function CardStatus({park, onReview, children}) {
  function getDisplay(){
      if(park.hasOwnProperty('haveBeen')){
          if(park.haveBeen){
              return <StarRating rating={park.starRating} onReview={onReview} id={park.id}/>
          } else{
              return (
                  <div className="added-to-trip-banner">
                    Added to Trip
                  </div>
              )
          }
      } else{
          return children
      }
  }
  return ( 
      <>{getDisplay()}</>
  )
}