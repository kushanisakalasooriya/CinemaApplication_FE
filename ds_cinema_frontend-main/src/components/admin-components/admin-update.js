import React, { Component } from 'react'
import axios from 'axios';
import './tableMod.css';

export default class adminUpdate extends Component {
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
            id: this.props.match.params.id,
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

    componentDidMount() {
        axios.get('http://localhost:8280/movies/' + this.props.match.params.id)
            .then((res) => {
                let movie = res.data;
                this.setState({
                    movieName: movie.movieName,
                    producer: movie.producer,
                    year: movie.year,
                    Description: movie.Description,
                    imageurl: movie.imageurl,
                    genre: movie.genre,
                    imdb: movie.imdb,
                    showtime: movie.showtime,
                    cast: movie.cast
                })
            })
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
            cast: this.state.cast
        }

        console.log(movie);

        axios.post('http://localhost:8280/movies/update/' + this.props.match.params.id, movie)
            .then(res => console.log(res.data), alert("Successfully submitted the Movie"));

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
                <center><h3 style={{ color: 'white' }}> Update The Movie Details</h3></center>
                <form onSubmit={this.onSubmit} className='formInputs'>
                    <div className="form-group">
                        <label>Movie Name </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.movieName}
                            onChange={this.onChangeMovieName}
                        />
                    </div>
                    <div className="form-group">
                        <label> Producer </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.producer}
                            onChange={this.onChangeProducer}
                        />
                    </div>
                    <div className="form-group">
                        <label> Year </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.year}
                            onChange={this.onChangeYear}
                        />
                    </div>
                    <div className="form-group">
                        <label> Description </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label> Image URL </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.imageurl}
                            onChange={this.onChangeImageurl}
                        />
                    </div>
                    <div className="form-group">
                        <label> Genre </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.genre}
                            onChange={this.onChangeGenre}
                        />
                    </div>
                    <div className="form-group">
                        <label> IMDB </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.imdb}
                            onChange={this.onChangeImdb}
                        />
                    </div>
                    <div className="form-group">
                        <label> Showtime </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.showtime}
                            onChange={this.onChangeShowtime}
                        />
                    </div>
                    <div className="form-group">
                        <label> Cast </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.cast}
                            onChange={this.onChangeCast}
                        />
                    </div>

                    <div className="form-group">
                        {/* <Link to="/admin-retrieve">  */}<br />
                        <center><input type="submit" value="Update Movie" className="btn btn-primary" /></center><br />
                        {/* </Link> */}
                    </div>
                </form>

            </div>
        )
    }
}
