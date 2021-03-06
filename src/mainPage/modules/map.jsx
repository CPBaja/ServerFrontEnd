
import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'


export default class MapCard extends React.Component {

  render() {
    const position = [51.505, -0.09]
    return(
      <Map center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
      </Map>
    )
  }

}
