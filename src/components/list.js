import React from 'react'
import { Button, Table, Grid, Loader, Dimmer, Segment, Checkbox, Sidebar, Menu, Icon, Modal, Header, Form } from 'semantic-ui-react'
import ModalForm from '../containers/modal'

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showModal: false, id: '' }
  }

  componentDidMount() {
    this.props.fetchPoints()
  }

  toggleDeleteModal = (id) => {
    this.setState({ showModal: !this.state.showModal, id: id })
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
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>
                    <Button size='mini' color='yellow' onClick={() => {this.props.toggleEdit(item)}}>Edit</Button>
                    <Button size='mini' color='red' onClick={() => this.toggleDeleteModal(item.id)}>Delete</Button>
                  </Table.Cell>
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
      <Modal open={this.state.showModal}>
        <Modal.Header>
          Delete The Record
        </Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete the record</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.toggleDeleteModal}>No</Button>
          <Button positive onClick={() => { this.props.deletePoint(this.state.id), this.toggleDeleteModal()}} labelPosition='right' icon='checkmark' content='Yes' />
        </Modal.Actions>
      </Modal>
      <ModalForm/>
      </div>
    )
  }
}