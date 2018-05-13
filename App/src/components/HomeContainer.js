import React, {Component } from 'react';
import NavComponent from './NavComponent'
import { Segment } from 'semantic-ui-react'

class HomeContainer extends Component {

  constructor(props) {
    super(props);

  }
  componentDidMount() {

  }
  render() {
        return (
        <div>
          <NavComponent/>
          <Segment attached='bottom'>
          </Segment>
        </div>
        )
    }
}

export default HomeContainer;
