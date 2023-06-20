import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class adminRetrieve extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8280/movies/")
            .then((res) => {
                this.setState({ movies: res.data });
                console.log(this.state.movies);
            });
    }

    onSubmit(id) {
        axios.delete("http://localhost:8280/movies/" + id)
            .then((res) => {
                alert("Successfully deleted");
                window.location = '/admin-retrieve';
                this.setState({
                    movies: this.setState.movies.filter(movie => movie.id !== id)
                });
            });
    }

    render() {
        return (
            <div className="container"><br />
                <center><h1 style={{ color: "white" }}> MOVIE DETAILS </h1></center><br />
                <center><Link to="/admin-insert"><button style={{ width: "100%", backgroundColor: '#A1121D', color: 'white' }} type="button" class="btn ">Add Movie</button></Link></center>
                <table className="table table-bordered table-striped table table-hover table-bordered table-light ">
                    <thead className="table-dark">
                        <tr>
                            <td> Movie name </td>
                            <td> Producer </td>
                            <td> Year </td>
                            <td> Description </td>
                            <td> Genre </td>
                            <td> IMDB </td>
                            <td> cast </td>
                            <td> showtime </td>
                            <td> Action </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.movies.map(
                                movie =>
                                    <tr key={movie._id}>
                                        <td> {movie.movieName} </td>
                                        <td> {movie.producer} </td>
                                        <td> {movie.year} </td>
                                        <td> {movie.Description} </td>
                                        <td> {movie.genre} </td>
                                        <td> {movie.imdb} </td>
                                        <td> {movie.cast} </td>
                                        <td> {movie.showtime} </td>
                                        <td> <Link to={"/admin-update/" + movie._id} > <button type="button" class="btn btn-info btn-sm" >Update</button></Link>
                                            <button onClick={() => this.onSubmit(movie._id)} type="button" class="btn btn-danger btn-sm" > Delete</button>
                                        </td>
                                    </tr>
                            )
                        }

                    </tbody>
                </table>
                <br />
            </div>
        )
    }
}

