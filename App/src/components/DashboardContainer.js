import React, {Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react'
import NavComponent from './dashboard/ListInfoContainer'

class DashboardContainer extends Component {
  state = {}
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
           <NavComponent/>
        </div>
        )
    }
}

export default DashboardContainer;
