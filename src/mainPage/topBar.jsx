import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'

export default class MenuExampleSecondary extends Component {
  constructor(props) {
    super(props);
    this.state = { sideMenuVisible: 'true' }
  }

  render() {
    const activeItem = this.props.currentPage
    return (
      <Menu>

        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.props.setPage}
          href="/sensors"
        />

        <Menu.Item
          name='sensorPage'
          active={activeItem === 'sensorPage'}
          onClick={this.props.setPage}
          href="/status"
        />
      </Menu>
    )
  }
}
