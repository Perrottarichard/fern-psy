import React from 'react';
import MyNavbar from './components/Navbar';
import About from './components/About';
import WelcomeMessage from './components/Welcome'
//import { BrowserRouter as Router, Route } from 'react-router-dom';


function App() {
  return (
    //<Router>
    <div className="App">
      <MyNavbar />
      <WelcomeMessage />
      <About />

    </div>
    //</Router>
  );
}

export default App;
