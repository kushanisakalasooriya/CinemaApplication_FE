import React, { Component } from "react";
import "./paymentSuccess.css";
import "./correct.png"
import QrGencomponent from "../admin-components/qr-gencomponent";
import axios from 'axios';

export default class successPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      movies: sessionStorage.getItem('cart'),
      showCart: [],
      userId: JSON.parse(sessionStorage.getItem("loggeduser")).email,
      paidStatus: false,
      showOnCart: '',

    };
  }

  componentDidMount() {
    axios.get('http://localhost:8280/cart/')
      .then(response => {
        this.setState({ movies: response.data })

        var i = 0;
        for (i = 0; i < this.state.movies.length; i++) {
          if (this.state.movies[i].showOnCart === true &&
            this.state.movies[i].userId === this.state.userId &&
            this.state.movies[i].paidStatus === false) {
            this.state.showCart.push(this.state.movies[i]);

            const movie = {
              paidStatus: true,
              showOnCart: false,
              movieName: this.state.movies[i].movieName,
              producer: this.state.movies[i].producer,
              year: this.state.movies[i].year,
              imageurl: this.state.movies[i].imageurl,
              genre: this.state.movies[i].genre,
              imdb: this.state.movies[i].imdb,
              quantity: this.state.movies[i].quantity,
              theaterOpt: this.state.movies[i].theaterOpt,
              userId: this.state.movies[i].userId,
            }

            axios.post('http://localhost:8280/cart/update/' + this.state.movies[i]._id, movie)
              .then(res => console.log(res.data));

          }
        }

        //re-render setstate
        this.setState({ topic: response.data })

        console.log(this.state.movies);
        console.log(this.state.showCart);

        // sessionStorage.setItem('cart', JSON.stringify(this.state.movies));
        // console.log(sessionStorage.getItem('cart'));
      })
      .catch((error) => {
        console.log(error);
      })

  }

  render() {
    return (
      <div>
        <div class="container">
          <div class="row" style={{ marginTop: '100px', height: '600px' }}>
            <div class="col-md-6 mx-auto mt-5">
              <div class="payment">
                <div class="payment_header" style={{ backgroundColor: '#1D1F20' }}>
                  <div class="check" >
                    <img src={require('./correct.png')} style={{ width: '50px', height: '50px' }} alt="correct" />
                  </div>
                </div>
                <div class="content"  >
                  <h1>Payment Success !</h1>
                  <p>
                    Thanks for your Booking. You will receive a payment confirmation after a while. Go to "My Tickets" Sections to view Purchased Tickets.
                  </p>
                  <QrGencomponent ></QrGencomponent>
                  <a href="http://localhost:3000/home" style={{ textDecoration: "none", borderRadius: '5px' }}>Go to Home</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } px
}
