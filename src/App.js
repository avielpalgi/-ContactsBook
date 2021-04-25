import './MyCss.css';
import React, { Component } from 'react'
import $ from "jquery";
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import User from './User';
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfUsers: 9,
      data: [],
      SearchValue: "",
      selected: { label: "All Genders", value: "all" },
      defaultOption: "All Genders",
      Genders: [{ label: "All Genders", value: "all" }, { label: "Male", value: "male" }, { label: "Female", value: "female" }],
      users: [],
      SearchValueAfterClick: ""
    }

  }
  componentDidMount() {
    this.setState({ numOfUsers: 9 })
    this.GetData();
  }
  selectGender(e) {
    this.setState({ selected: e.target.value });
  }
  _onSelect = (option) => {
    console.log('You selected ', option.value);
    this.setState({ users: [] })
    this.setState({ selected: option })
    this.RenderUsers(option);
  }

  GetData = () => {
    $.ajax({
      url: 'https://randomuser.me/api/?results=' + this.state.numOfUsers,
      dataType: 'json',
      success: (data) => {
        this.UpdateData(data);
      }
    });
  }

  UpdateData = (data) => {
    var temp = this.state.users;
    var temp2 = this.state.data;
    data.results.map(user => { temp2.push(user) });
    data.results.map(user => { temp.push(user) });
    this.setState({
      data: temp2,
      users: temp
    })
  }
  AddUsers = () => {
    this.setState({
      numOfUsers: this.state.numOfUsers + 9
    })
    //this.forceUpdate();
    console.log(this.state.numOfUsers);
    this.GetData();
    this.RenderUsers(this.state.selected);
  }

  SearchFunction = () => {
    //e.preventDefault();
    this.setState({ SearchValueAfterClick: this.state.SearchValue })
  }

  RenderUsers = (option) => {
    var tempArr = [];
    this.forceUpdate();
    console.log(option.value);
    if (this.state.data !== "" && this.state.data !== '') {
      if (option.value == "all") {
        this.state.data.map(user => { tempArr.push(user) });
      }
      else {
        this.state.data.filter(user => user.gender == option.value).map(user => { tempArr.push(user) });
      }
      this.setState({ users: tempArr });

    }
    console.log('tempArr',tempArr);
    this.RenderingCards(tempArr);

  }

  RenderingCards = (data) => {
    console.log('dataRendering',data);
    return (data ? <Col className="CardCol" lg="4">{
      data.map(user =>
        <User Gender={user.gender}
          Name={user.name.first + " " + user.name.last}
          Phone={user.phone} Pic={user.picture.medium}
          Email={user.email}
          SearchRes={this.state.SearchValueAfterClick} />)
    }</Col> : null)
  }

  render() {
    return (
      <Container fluid>
        <Row className="Header">
          <Col lg="2">
            <h2>Contact Book</h2>

          </Col>
          <Col lg="7">
            <Form className="SearchForm">
              <Form.Group>
                <Form.Control type="text" value={this.state.SearchValue} placeholder="search" onChange={(e) => this.setState({ SearchValue: e.target.value })} />
              </Form.Group>
              <FontAwesomeIcon className="SearchButton" icon={faSearch} onClick={() => { this.SearchFunction() }} />

            </Form>
          </Col>
          <Col lg="3">
            <Dropdown options={this.state.Genders} onChange={this._onSelect} value={this.state.defaultOption} placeholder="Select an option" />
          </Col>
        </Row>
        <Row className="Rendering">
          {this.RenderingCards(this.state.users)}
        </Row>
        <Row className="LoadRow">
          <Col>
            <Button className="btn" onClick={() => { this.AddUsers() }}>
              Load More
          </Button>
          </Col>
        </Row>

      </Container>
    )
  }
}

export default App



