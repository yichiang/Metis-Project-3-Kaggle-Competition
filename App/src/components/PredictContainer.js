import React, {Component } from 'react';
import { Icon, Button, Card, Image, Header, Table,  Grid, Form, Pagination, Segment, Dropdown, Message  } from 'semantic-ui-react'
import ListInfoContainer from './dashboard/ListInfoContainer'
import ReportContainer from './dashboard/ReportContainer'
import moment from 'moment'
import $ from 'jquery'

class PredictContainer extends Component {
  state = {
    search_model: {ip:48418, app:14, device:1, channel:121, os:1, hour: moment().hour(), score:-1},
    loading: false
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)

  }
  componentDidMount() {
    // search_model={ip:'', app:'', device:'', channel:'', click_time: moment().format('YYYY-MM-DD')}
  }

  handleInputChange (e, { name, value }) {
    var currentModel = this.state.search_model
    console.log(currentModel)
    currentModel[name] = value
    this.setState({ search_model: currentModel })
  }



  handleChange = (e, { value }) => this.setState({ currentValues: value })
  handleSubmit(e){
    // console.log("submit",e)
    var url = `http://127.0.0.1:5000/api/score`;
    var currentModel = this.state.search_model
    this.setState({loading: true})
    var self = this;
    $.ajax({
       url: url,
       type: "post",
       data: JSON.stringify(currentModel),
       contentType: "application/json; charset=utf-8",
       success: function (data) {
         console.log("data----", data)
         self.setState({loading: false, score: data.score})

       }.bind(this)
     });
  }

  render() {
    const {
      search_model,
      loading,
      score
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
             <Form.Input
               label='os'
               name='os'
               min={1}
               onChange={this.handleInputChange}
               type='number'
               value={search_model.os}
             />
             <Form.Input
               label='hour'
               name='hour'
               min={1}
               onChange={this.handleInputChange}
               type='number'
               value={search_model.hour}
             />
              {/* <input type="datetime-local"/> */}
           </Form.Group>
           <Form.Group widths={2}>
             <Button type='submit'  onClick={this.handleSubmit}>Submit</Button>
           </Form.Group>
         </Form>
         <Message icon>
{loading?  <Icon name='circle notched' loading />
:  <Icon name='unlock alternate' />
}
<Message.Content>
    <Message.Header>
    {loading?  'Just one second':  'Your score:'}
  </Message.Header>
    <div>{score}</div>
    <div className='red'>{score > 0.5?"This user might download the app": "This user might not download the app"}</div>
</Message.Content>
</Message>
        </div>
        )
    }
}

export default PredictContainer;
