import './App.css';
import { Button, Container, Form, Input, Menu, MenuItem, Dropdown, TextArea, Header, GridColumn, Segment, Grid, Rating } from 'semantic-ui-react';
import React from "react";
/* import { render } from 'react-dom'; */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this)
    this.state = { activePage: 'viewIdeas' }
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
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("/ideas")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            ideas: result.ideas
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, ideas } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div></div>;
    } else {
      return (
        <div className="Ideas">
          <Container>
            <Grid stackable columns={2}>
              {ideas.map(idea => (
                <GridColumn key={idea.id}>
                  <Segment>
                    <Header size='small'>{idea.title}</Header>
                    <p>{idea.description}</p>
                    <p><em>{options[idea.cams-1]['text']}</em></p>
                    <Rating icon='star' defaultRating={idea.rating} maxRating={5} />
                  </Segment>
                </GridColumn>
              ))}
            </Grid>
          </Container>
        </div>
      );
    }
  }
}

const options = [
  { key: '1', text: 'CAMS Strategy Alpha', value: '1' },
  { key: '2', text: 'CAMS Strategy Bravo', value: '2' },
  { key: '3', text: 'CAMS Strategy Charlie', value: '3' },
  { key: '4', text: 'CAMS Strategy Delta', value: '4' },
  { key: '5', text: 'CAMS Strategy Echo', value: '5' },
  { key: '6', text: 'CAMS Strategy Foxtrot', value: '6' },
  { key: '7', text: 'CAMS Strategy Golf', value: '7' },
  { key: '8', text: 'CAMS Strategy Hotel', value: '8' },
  { key: '9', text: 'CAMS Strategy India', value: '9' },
  { key: '10', text: 'CAMS Strategy Juliet', value: '10' },
]

/* todo: load cams details from api */


class SubmissionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      cams: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDropDownSelect = this.handleDropDownSelect.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    /* const value = target.type === 'checkbox' ? target.checked : target.value; */
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleDropDownSelect(event, data) {
    const value = data.value;
    const name = data.name;
    console.log(name)
    console.log(value)
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    /* todo: switch to ajax submission */
    /* event.preventDefault(); */
  }

  render() {
    return (
      <Container>
        <div className="SubmissionForm">
          <Header as='h2'>Help us find the most innovative ideas to scale up across the army</Header>
          <Form className="ui form" onSubmit={this.handleSubmit} action="/add" method="POST">
            <label>Title</label>
            <Input
              type="text"
              name="title"
              placeholder="In a few words, what's your idea about?"
              fluid={true}
              value={this.state.title}
              onChange={this.handleInputChange}
            />

            <label>Details</label>
            <TextArea
              name="description"
              placeholder="Tell us more about your idea..."
              rows={20}
              value={this.state.description}
              onChange={this.handleInputChange}
            />

            <label>CAMS Priority Area</label>
            <Input type='hidden' name='cams' value={this.state.cams} />
            <Dropdown
              name='cams'
              placeholder='Cams Priority'
              fluid
              search
              selection
              /* multiple */
              options={options}
              value={this.state.cams}
              onChange={this.handleDropDownSelect}
            />

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
        <Container>
        <Header size='medium'>About what we're doing</Header>
        </Container>
      </div>
    );
  }
}

class Contact extends React.Component {
  render() {
    return (
      <div className="Contact">
        <Container>
        <Header size='medium'>Contact info</Header>
        </Container>
      </div>
    );
  }
}

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <Container>
        <Header size='medium'>Login</Header>
        </Container>
      </div>
    );
  }
}

export default App;
