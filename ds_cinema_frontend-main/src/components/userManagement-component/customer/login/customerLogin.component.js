import React, { Component } from "react";
import axios from "axios";
import styles from "./styles.module.css";

export default class CustomerLogin extends Component {
  constructor(props) {
    super(props);

    this.onChangeCustomerEmail = this.onChangeCustomerEmail.bind(this);
    this.onChangeCustomerPassword = this.onChangeCustomerPassword.bind(this);
    this.onChangeToRegistration = this.onChangeToRegistration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      customers: [],
      email: "",
      password: "",
      loggeduser: "",
    };
  }

  onChangeCustomerEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeCustomerPassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeToRegistration() {
    this.props.history.push("/customer-signUp");
  }

  onSubmit(e) {
    e.preventDefault();

    const customerDetails = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:8280/customer/login/", customerDetails)
      .then((res) => {
        window.sessionStorage.setItem(
          "loggeduser",
          JSON.stringify(res.data.user)
        );

        this.setState({
          email: "",
          password: "",
        });

        if (res.data.status === 200) {
          // navigate to the home page
          alert("Login Success");
          this.props.history.push("/home");
        } else {
          alert("Login Failed. Please re-check your credentials.");
        }
      });
  }

  render() {
    return (
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_container} onSubmit={this.onSubmit}>
              <h1>Login to Your Account</h1>

              <div className="form-group">
                <label>Customer Email: </label>
                <input
                  type="email"
                  required
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChangeCustomerEmail}
                />
              </div>

              <div className="form-group">
                <label>Password: </label>
                <input
                  type="password"
                  required
                  className="form-control"
                  value={this.state.password}
                  onChange={this.onChangeCustomerPassword}
                />
              </div>

              <button type="submit" className={styles.green_btn}>
                Sign in
              </button>
            </form>
          </div>

          <div className={styles.right}>
            <h1 style={{ textAlign: "center" }}>Create new Account</h1>

            <button
              type="button"
              onClick={this.onChangeToRegistration}
              className={styles.white_btn}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    );
  }
}
