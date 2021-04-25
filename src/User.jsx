import React, { Component } from 'react';
import { Card, Col } from 'react-bootstrap';
import { faMars, faVenus, faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Pic: "",
            Email: "",
            Phone: "",
            Gender: "",
            titleClass:"CardUser"
        }
    }
    componentDidMount() {
        this.setState({
            Gender: this.props.Gender,
            Name: this.props.Name,
            Phone: this.props.Phone,
            Pic: this.props.Pic,
            Email: this.props.Email
        })
        console.log(this.props.SearchRes);
    }

    EditGender = () => {
        if (this.state.Gender == "male") {
            return (<FontAwesomeIcon icon={faMars} />)
        }
        else {
            return (<FontAwesomeIcon icon={faVenus} />)

        }
    }

    componentDidUpdate(prevProps) {
        var newName = this.state.Name.toLocaleLowerCase();
        if((this.props.SearchRes !== prevProps.SearchRes)) {
            if (newName.includes(this.props.SearchRes)) {
                this.setState({titleClass:"CardUser yellow"})
                console.log("Change Color",this.props.SearchRes);
            }
            else{
                this.setState({titleClass:"CardUser"})
            }
        }
        if (this.props.Name !== prevProps.Name) {
            this.setState({Name:this.props.Name})
        }
        if (this.props.Pic !== prevProps.Pic) {
            this.setState({Pic:this.props.Pic})
        }
        if (this.props.Gender !== prevProps.Gender) {
            this.setState({Gender:this.props.Gender})
        }
        if (this.props.Email !== prevProps.Email) {
            this.setState({Email:this.props.Email})
        }
        if (this.props.Phone !== prevProps.Phone) {
            this.setState({Phone:this.props.Phone})
        }
      } 
    render() {
        return (
            <Col className="CardCol" lg="4">
             <Card className={this.state.titleClass}>
                    <Card.Img variant="top" src={this.state.Pic} />
                    <Card.Body>
                        <Card.Title >{this.state.Name} {this.EditGender()}</Card.Title>
                        <Card.Text>
                            <p><FontAwesomeIcon icon={faEnvelope} /> {this.state.Email}</p>
                            <p><FontAwesomeIcon icon={faPhoneAlt} /> {this.state.Phone}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
               
        );
    }
}

export default User;