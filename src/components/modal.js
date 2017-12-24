/*global google */
import React from 'react'
import { Button, Header, Image, Modal, Icon, Form, Accordion, Divider } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { compose, withProps, withStateHandlers, withHandlers, withState } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"


const options = [
  { key: 'm', text: 'Supermarkets', value: 'supermarkets' },
  { key: 'f', text: 'Beaches', value: 'beaches' },
  { text: 'ATMs', value: 'atm' }
]


const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?AIzaSyBBNTji--JP2BD3lbsA8aLUIRRklOCunQA&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `300px` }} />,
    containerElement: <div style={{
      height: '300px'
    }} />,
    mapElement: <div style={{
      height: '300px'
    }} />
  }),
  withState('point', 'onDragEnd', { lat: 8.737457, lng: 76.708158 }),
  withHandlers(() => {
    const refs = {
      map: undefined,
    }

    return {
      onMapMounted: () => ref => {
        refs.map = ref
      },
      onMarkerRelease: ({ onDragEnd }) => () => {
        onDragEnd({ lat: refs.map.getPosition().lat(), lng: refs.map.getPosition().lng() })
        // onDragEnd(console.log(refs.map.getPosition().lng()))
      }
    }
  }),
  withScriptjs,
  withGoogleMap,
)
  (props => (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 8.737457, lng: 76.708158 }}
      defaultOptions={{
        streetViewControl: false,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.VERTICAL_BAR,
          position: google.maps.ControlPosition.TOP_CENTER
        },
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        fullscreenControl: false
      }}
      fullscreenControl={false}
    >
    <Marker
      position={props.point}
      title='Drag me'
      draggable={true}
      ref={props.onMapMounted}
      onDrag={props.onMarkerRelease}
      onDragEnd={() => props.changeCoordinates(props.point.lat, props.point.lng)}
    />
      )} 
    </GoogleMap>
  )
  )

const FormInput = props => (
  <Form.Field>
    <Form.Input 
      label={props.name} 
      placeholder={props.placeholder}
      value={props.input.value}
      {...props} />
  </Form.Field>
)

const FormSelect = props => (
  <Form.Select
    options={options}
    placeholder='Category'
    value={props.input.value}
    onChange={(param, data) => props.input.onChange(data.value)}
    {...props} />
)

const FormText = props => (
    <Form.Input
      label={props.name}
      placeholder={props.placeholder}
      value={props.input.value}
      {...props} />
)

class FormModal extends React.Component {
  state = { accordionOpen: true }

  toggleAccordion = () => {
    this.setState ({ accordionOpen: !this.state.accordionOpen })
  }

  addPoint = (values) => {
    this.props.addPoint(values)
  }

  changeCoordinates = (lat, lng) => {
    this.props.change('lat', lat)
    this.props.change('lng', lng)
  }

  render() {
    
    return (
      <Modal open={this.props.modal.show} size='large'>
        <Modal.Header>Add a new point</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.props.handleSubmit(this.addPoint)}>
              <Form.Group widths='equal'>
                <Field
                  name="title"
                  component={FormInput}
                  type="text"
                  placeholder="First Name"
                />
                <Field
                  name="category"
                  component={FormSelect}
                  placeholder="Category"
                />
              </Form.Group> 
              <Form.Group widths='equal'>
                <Field
                  parse={value => Number(value)}
                  name="lat"
                  component={FormInput}
                  type="number"
                  placeholder="Latitude"
                />
                <Field
                  parse={value => Number(value)}
                  name="lng"
                  component={FormInput}
                  type="number"
                  placeholder="Longitude"
                />
              </Form.Group> 
                <Field
                  name="description"
                  component={FormText}
                  placeholder="Description..."
                  type="text"
                />
              <Accordion>
                <Accordion.Title active={this.state.accordionOpen} onClick={this.toggleAccordion}>
                  <Icon name='dropdown' />
                  Show map
                </Accordion.Title>
                <Accordion.Content active={this.state.accordionOpen}>
                  <MyMapComponent changeCoordinates={this.changeCoordinates}/>
                </Accordion.Content>
              </Accordion>
              <Divider hidden />
              <Button onClick={() => { this.props.togglemodal(), this.props.reset() }}>
                <Icon name='remove'/> Cancel
              </Button>
              <Button loading={this.props.addPointState === 'requested' ? true: false} type='submit' color='green'>
                <Icon name='checkmark'/> Add
              </Button>
            </Form>
          </Modal.Content>
      </Modal>
    )
  }
}

export default reduxForm({
  form: 'newPoint'
})(FormModal)