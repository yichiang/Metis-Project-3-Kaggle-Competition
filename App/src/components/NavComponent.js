import React, { Component } from 'react'
import { Input, Menu, Icon } from 'semantic-ui-react'
import LogoImg from '../logo.png';
import '../App.css';


class NavComponent extends Component {
  state = {
  'activeItem':'bio',
  'links': [
    {'key':'dashboard','path':'/','name': 'Dashboard', 'icon': 'dashboard'},
    {'key':'hist','path':'/ds','name': 'View Data', 'icon': 'feed'},
    {'key':'download','path':'/ds','name': 'Download Center', 'icon': 'download'},
    {'key':'contact','path':'/cs','name': 'Contact Us', 'icon': 'address card outline'},
    {'key':'about','path':'/courses','name': 'About Us', 'icon': 'user'}

] }
  // props = {
  // }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  constructor(props) {
    super(props);

  }
  componentDidMount() {

  }
  render() {
    const { activeItem,links } = this.state
    // const { links } = this.props
    console.log(this.state)
        return (
          <Menu stackable icon='labeled'>

          <Menu.Item>
            <img src={LogoImg} style={{height: '100px', width: '100px'}}/>
          </Menu.Item>
          {links.map(x =>
            <Menu.Item
              className='centerIcon'
              name={x.key}
              active={activeItem === x.name}
              onClick={this.handleItemClick}
            >
              <Icon name={x.icon} />
              {x.name}
            </Menu.Item>

          )}
          <Menu.Menu position='right'>
              <Menu.Item>
               <Input transparent icon={{ name: 'search', link: true }} placeholder='Search...' />
              </Menu.Item>
          </Menu.Menu>

        </Menu>
        )
    }
}

export default NavComponent;
