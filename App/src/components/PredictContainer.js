import React, {Component } from 'react';
import { Icon, Button, Card, Image, Header, Table,  Grid, Form, Pagination, Segment, Dropdown, Message  } from 'semantic-ui-react'
import ListInfoContainer from './dashboard/ListInfoContainer'
import ReportContainer from './dashboard/ReportContainer'
import moment from 'moment'
import $ from 'jquery'

class PredictContainer extends Component {
  state = {
    search_model: {ip:48418, app:14, device:1, channel:121, os:1, hour: moment().hour(), score:-1},
    loading: false,
    searchHistories:[],

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
    var url = this.props.domainUrl+`/api/score`;
    var currentModel =  JSON.parse(JSON.stringify(this.state.search_model));
    var currentSearchHistory = this.state.searchHistories
    this.setState({loading: true})
    var self = this;
    var factor = 10000;
    $.ajax({
       url: url,
       type: "post",
       data: JSON.stringify(currentModel),
       contentType: "application/json; charset=utf-8",
       success: function (data) {
         console.log("data----", data)
         currentModel.date = moment().format("YYYY-MM-DD HH:mm:ss");
         currentModel.score = Math.round(data.score* factor) / factor;
         currentSearchHistory.push(currentModel)
         console.log("currentSearchHistory", currentSearchHistory)
         self.setState({loading: false, score: Math.round(data.score* factor) / factor, searchHistories:currentSearchHistory })

       }.bind(this)
     });
  }

  render() {
    const {
      search_model,
      loading,
      score,
      searchHistories
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


          <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Ip</Table.HeaderCell>
        <Table.HeaderCell>App</Table.HeaderCell>
        <Table.HeaderCell>Device</Table.HeaderCell>
        <Table.HeaderCell>OS</Table.HeaderCell>
        <Table.HeaderCell>Score</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {searchHistories.map(x=>{
        return (
          <Table.Row>
            <Table.Cell>{x.date}</Table.Cell>
            <Table.Cell>{x.ip}</Table.Cell>
            <Table.Cell>{x.app}</Table.Cell>
            <Table.Cell>{x.device}</Table.Cell>
            <Table.Cell>{x.os}</Table.Cell>
            <Table.Cell warning={x.score > 0.5} error={x.score <= 0.5}>{x.score}</Table.Cell>
          </Table.Row>
        )
      })}

    </Table.Body>
  </Table>
        </div>
        )
    }
}

export default PredictContainer;
