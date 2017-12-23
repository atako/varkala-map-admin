import React from 'react'
import { Button, Table, Grid, Loader, Dimmer, Segment, Checkbox, Sidebar, Menu, Icon, Modal, Header, Form } from 'semantic-ui-react'
import ModalForm from '../containers/modal'

export default class List extends React.Component {

  componentDidMount() {
    this.props.fetchPoints()
  }

  render() {
    return (<div>
          {this.props.points.length > 0 ? <div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Color</Table.HeaderCell>
                <Table.HeaderCell>Visible</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.points.map((item, i) => {
                return <Table.Row key={i}>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>{item.category}</Table.Cell>
                  <Table.Cell>{item.color}</Table.Cell>
                  <Table.Cell><Checkbox checked={item.visible} /></Table.Cell>
                </Table.Row>
              })}
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan='4'>
                  <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.props.togglemodal}>
                    Add Point <Icon name='point' />
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table> </div> : <Segment style={{ paddingTop: '100px' }}>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
            </Segment>
      }
      <ModalForm />
      </div>
    )
  }
}