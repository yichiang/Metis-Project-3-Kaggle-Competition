import React, {Component } from 'react';
import { Icon, Button, Card, Image, Header, Table,  Grid, Form, Pagination, Segment, Dropdown  } from 'semantic-ui-react'
import $ from 'jquery'
import moment from 'moment'


class ReportContainer extends Component {
  state = { lastUpdated:moment().format("YYYY-MM-DD HH:mm:ss"), data: [], totalCount:5, activePage:0, currentValues:'', options: []}
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this)

  }
  componentDidMount() {
    this.getData()
    this.getAllIps()
  }

  getAllIps(){

    var url = `http://127.0.0.1:5000/api/data/ip/all`;
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
    var url = `http://127.0.0.1:5000/api/data?page=${this.state.totalCount}&skip=${this.state.activePage * this.state.totalCount}`;
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

  handleChange = (e, { value }) => this.setState({ currentValues: value })

  render() {
    const {
      currentValues,
      lastUpdated,
      activePage,
      boundaryRange,
      siblingRange,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav,
      totalPages,
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
                  value={totalPages}
                />
              </Form.Group>
              <Form.Group widths={2}>
                <div className='field'>
                <label>APP</label>
                <Dropdown
                   options={this.state.options}
                   search
                   selection
                   fluid
                   multiple
                   allowAdditions
                   value={currentValues}
                   onAddItem={this.handleAddition}
                   onChange={this.handleChange}
                 />
               </div>
               <Form.Button className='submitButton'>Submit</Form.Button>

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
                      <Table.HeaderCell>Dowload</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>

                    {this.state.data.map(x => {
                      return (

                          <Table.Row>
                            <Table.Cell>
                              {/* <Header as='h2' textAlign='center'>A</Header> */}
                                <Icon name='warning sign' color='yellow'/>
                            </Table.Cell>
                            <Table.Cell>{x.ip}</Table.Cell>
                            <Table.Cell>{x.app}</Table.Cell>
                            <Table.Cell>{x.device}</Table.Cell>
                            <Table.Cell>{x.channel}</Table.Cell>
                            <Table.Cell>{x.click_time?moment(x.click_time).format("YYYY-MM-DD HH:mm:ss"):'n/a'}</Table.Cell>
                            <Table.Cell>
                              <Icon name={x.is_attributed? 'checkmark':'remove'}  color={x.is_attributed? 'blue':'black'}/>
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
