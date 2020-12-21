import React, { Component } from 'react';
import Seat from '../seat/Seat';
import Cart from '../cart/Cart';
// import Timer from "../timer/Timer";
import './cinemaHall.css';
import seat from './seat.json';

class CinemaHall extends Component {
	state = {
		seat: [],
		seatAvailable: [],
		seatReserved: [],

		isActive: false,
		currentCount: 60
	};

	componentDidMount = () => {
		const preloadedData = this.getDataFromStorage('key');

		if (preloadedData) {
			this.setState({ seat: preloadedData });
		} else {
			const converted_seat = seat.seat.map((item) => item);
			this.setState({ seat: converted_seat });
		}
	};

	componentWillUnmount = () => {};

	getDataFromStorage = (key) => {
		key = this.props.location.pathname;
		try {
			return JSON.parse(localStorage.getItem(key));
		} catch (error) {
			return [];
		}
	};

	addToCart = (seat) => (_) => {
		let data = [ ...this.state.seatReserved, seat ];
		this.setState({ seatCart: data });
		this.saveToStorage(`${this.props.location.pathname}`, data);
	};

	changeSeatStatus = (id, seat) => (_) => {
		let changedSeat = this.state.seat.map((seat) => {
			if (seat.id === id) {
				seat.reserved = !seat.reserved;
			} else if (seat.reserved === true) {
			}
			return seat;
		});

		this.setState({ seat: changedSeat });
		this.onClickData(seat);
	};

	saveToStorage = (key, allseats) => {
		localStorage.setItem(key, JSON.stringify(allseats));
	};

	clearCart = () => {
		let data = this.state.seat;
		this.saveToStorage(`${this.props.location.pathname}`, data);
		this.setState({ seatReserved: [] });
		clearInterval(this.currentTimerId);
	};

	onClickData(seat) {
		if (this.state.seatReserved.indexOf(seat) !== -1) {
			this.setState({
				seatAvailable: this.state.seatAvailable.concat(seat),
				seatReserved: this.state.seatReserved.filter((res) => res !== seat)
			});
		} else {
			this.setState({
				seatReserved: this.state.seatReserved.concat(seat),
				seatAvailable: this.state.seatAvailable.filter((res) => res !== seat)
			});
		}
		this.addToCart(seat);
	}

	goToMainPage = () => {
		this.props.history.push('');
	};

	changeCartItems = (id) => (_) => {
		const dataReserved = this.state.seatReserved.filter((res) => res.id !== id);
		this.setState({ seatReserved: dataReserved });

		let changedSeat = this.state.seat.map((seat) => {
			if (seat.id === id) {
				seat.reserved = !seat.reserved;
			} else if (seat.reserved === true) {
			}
			return seat;
		});
		this.setState({ seat: changedSeat });
	};

	restorePreviusState = (id) => {
		this.setState({ seatReserved: [] });
		this.changeCartItems(id);
	};

	startTimer = () => {
		if (this.state.isActive) {
			clearInterval(this.currentTimerId);
			this.setState({ currentCount: 60 });
		}
		this.setState({ isActive: true });
		this.currentTimerId = setInterval(() => {
			this.setState({ currentCount: this.state.currentCount - 1 });

			if (this.state.seatReserved.length === 0) {
				clearInterval(this.currentTimerId);
			}
			if (this.state.currentCount === 0) {
				this.restorePreviusState();
				clearInterval(this.currentTimerId);
			}
		}, 1000);
	};

	render() {
		const { seat, seatReserved } = this.state;
		const { changeSeatStatus, changeCartItems, goToMainPage, clearCart, startTimer } = this;

		return (
			<div className="cart-wrapper">
				<Cart
					seat={seatReserved}
					reserveTiskets={clearCart}
					changeCartItems={changeCartItems}
					timer={this.state.currentCount}
				/>

				<div className="seat-wrapper">
					{seat.map((seat) => {
						if (seat.type === 'standart') {
							return (
								<Seat
									key={seat.id}
									seatStatus={changeSeatStatus}
									className=" seat standart"
									seat={seat}
									setTimer={startTimer}
								/>
							);
						} else if (seat.type === 'lux') {
							return (
								<Seat
									seat={seat}
									key={seat.id}
									seatStatus={changeSeatStatus}
									className="seat lux"
									setTimer={startTimer}
								/>
							);
						} else if (seat.type === 'premium') {
							return (
								<Seat
									seat={seat}
									key={seat.id}
									seatStatus={changeSeatStatus}
									className=" seat premium"
									setTimer={startTimer}
								/>
							);
						}
						return null;
					})}
					<div>
						<div>
							<button onClick={goToMainPage} className="btn1">
								Back to main page
							</button>
						</div>

						<div className="seat-class-wrapper">
							<div className=" seat standart">
								<span>standart</span>
							</div>
							<div className=" seat lux">
								<span>lux</span>
							</div>
							<div className=" seat premium">
								<span>premium</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CinemaHall;
