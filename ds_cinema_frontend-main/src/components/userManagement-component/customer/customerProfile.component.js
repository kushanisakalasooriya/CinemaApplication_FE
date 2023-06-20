import React, { Component } from 'react';
import axios from 'axios';

export default class CustomerProfile extends Component {
    constructor(props) {
        super(props)

        // this.editDetails = this.editDetails.bind(this);

        // this.deleteDetails = this.deleteDetails.bind(this);


        this.state = {
            customers: {},
            firstName: window.sessionStorage.getItem("loggeduser").firstName,
            lastName: '',
            password: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/customer/registration/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    password: response.data.password
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    //edit button
    //delete button
    

    render() {
        return (


            <div className="container">
                <div className="viewback" style={{ marginBottom: "30px", marginTop: "30px" }}>
                    <br></br><br></br><br></br><br></br><br></br><br></br>
                    <div className="card col-md-6 offset-md-3">

                        <h3 className="text-center">Profile</h3>

                        <div className="card-body">
                            {/* <div className="row">
                                <label> </label>
                                <div> <img style={{ width: "100%", height: "300px" }} src={this.state.customers.image}></img>
                                </div>
                            </div> */}

                            <div className="row">
                                <label style={{ marginLeft: "20px" }}> Customer First Name: {this.state.firstName}</label>

                            </div>
                            <div className="row">
                                <label style={{ marginLeft: "20px" }}> Customer Last Name:  {this.state.lastName} </label>

                            </div>
                            <div className="row">
                                <label style={{ marginLeft: "20px" }}> Customer Password: {this.state.lastName}</label>

                            </div>

                            <div>
                            {/* <button onClick = { () => this.editDetails(customers.params.id)} className="btn btn-info">Update </button>
                           

                           <button style={{marginLeft: "10px"}} className="btn btn-danger" 
                           //Delete validation
                                    onClick={() => {  const confirmBox = window.confirm(
                                                      "Are you sure want to delete your account?"
                                                    )
                                                    if (confirmBox === true) {
                                                        this.deleteDetails(customers.params.id)
                                                    }
                                                  }}>
                                                        Delete</button> */}
                            </div>

                        </div>
                    </div>
                </div>
            </div >

        )
    }
}
