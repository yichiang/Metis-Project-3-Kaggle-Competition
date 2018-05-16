import React, {Component } from 'react';
import { Icon, Button, Card, Image, Header, Table,  Grid, Form, Pagination, Segment, Dropdown  } from 'semantic-ui-react'
import $ from 'jquery'
import moment from 'moment'


class ReportContainer extends Component {
  state = { lastUpdated:moment().format("YYYY-MM-DD HH:mm:ss")
  , data: []
  , ip: []
  , channel: ''
  , totalCount:5, activePage: 1
  , options: []}
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }
  componentDidMount() {
    this.getData()
    this.getAllIps()
  }

  getAllIps(){

    var url = this.props.domainUrl+`/api/data/ip/all`;
    console.log("url", url)
    $.ajax({
       url: url,
       type: "GET",
       dataType: 'json',
       success: function (data) {
         var ips = [].concat.apply([], data);
         var allOptions = ips.map(x => ({ key: x, text: x, value: x }))
         this.setState({options: allOptions});
         console.log("allOptions----", allOptions)
       }.bind(this)
     });
  }
  getData(){
    const {totalCount, channel, ip, activePage} = this.state
    var ips = ip.map(x=>`'${x}'`).join(',')
    var url = this.props.domainUrl+`/api/data?pagesize=${totalCount}&page=${activePage}&channel=${channel}&ip=${ips}&skip=${(activePage-1) * totalCount}`;
    console.log(url)
    $.ajax({
       url: url,
       type: "GET",
       dataType: 'json',
       success: function (data) {

         //var convert_data = data.data;
         var convert_data = Object.values(data.data);
         this.setState({data: convert_data});
       }.bind(this)
     });
  }

  onPageChange(e, d){
    // console.log(e, d)
    this.setState({activePage: d.activePage})
    this.getData()
  }

  handleCheckboxChange = (e, { checked, name }) => this.setState({ [name]: checked })

  handleInputChange = (e, { name, value }) => this.setState({ [name]: value })

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })


  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
    })
  }

  handleChange(e, { value }){
    console.log(e, value)
    this.setState({ ip: value })
  }
  handleSubmit(){
    this.getData()
  }
  render() {
    const {
      lastUpdated,
      activePage,
      boundaryRange,
      siblingRange,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav,
      totalPages,
      channel,
      ip,
   } = this.state

        return (
          <div>
            <Header as='h3' block>
               Last Updated since {lastUpdated}
             </Header>
             <Form as={Segment}>
              <Form.Group widths={2}>
                <Form.Input
                  label='Active page'
                  name='activePage'
                  min={1}
                  onChange={this.handleInputChange}
                  type='number'
                  value={activePage}
                />
                <Form.Input
                  label='Channel'
                  name='channel'
                  min={1}
                  onChange={this.handleInputChange}
                  type='number'
                  value={channel}
                />
              </Form.Group>
              <Form.Group widths={2}>
                <div className='field'>
                <label>IP</label>
                <Dropdown
                   options={this.state.options}
                   search
                   selection
                   fluid
                   multiple
                   allowAdditions
                   value={ip}
                   onAddItem={this.handleAddition}
                   onChange={this.handleChange}
                 />
               </div>
               <Button className='submitButton' onClick={this.handleSubmit}>Submit</Button>

              </Form.Group>
              <Form.Group inline>

                <Form.Checkbox
                  checked={showFirstAndLastNav}
                  label='Only Download Entry'
                  name='showFirstAndLastNav'
                  onChange={this.handleCheckboxChange}
                />

              </Form.Group>

            </Form>
                <Table celled padded>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell singleLine>Status</Table.HeaderCell>
                      <Table.HeaderCell>IP</Table.HeaderCell>
                      <Table.HeaderCell>App</Table.HeaderCell>
                      <Table.HeaderCell>Device</Table.HeaderCell>
                      <Table.HeaderCell>Channel</Table.HeaderCell>
                      <Table.HeaderCell>Click Time</Table.HeaderCell>
                      <Table.HeaderCell>Download</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>

                    {this.state.data.map(x => {
                      return (
                          <Table.Row>
                            <Table.Cell>
                              {/* demo purpose */}
                              <div className='status-icon'>
                              {x.ip %2 == 1?
                                <Icon name='warning sign' color='yellow'/>
                                : <Icon name='check circle' color='green'/>}
                              </div>
                            </Table.Cell>
                            <Table.Cell>{x.ip}</Table.Cell>
                            <Table.Cell>{x.app}</Table.Cell>
                            <Table.Cell>{x.device}</Table.Cell>
                            <Table.Cell>{x.channel}</Table.Cell>
                            <Table.Cell>{x.click_time?moment(x.click_time).format("YYYY-MM-DD HH:mm:ss"):'n/a'}</Table.Cell>
                            <Table.Cell>
                              <div className='status-icon'>
                                <Icon name={x.is_attributed? 'checkmark':'remove'}  color={x.is_attributed? 'blue':'black'}/>
                              </div>
                            </Table.Cell>
                          </Table.Row>


                      )

                    })}
                  </Table.Body>
                </Table>
                <div className='pagination_wrap'>
                  <Pagination
                    defaultActivePage={activePage}
                    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                    onPageChange={this.onPageChange}
                    totalPages={10}
                  />
              </div>
          </div>
        )
    }
}

export default ReportContainer;
