import React from 'react';
import MyNavbar from './components/Navbar';
import About from './components/About';
import FormModal from './components/FormModal'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ForumMain from './components/ForumMain';
import ContactForm from './components/ContactForm';


const App = () => {
  return (
    <Router>
      <div className="App">
        <MyNavbar />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <ContactForm />
            <FormModal />
          </Route>
          <Route path="/forum">
            <ForumMain />
          </Route>
        </Switch>

      </div>
    </Router >
  );
}

export default App;
