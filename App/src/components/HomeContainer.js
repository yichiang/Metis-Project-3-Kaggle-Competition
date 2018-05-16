import React, {Component } from 'react';
import NavComponent from './NavComponent'
import DashboardContainer from './DashboardContainer'
import PredictContainer from './PredictContainer'
import { Segment } from 'semantic-ui-react'
//const domainUrl = "http://52.206.3.40"
const domainUrl = "http://127.0.0.1:5000"

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
    console.log("domainUrl", domainUrl)
        return (
        <div>
          <NavComponent handleItemClick={this.handleItemClick} activeItem={activeItem} links={links}/>
            <Segment attached='bottom'>
              {activeItem=='dashboard'&&<DashboardContainer domainUrl={domainUrl}/>}
              {activeItem=='predict'&&<PredictContainer domainUrl={domainUrl}/>}
          </Segment>
        </div>
        )
    }
}

export default HomeContainer;
