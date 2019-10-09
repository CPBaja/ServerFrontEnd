import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'

export default class MenuExampleSecondary extends Component {
  constructor(props) {
    super(props);
    this.state = { sideMenuVisible: 'true' }
  }




  render() {
    const { activeItem } = this.props.currentPage

    return (
      <Menu>
        <Menu.Item>
          <Icon link name='bars' onClick={this.props.handleHamburgerClick}/>
        </Menu.Item>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.props.setPage}
        />

        <Menu.Item
          name='Vehicle Status'
          active={activeItem === 'messages'}
          onClick={this.props.setPage}
        />

        <Menu.Menu position='right'>

          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    )
  }
}
