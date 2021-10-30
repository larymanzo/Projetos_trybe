import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import Content from './Components/Content';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Content />
        <Header />
      </BrowserRouter>
    );
  }
}

export default App;
