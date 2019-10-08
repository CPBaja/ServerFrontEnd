import React from 'react';
import { Input, Label, Menu, Icon } from 'semantic-ui-react'

export default class MainSidebar extends React.Component {

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  

  render() {
    const { activeItem } = this.props.currentPage
    return (
      <Menu vertical>
          <Menu.Item
            name='inbox'
            active={activeItem === 'inbox'}
            onClick={this.handleItemClick}
          >
            <Label color='teal'>1</Label>
            Inbox
          </Menu.Item>

          <Menu.Item
            name='spam'
            active={activeItem === 'spam'}
            onClick={this.handleItemClick}
          >
            <Label>51</Label>
            Spam
          </Menu.Item>

          <Menu.Item
            name='updates'
            active={activeItem === 'updates'}
            onClick={this.handleItemClick}
          >
            <Label>1</Label>
            Updates
          </Menu.Item>
          <Menu.Item>
            <Input icon='search' placeholder='Search mail...' />
          </Menu.Item>
        </Menu>
      )
  }
}
