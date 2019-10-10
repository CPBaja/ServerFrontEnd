import React from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

import Content from './cards'

export default class MainSidebar extends React.Component {

  render() {

    return (
      <Sidebar.Pushable as={Segment} >
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          vertical
          visible={this.props.visibility}
          width='thin'
        >
          <Menu secondary vertical>
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Menu>

        </Sidebar>

        <Sidebar.Pusher dimmed={this.props.visibility}>
          <Segment basic>
            <Header as='h3'>Application Content</Header>
            <Content />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}
