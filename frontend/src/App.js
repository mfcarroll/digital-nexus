import './App.css';
import { Button, Container, Form, Input, Menu, MenuItem, Dropdown, TextArea, Header } from 'semantic-ui-react';
import React, { useState, useEffect } from "react";
/* import { render } from 'react-dom'; */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this)
    this.state = { activePage: 'about' }
  }

  handleItemClick = (e, { name }) => this.setState({ activePage: name })

  render() {
    return (
      <div className="App">
        <MainMenu
          activePage={this.state.activePage}
          handleItemClick={this.handleItemClick}
        />
        <ShowActivePage activePage={this.state.activePage} />
        <Test />
      </div>
    );
  }
}

function ShowActivePage(props) {
  switch (props.activePage) {
    case 'viewIdeas':
      return (
        <Ideas />
      )

    case 'submitAnIdea':
      return (
        <SubmissionForm />
      )

    case 'about':
      return (
        <About />
      )

    case 'contactUs':
      return (
        <Contact />
      )

    case 'login':
      return (
        <Login />
      )

    default:
      return (
        <Ideas />
      )
  }
}

class MainMenu extends React.Component {
  state = {}

  render() {
    const activePage = this.props.activePage

    return (
      <div className="MainMenu">
        <Menu className="stackable">
          <MenuItem header><img src="/army-logo.webp" height="35" alt="Army Logo" /></MenuItem>
          <MenuItem
            name='viewIdeas'
            active={activePage === 'viewIdeas'}
            onClick={this.props.handleItemClick}
          />
          <MenuItem
            name='submitAnIdea'
            active={activePage === 'submitAnIdea'}
            onClick={this.props.handleItemClick}
          />
          <MenuItem
            name='about'
            active={activePage === 'about'}
            onClick={this.props.handleItemClick}
          />
          <MenuItem
            name='contactUs'
            active={activePage === 'contactUs'}
            onClick={this.props.handleItemClick}
          />
          <MenuItem
            name='login'
            active={activePage === 'login'}
            onClick={this.props.handleItemClick}
          />
        </Menu>
      </div>
    );
  }
}

class Ideas extends React.Component {
  render() {
    return (
      <div className="Ideas">
        <p>Showcase all the ideas</p>
      </div>
    );
  }
}

const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
]

class SubmissionForm extends React.Component {
  render() {
    return (
      <Container>
        <div className="SubmissionForm">
          <Header as='h2'>Help us find the best ideas</Header>
          <Form className="ui form" action="/add" method="POST">
            <Input type="text" name="title" placeholder="Title..." fluid={true} />
            <TextArea name="description" placeholder="Tell us more about your idea..." rows={20} />
            <Dropdown placeholder='Cams Priorities' fluid multiple search selection options={options} />
            <Button className="ui blue button" type="submit">Submit</Button>
          </Form>
        </div>
      </Container>
    );
  }
}

class About extends React.Component {
  render() {
    return (
      <div className="About">
        <p>About what we're doing</p>
      </div>
    );
  }
}

class Contact extends React.Component {
  render() {
    return (
      <div className="Contact">
        <p>Contact info</p>
      </div>
    );
  }
}

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <p>Login</p>
      </div>
    );
  }
}

function Test() {
  // usestate for setting a javascript
  // object for storing and using data
  const [data, setdata] = useState({
    testing: "",
  });

  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy
    fetch("/test").then((res) =>
      res.json().then((data) => {
        // Setting a data from api
        setdata({
          testing: data.testing,
        });
      })
    );
  }, []);

  return (
    <div className="Test">
      <p>{data.testing}</p>
    </div>
  );
}

export default App;
