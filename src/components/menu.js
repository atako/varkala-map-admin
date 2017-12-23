import React, { Component } from 'react'
import { Button, Table, Grid, Loader, Dimmer, Segment, Checkbox, Sidebar, Menu, Icon, Modal, Header, Form } from 'semantic-ui-react'

export default class Menucomponent extends React.Component {
  render() {
    return (
      <Sidebar as={Menu} animation='push' direction='top' visible={true} inverted>
        <Menu.Menu position='right'>
          <Menu.Item>{this.props.user.displayName}</Menu.Item>
          <Menu.Item><img src={this.props.user.photoURL} /></Menu.Item>
          <Menu.Item name='logout' active={true} onClick={this.props.logout} /> 
        </Menu.Menu>
      </Sidebar>
     
    )
  }
}