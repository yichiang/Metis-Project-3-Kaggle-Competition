import React, {Component } from 'react';
import NavComponent from './NavComponent'
import DashboardContainer from './DashboardContainer'
import PredictContainer from './PredictContainer'
import { Segment } from 'semantic-ui-react'

class HomeContainer extends Component {
  state = {
  'activeItem':'dashboard',
  'links': [
    {'key':'dashboard','path':'/','name': 'Dashboard', 'icon': 'dashboard'},
    {'key':'predict','path':'/','name': 'Predict', 'icon': 'braille'},
    {'key':'hist','path':'/ds','name': 'View Data', 'icon': 'feed'},
    {'key':'download','path':'/ds','name': 'Download Center', 'icon': 'download'},
    {'key':'contact','path':'/cs','name': 'Contact Us', 'icon': 'address card outline'},
    {'key':'about','path':'/courses','name': 'About Us', 'icon': 'user'}

] }
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this)

  }
  componentDidMount() {

  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const {activeItem, links} = this.state;
        return (
        <div>
          <NavComponent handleItemClick={this.handleItemClick} activeItem={activeItem} links={links}/>
            <Segment attached='bottom'>
              {activeItem=='dashboard'&&<DashboardContainer/>}
              {activeItem=='predict'&&<PredictContainer/>}
          </Segment>
        </div>
        )
    }
}

export default HomeContainer;
