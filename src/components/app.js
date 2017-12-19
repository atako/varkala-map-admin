import React, { Component } from 'react'
import firebase, { auth, provider } from '../firebase'
import { Button, Table, Grid, Loader, Dimmer, Segment, Checkbox, Sidebar, Menu, Icon, Modal, Header, Form } from 'semantic-ui-react'
import List from '../containers/list'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null,
      showModal: false,
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.showModal = this.showModal.bind(this)
  }

  componentDidMount() {
    this.setState({ loading: true })
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user, loading: false })
      }
      this.setState({ loading:false })
    })
    const itemsRef = firebase.database().ref('points')
    itemsRef.on('value', (snapshot) => {
      const items = snapshot.val()
      this.setState({
        items: items
      })
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        })
      })
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user
        this.setState({
          user
        })
      })
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items')
    const item = {
      title: this.state.currentItem,
      user: this.state.user.displayName || this.state.user.email
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: ''
    });
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`)
    itemRef.remove()
  }

  showModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render() {
    if (this.state.loading) {
      return <div>Loading</div>
    }
    else if (!this.state.user || this.state.user.uid !== 'h4tfXGtSuTPwkwYaeffCAxwRLrk1') {
      return (
        <div style={{
          position: 'absolute',
          margin: 'auto', top: 0,
          right: 0,
          bottom: 0,
          left: 0}}>
          <Button onClick={this.login}>Login</Button>
        </div>
      )
    }
    return (
      <div>
        <Sidebar as={Menu} animation='push' direction='top' visible={true} inverted>
          <Menu.Menu position='right'>
            <Menu.Item>{this.state.user.displayName}</Menu.Item>
            <Menu.Item><img src={this.state.user.photoURL}/></Menu.Item>
            {this.state.user ? <Menu.Item name='logout' active={true} onClick={this.logout} /> : <Menu.Item name='login' active={true} onClick={this.login} />} />
          </Menu.Menu>
        </Sidebar>
        <Sidebar.Pusher style={{paddingTop: '30px'}}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={1} ></Grid.Column>
              <Grid.Column width={14}>
                <List/>
              </Grid.Column>
              <Grid.Column width={1} />
            </Grid.Row>
          </Grid>
        </Sidebar.Pusher>
      </div>
    )
  }
}

export default App
