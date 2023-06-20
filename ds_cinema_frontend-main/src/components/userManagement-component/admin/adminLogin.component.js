import React, { Component } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";

export default class AdminLogin extends Component {

    constructor(props) {
        super(props);


        this.onChangeAdminEmail = this.onChangeAdminEmail.bind(this);
        this.onChangeAdminPassword = this.onChangeAdminPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            admins: [],
            email: '',
            password: ''
        }

    }

    componentDidMount() {
        this.setState({
            admins: ['Movie Admin', 'System Admin'],
            type: 'Movie Admin'
        });
    }

    onChangeAdminEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeAdminPassword(e) {
        this.setState({
            password: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();


        const empDetails = {
            email: this.state.email,
            password: this.state.password,
        }
        axios.post('http://localhost:8280/admin/login/', empDetails)
            .then(res => {
                if (res.data.status === 200) {
                    // navigate to the admin home
                    alert("Login Success");
                    this.setState({
                        email: '',
                        password: ''
                    })
                    this.props.history.push("/admin-retrieve");
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
                                <label>Admin Email: </label>
                                <input type="email"
                                    required
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.onChangeAdminEmail}
                                />
                            </div>

                            <div className="form-group">
                                <label>Password: </label>
                                <input type="password"
                                    required
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.onChangeAdminPassword}
                                />
                            </div>


                            <button type="submit" className={styles.green_btn}>
                                Sign in
                            </button>

                        </form>

                    </div>
                </div>
            </div>


        )
    }
}
