import React from 'react'

//Modules
//import MapCard from './modules/map'

import SampleChart from './modules/sampleChart'

// TODO make a conditional that renders

export default class Content extends React.Component {
  render() {
    return(
      <div className='content'>
        <SampleChart />
      </div>
    )
  }

}
