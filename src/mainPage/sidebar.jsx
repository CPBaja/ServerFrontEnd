import React from 'react';
import { Label, Menu, Sidebar, Pushable, Segment, Icon } from 'semantic-ui-react'

export default class MainSidebar extends React.Component {

  handleItemClick = (e, { name }) => this.props.setPage(name)


  render() {
    const { activeItem } = this.props.currentPage
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={this.props.click}
          vertical
          visible={this.props.visibility}
          width='thin'
        >
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
        </Sidebar>


      </Sidebar.Pushable>
    )
  }
}
