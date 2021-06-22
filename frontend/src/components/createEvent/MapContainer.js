import React, { useEffect } from 'react'

const { kakao } = window;


const MapContainer  = ({ searchPlace }) => {
  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    const container = document.getElementById('myMap')
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    }

    
    const map = new kakao.maps.Map(container, options)

    const ps = new kakao.maps.services.Places()

    
  })

  return (
     <div
        id="myMap"
        style={{
          width: '500px',
          height: '500px',
        }}>
     </div>
  )
  
}

export default MapContainer 