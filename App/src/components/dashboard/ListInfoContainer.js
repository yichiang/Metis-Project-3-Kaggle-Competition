import React, {Component } from 'react';
import { Button, Card, Image, Header, Table, Rating  } from 'semantic-ui-react'

class ListInfoContainer extends Component {
  state = { lastUpdated:'1/1/2019'}
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this)

  }
  componentDidMount() {

  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const {lastUpdated} = this.state;
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
                    <Table.Row>
                      <Table.Cell>
                        <Header as='h2' textAlign='center'>A</Header>
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>

                    </Table.Row>

                  </Table.Body>
                </Table>

          </div>
        )
    }
}

export default ListInfoContainer;
