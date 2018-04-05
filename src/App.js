import React, { Component } from 'react';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css'
import 'font-awesome/css/font-awesome.css'

import SamplePage from './components/SamplePage'

class App extends Component {
  render() {
    return (
      <SamplePage></SamplePage>
    );
  }
}

export default App;
