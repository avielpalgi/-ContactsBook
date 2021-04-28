import { useState, useEffect } from 'react';
import './App.css';
import AppBar from './AppBar';
import User from './User';
import { Col, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState({ label: "All Genders", value: "" });
  const [num, setNum] = useState(9)
  const [data, setData] = useState([])
  const [users, setUsers] = useState([])
  useEffect(() => {
    GetData();
  }, [])

  useEffect(() => {
    console.log(gender.value);
  }, [gender])

  useEffect(() => {
    console.log(search);
  }, [search])

  const GetData = () => {
    fetch('https://randomuser.me/api/?results=' + num)
      .then(async response => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        console.log('data', data.results);
        //setData(data.results);
        setUsers(data.results);
        let temp = users;
        data.results.map(user=>temp.push(user));
        setUsers(temp);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }
  function AddUsers() {
    setNum(num+9);
    GetData();
  }
  function handleChange(newValue) {
    setGender(newValue);
  }

  function handleSelect(newValue) {
    setGender(newValue.value);
  }


  const doSomethingWith = (value) => {
    setSearch(value);
  }

  return (
    <div className="App">
      <AppBar search={search} doSomethingWith={doSomethingWith} gender={gender} onChange={handleChange} onSelect={handleSelect} />
      <Row className="AllUsers">
        {users ? users.map(user =>
          <User SearchRes={search} GenderSelect={gender.value} Phone={user.phone} Name={user.name.first + " " + user.name.last} Email={user.email} Pic={user.picture.medium} Gender={user.gender} />) : null}
      </Row>
      <Row className="LoadRow">
        <Col>
          <Button className="btn" onClick={AddUsers}>
            Load More
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default App;
