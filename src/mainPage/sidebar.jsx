import React from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Dropdown } from 'semantic-ui-react'

import Content from './cards'

const fakeOptions = [
  {
    key: 'Map',
    text: 'Map',
  },
  {
    key: 'Speed',
    text: 'Speed',
  }
]


export default class MainSidebar extends React.Component {

  render() {

    return (
      <Sidebar.Pushable as={Segment} >
        <Sidebar
          as={Menu}
          animation='scale down'
          icon='labeled'
          inverted
          vertical
          visible={this.props.visibility}

        >

            <Menu.Item>
              <Menu.Header>Profiles</Menu.Header>
              <Menu.Menu>
                <Menu.Item as='a'>Steering</Menu.Item>
                <Menu.Item as='a'>Transmission</Menu.Item>
                <Menu.Item as='a'>CVT</Menu.Item>
              </Menu.Menu>
            </Menu.Item>

            <Menu.Item>
              <Menu.Header>Add more Modules</Menu.Header>
              <Dropdown
                placeholder="module"
                fluid
                multiple
                search
                selection
                options={fakeOptions}
                onClick={() => console.log('clicked')}
              />
            </Menu.Item>


        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>
            <Header as='h3'>Application Content</Header>
            <Content />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}
