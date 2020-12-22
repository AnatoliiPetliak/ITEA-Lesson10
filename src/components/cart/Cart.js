import React from 'react';

import './cart.css';

const Cart = (props) => {
	const { seat, timer } = props;

	const sum = seat.reduce((sum, prev) => {
		return sum + prev.price;
	}, 0);

	return (
		<div className="cart">
			{seat.length ? <span>Time left: {timer}</span> : <span />}

			<div className="tickets-wrapper">
				{props.children}
				<h3>Your total order:</h3>
				{seat.length > 0 && (
					<div>
						<ul>
							{seat.map((item) => {
								return (
									<div key={item.id} className="ticket">
										<div>
											Ticket price: {item.price}
											Row: {item.row} Seat: {item.id}
										</div>
										<div>
											<button className="btn1" onClick={props.changeCartItems(item.id)}>
												x
											</button>
										</div>
									</div>
								);
							})}
						</ul>
					</div>
				)}
			</div>
			<div className="total-price">
				<button className="btn1" onClick={props.reserveTiskets}>
					Buy
				</button>
				<h3>Your total price: {sum} $</h3>
			</div>
		</div>
	);
};

export default Cart;
