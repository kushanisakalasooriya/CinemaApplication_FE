import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './viewMod.css';
import './viewMovieStyles.css';

const Movie = props => (
    <tr>
        <td>{props.movie.movieName}</td>
        <td>{props.movie.producer}</td>
        <td>{props.movie.year} </td>
        <td>{props.movie.genre} </td>
        <td>{props.movie.imdb} </td>
        <td>{props.movie.theaterOpt} </td>
        <td>{props.movie.quantity} </td>
        <td>
            <a href="#" onClick={() => { props.deleteItem(props.movie._id) }}>Remove</a>
        </td>
    </tr>
)

export default class ViewCart extends Component {
    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this)

        this.state = {
            movies: [],
            checkoutMap: [],
            items: [],
            showCart: [],
            userId: JSON.parse(sessionStorage.getItem("loggeduser")).email,
            paidStatus: ''
        };
    }

    async componentDidMount() {
        await axios.get('http://localhost:8280/cart/')
            .then(response => {
                this.setState({ movies: response.data })
                // console.log(this.state.movies);

                // window.sessionStorage.setItem("items", JSON.stringify(testArray));
                // var storedArray = JSON.parse(sessionStorage.getItem("items"));//no brackets

                var ticketInfo = '';
                var i = 0;
                for (i = 0; i < this.state.movies.length; i++) {
                    if (this.state.movies[i].showOnCart === true &&
                        this.state.movies[i].userId === this.state.userId &&
                        this.state.movies[i].paidStatus === false) {
                        this.state.showCart.push(this.state.movies[i]);

                        ticketInfo = ticketInfo + 'Movie: '
                            + this.state.movies[i].movieName + ' ' + ' Theater: '
                            + this.state.movies[i].theaterOpt + ' ' + ' Tickets: '
                            + this.state.movies[i].quantity + ' | ';
                    }
                }
                ticketInfo = 'User: ' + JSON.parse(sessionStorage.getItem("loggeduser")).email + ' | ' + ticketInfo;

                //re-render setstate
                this.setState({ topic: response.data })
                window.sessionStorage.setItem('ticketInfo', ticketInfo);

                console.log(ticketInfo);

                // console.log(this.state.movies);
                console.log(this.state.showCart);

                sessionStorage.setItem('cart', JSON.stringify(this.state.movies));
                // console.log(sessionStorage.getItem('cart'));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteItem(id) {

        var ask = window.confirm("Are you sure you want to remove this movie from a cart?");
        if (ask) {
            window.alert("This movie was successfully removed.");

            axios.delete('http://localhost:8280/cart/' + id)
                .then(response => { console.log(response.data) });
            this.setState({
                showCart: this.state.showCart.filter(el => el._id !== id)
            })

            window.location.href = "/cart/view";
        }
        else
            window.location.href = "/cart/view";
    }

    movieList() {
        return this.state.showCart.map(currentmovie => {
            return <Movie movie={currentmovie} deleteItem={this.deleteItem} key={currentmovie._id} />;
        })
    }

    async onCheckout() {

        await axios.get('http://localhost:8280/cart/')
            .then(response => {
                this.setState({ checkoutMap: response.data })
                console.log(this.state.checkoutMap.length);

                // console.log(this.state.checkoutMap);
            })
            .then(() => {
                var i = 0;
                for (i = 0; i < this.state.showCart.length; i++) {
                    // console.log(this.state.checkoutMap[i].movieName);
                    this.state.items.push({ id: this.state.showCart[i].movieName + ' - ' + this.state.showCart[i].theaterOpt, quantity: this.state.showCart[i].quantity })
                }
                window.sessionStorage.setItem("checkout", JSON.stringify(this.state.showCart));
                console.log('items', this.state.items);
            })

            .catch((error) => {
                console.log(error);
            })

        await fetch("http://localhost:8280/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: this.state.items
            }
            )
        })
            .then(res => {
                if (res.ok) return res.json()
                return res.json().then(json => Promise.reject(json))
            })
            .then(({ url }) => {
                window.location = url
            })
            .catch(e => {
                console.error(e.error)
            })
    }

    render() {
        return (
            <div style={{ paddingBottom: "450px" }}>
                <div className="headingModsForViewVcl" style={{ color: 'white' }}> Movie Cart  </div>
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.movieList()} <br />
                    </tbody>
                </table>
                <div className="btnView">
                    <button style={{ marginLeft: "550px" }} onClick={() => this.onCheckout()} >Checkout</button>
                </div>
                <div className="btnCancel">
                    <Link to={"/home"}> <button style={{ marginLeft: "15px" }}>Back</button></Link>
                </div>
            </div>
        )
    }
}