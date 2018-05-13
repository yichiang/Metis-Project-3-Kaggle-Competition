import React, { Component } from 'react'
import { Input, Menu, Icon } from 'semantic-ui-react'
import LogoImg from '../logo.png';
import '../App.css';


class NavComponent extends Component {

  constructor(props) {
    super(props);

  }
  componentDidMount() {

  }
  render() {
    const { activeItem,links } = this.props
    // const { links } = this.props
    console.log(this.state)
        return (
          <Menu stackable icon='labeled'>

          <Menu.Item>
            <img src={LogoImg} style={{height: '100px', width: '100px'}}/>
          </Menu.Item>
          {links.map(x =>
            <Menu.Item
              key={x.key}
              className='centerIcon'
              name={x.key}
              active={activeItem === x.key}
              onClick={this.props.handleItemClick}
            >
              <Icon name={x.icon} />
              {x.name}
            </Menu.Item>

          )}
          <Menu.Menu position='right'>
              <Menu.Item  className='centerIcon'>
                <div>
                  <Input transparent icon={{ name: 'search', link: true }} placeholder='Search...' />
                </div>
              </Menu.Item>
          </Menu.Menu>

        </Menu>
        )
    }
}

export default NavComponent;
