import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  logout() {
    // console.log('b4',window.sessionStorage.getItem('loggeduser'));
    sessionStorage.removeItem('loggeduser');
    console.log('after-deleted', window.sessionStorage.getItem('loggeduser'));
    window.location = '/'
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div style={{ paddingLeft: "650px" }}>
          <Link to="/home" className="navbar-brand"> CINEPLEX CINEMA INC</Link>
        </div>
        <div className='container' style={{ marginLeft: "350px" }} >
          <div>
            <Link to="/cart/view/" > <button style={{ marginLeft: "10px" }} className='btn btn-outline-light' >
              Cart </button></Link>

            <Link to="/payment-paid" style={{ textDecoration: "none" }}> <button style={{ marginLeft: "10px" }} className='btn btn-outline-light' >
              My Tickets </button></Link>

            <button onClick={this.logout.bind(this)} style={{ marginLeft: "10px" }} className='btn btn-outline-light' >
              Logout
            </button>
          </div>
        </div>
      </nav >
    );
  }
}