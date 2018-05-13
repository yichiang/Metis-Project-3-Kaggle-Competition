import React, {Component } from 'react';
import { BrowserRouter,
         Route,
         Switch } from 'react-router-dom';

import HomeContainer from './components/HomeContainer';
import $ from 'jquery'
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path={'/'} component={() =><HomeContainer/>} />
              <Route component={HomeContainer} />
            </Switch>
          </BrowserRouter>
        </div>
    )
  }
}

export default App;
