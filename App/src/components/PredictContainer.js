import React, {Component } from 'react';
import { Icon, Button, Card, Image, Header, Table,  Grid, Form, Pagination, Segment, Dropdown  } from 'semantic-ui-react'
import ListInfoContainer from './dashboard/ListInfoContainer'
import ReportContainer from './dashboard/ReportContainer'
import moment from 'moment'

class PredictContainer extends Component {
  state = {
    search_model: {ip:'', app:'', device:'', channel:'', click_time: moment().format('YYYY-MM-DD')}
  }
  constructor(props) {
    super(props);
    // this.handleItemClick = this.handleItemClick.bind(this)

  }
  componentDidMount() {
    // search_model={ip:'', app:'', device:'', channel:'', click_time: moment().format('YYYY-MM-DD')}
  }
  // handleCheckboxChange = (e, { checked, name }) => this.setState({ [name]: checked })

  handleInputChange = (e, { name, value }) => this.setState({ [name]: value })

  // handlePaginationChange = (e, { activePage }) => this.setState({ activePage })


  // handleAddition = (e, { value }) => {
  //   this.setState({
  //     options: [{ text: value, value }, ...this.state.options],
  //   })
  // }

  handleChange = (e, { value }) => this.setState({ currentValues: value })


  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const {
      search_model
   } = this.state

    // const {activeItem, links} = this.state;
        return (
        <div>
          <Form as={Segment}>
           <Form.Group widths={2}>
             <Form.Input
               label='ip'
               name='ip'
               min={1}
               onChange={this.handleInputChange}
               type='number'
               value={search_model.ip}
             />
             <Form.Input
               label='app'
               name='app'
               min={1}
               onChange={this.handleInputChange}
               type='number'
               value={search_model.app}
             />
           </Form.Group>
           <Form.Group widths={2}>
             <Form.Input
               label='device'
               name='device'
               min={1}
               onChange={this.handleInputChange}
               type='number'
               value={search_model.device}
             />
             <Form.Input
               label='channel'
               name='channel'
               min={1}
               onChange={this.handleInputChange}
               type='number'
               value={search_model.channel}
             />
           </Form.Group>
           <Form.Group widths={2}>

            <Form.Button className='submitButton'>Submit</Form.Button>

           </Form.Group>


         </Form>
        </div>
        )
    }
}

export default PredictContainer;
