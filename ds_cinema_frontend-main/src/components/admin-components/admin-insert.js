import React, { Component } from 'react'
import axios from 'axios';
import './tableMod.css';

export default class adminInsert extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeMovieName = this.onChangeMovieName.bind(this);
        this.onChangeProducer = this.onChangeProducer.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeImageurl = this.onChangeImageurl.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onChangeImdb = this.onChangeImdb.bind(this);
        this.onChangeShowtime = this.onChangeShowtime.bind(this);
        this.onChangeCast = this.onChangeCast.bind(this);

        this.state = {
            movieName: '',
            producer: '',
            year: '',
            Description: '',
            imageurl: '',
            genre: '',
            imdb: '',
            showtime: '',
            cast: ''
        }
    }

    onChangeMovieName(e) {
        this.setState({
            movieName: e.target.value
        })
    }

    onChangeProducer(e) {
        this.setState({
            producer: e.target.value
        });
    }
    onChangeYear(e) {
        this.setState({
            year: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            Description: e.target.value
        });
    }
    onChangeImageurl(e) {
        this.setState({
            imageurl: e.target.value
        });
    }
    onChangeGenre(e) {
        this.setState({
            genre: e.target.value
        });
    }
    onChangeImdb(e) {
        this.setState({
            imdb: e.target.value
        });
    }

    onChangeCast(e) {
        this.setState({
            cast: e.target.value
        });
    }

    onChangeShowtime(e) {
        this.setState({
            showtime: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const movie = {
            movieName: this.state.movieName,
            producer: this.state.producer,
            year: this.state.year,
            Description: this.state.Description,
            imageurl: this.state.imageurl,
            genre: this.state.genre,
            imdb: this.state.imdb,
            showtime: this.state.showtime,
            cast: this.state.cast,
        }

        console.log(movie);

        axios.post('http://localhost:8280/movies/add', movie)
            .then(res => console.log(res.data), alert("Successfully Added the Movie"));

        this.setState({
            movieName: '',
            producer: '',
            year: '',
            Description: '',
            imageurl: '',
            genre: '',
            imdb: '',
            showtime: '',
            cast: ''

        })

        window.location = '/admin-retrieve';
    }

    render() {
        return (
            <div><br />
                <center><h3 style={{ color: 'white' }}>Create New Group Log</h3> </center><br />
                <center><form onSubmit={this.onSubmit} className='formInputs' style={{ color: 'white', backgroundColor: '#f9f9f927', width: '80%' }}>
                    <div className="form-group"> <br /><br />
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.movieName}
                            onChange={this.onChangeMovieName}
                            placeholder='Movie Name'

                        /><br />
                    </div>
                    <div className="form-group">
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.producer}
                            onChange={this.onChangeProducer}
                            placeholder='Producer'
                        /><br />
                    </div>
                    <div className="form-group">
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.year}
                            onChange={this.onChangeYear}
                            placeholder='Year'
                        /><br />
                    </div>
                    <div className="form-group">
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Description}
                            onChange={this.onChangeDescription}
                            placeholder='Description'
                        /><br />
                    </div>
                    <div className="form-group">
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.imageurl}
                            onChange={this.onChangeImageurl}
                            placeholder='Image URL'
                        /><br />
                    </div>
                    <div className="form-group">
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.genre}
                            onChange={this.onChangeGenre}
                            placeholder='Genre'
                        /><br />
                    </div>
                    <div className="form-group">
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.imdb}
                            onChange={this.onChangeImdb}
                            placeholder='IMDB'
                        /><br />
                    </div>
                    <div className="form-group">
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.showtime}
                            onChange={this.onChangeShowtime}
                            placeholder='Show Time'
                        /><br />
                    </div>
                    <div className="form-group">
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.cast}
                            onChange={this.onChangeCast}
                            placeholder='Cast'
                        /><br />
                    </div>

                    <div className="form-group">
                        <br /><center><input type="submit" value="Create Group" className="btn btn-primary" /></center> <br />
                    </div>
                </form></center><br />

            </div >
        )
    }
}
