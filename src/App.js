import React from 'react';
import MyNavbar from './components/Navbar';
import About from './components/About';
import FormModal from './components/FormModal'

//import { BrowserRouter as Router, Route } from 'react-router-dom';


const App = () => {
  return (
    //<Router>
    <div className="App">
      <MyNavbar />
      <About />
      <FormModal />

    </div>
    //</Router>
  );
}

export default App;
