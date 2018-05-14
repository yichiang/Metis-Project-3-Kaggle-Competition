import React, {Component } from 'react';
import { Icon, Button, Card, Image, Header, Table, Rating, Pagination  } from 'semantic-ui-react'
import $ from 'jquery'
import moment from 'moment'

class ReportContainer extends Component {
  state = { lastUpdated:'1/1/2019', data: [], totalCount:5, currentPage:0}
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this)

  }
  componentDidMount() {
    this.getData()
  }
  getData(){
    var url = `http://127.0.0.1:5000/api/data?page=${this.state.totalCount}&skip=${this.state.currentPage * this.state.totalCount}`;
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
    console.log(e, d)
    this.setState({currentPage: d.activePage})
    this.getData()
  }
  render() {
    const { lastUpdated } = this.state;
        return (
          <div>
            <Header as='h3' block>
               Last Updated since {lastUpdated}
             </Header>
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
                    defaultActivePage={this.state.currentPage}
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
