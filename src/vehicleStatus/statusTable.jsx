import React from 'react'
import { Table, Icon } from 'semantic-ui-react'

export default class StatusTable extends React.Component {
  //var sensorData = this.props.sensorData



  render() {
    var tableRows = []
    var sensorData = this.props.avaliableSensors;
    console.log(sensorData.length)
    for (var i = 0; i < sensorData.length; i++) {
      console.log('yes')
      var checkmarkBool;
      if (sensorData[i].connected == true) {
        checkmarkBool = <Table.Cell><i class="gg-check-r"></i></Table.Cell>
      } else {
        checkmarkBool = <Table.Cell><i class="gg-close-r"></i></Table.Cell>
      }
      tableRows.push(
        <Table.Row key='sensorData[i].name'>
          <Table.Cell>{sensorData[i].text}</Table.Cell>
          <Table.Cell>{sensorData[i].detail}</Table.Cell>

          {checkmarkBool}

        </Table.Row>
      )
    }
    console.log(tableRows)
    return (
      <div class="tableContent">
        <h1>Current Sensor Statuses</h1>
        <Table >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sensor Name</Table.HeaderCell>
              <Table.HeaderCell>Notes</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableRows}
            <Table.Row>

            </Table.Row>
          </Table.Body>

        </Table>

      </div>


    )
  }
}
