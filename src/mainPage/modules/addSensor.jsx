import React from 'react'

import { Dropdown } from 'semantic-ui-react'


export default class SensorDropdown extends React.Component {
  render() {
    return(
      <Dropdown placeholder='Add sensor'
        fluid search selection options={this.props.avaliableSensors}
        onChange={this.props.dropdownChange}
        value={this.props.selectionValue}/>
    )
  }
}
