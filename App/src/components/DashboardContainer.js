import React, {Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react'
import ListInfoContainer from './dashboard/ListInfoContainer'
import ReportContainer from './dashboard/ReportContainer'

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
    const {domainUrl} = this.props;
    const {activeItem, links} = this.state;
        return (
        <div>
           <ReportContainer domainUrl={domainUrl}/>
           <ListInfoContainer domainUrl={domainUrl}/>
        </div>
        )
    }
}

export default DashboardContainer;
