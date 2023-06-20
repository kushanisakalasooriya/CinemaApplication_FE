import React, { Component } from "react";
import "./paymentSuccess.css";
import "./correct.png"
import QrGencomponent from "../admin-components/qr-gencomponent";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Movie = props => (
  <tr>
    <td>{props.movie.movieName}</td>
    <td>{props.movie.producer}</td>
    <td>{props.movie.year} </td>
    <td>{props.movie.genre} </td>
    <td>{props.movie.imdb} </td>
    <td>{props.movie.theaterOpt} </td>
    <td>{props.movie.quantity} </td>
  </tr>
)

export default class PaidPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      movies: sessionStorage.getItem('cart'),
      showCart: [],
      userId: JSON.parse(sessionStorage.getItem("loggeduser")).email,
      paidStatus: '',
      showOnCart: '',
    };
  }

  async componentDidMount() {
    await axios.get('http://localhost:8280/cart/')
      .then(response => {
        this.setState({ movies: response.data })

        var i = 0;
        for (i = 0; i < this.state.movies.length; i++) {
          if (this.state.movies[i].showOnCart === false &&
            this.state.movies[i].userId === this.state.userId &&
            this.state.movies[i].paidStatus === true) {
            this.state.showCart.push(this.state.movies[i]);

          }
        }

        //re-render setstate
        this.setState({ topic: response.data })
        // console.log(this.state.userId);
        // console.log(this.state.movies);
        // console.log(this.state.showCart);

        // sessionStorage.setItem('cart', JSON.stringify(this.state.movies));
        // console.log(sessionStorage.getItem('cart'));
      })
      .catch((error) => {
        console.log(error);
      })

  }

  movieList() {
    return this.state.showCart.map(currentmovie => {
      return <Movie movie={currentmovie} />;
    })
  }

  render() {
    return (
      <div style={{ paddingBottom: "350px" }}>
        <div className="headingModsForViewVcl" style={{ color: 'white' }}> My Tickets  </div>
        <div className="btnCancel">
          <Link to={"/home"}> <button style={{ width: "110px" }} >Back</button></Link>
        </div>
        <table className="table table-hover table-bordered table-light">
          <thead className="table-dark">
            <tr>
              <th>Movie name</th>
              <th>Producer</th>
              <th>Year</th>
              <th>Genre</th>
              <th>IMDB</th>
              <th>Theater Option</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {this.movieList()} <br />
          </tbody>
        </table>
      </div>
    )
  }
}
