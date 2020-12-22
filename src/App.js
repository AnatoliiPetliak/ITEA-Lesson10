import './App.css';
import React, { Component } from 'react';
import Movies from './components/movieList/Movies';
import Search from './components/searchMovie/Search';
import Header from './components/header/Header';
import NavBar from './components/navigation/NavBar';
import Footer from './components/footer/Footer';
import '../src/components/loader/Loader.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			movies: [],
			query: '',
			error: null,
			errorInfo: null,

			activePage: 1,
			moviesPerPage: 5,

			movieSessions: [
				{
					movieId: 1,
					movieTime: [ '12:00', '15:45' ]
				},
				{
					movieId: 2,
					movieTime: [ '20:00', '23:45' ]
				},
				{
					movieId: 3,
					movieTime: [ '20:00', '23:45' ]
				},
				{
					movieId: 4,
					movieTime: [ '10:00', '20:00' ]
				},
				{
					movieId: 5,
					movieTime: [ '10.00', '20:00' ]
				}
			]
		};

		this.onInput = this.onInput.bind(this);
	}

	onInput(query) {
		this.setState({
			query
		});
		if (query) {
			this.searchMovie(query);
		}
	}

	getPopularMovies() {
		const url = `https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716`;

		fetch(url).then((response) => response.json()).catch((error) => console.error('Error:', error)).then((data) => {
			this.setState({
				movies: data.results
			});
		});
	}

	searchMovie(query) {
		const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=cfe422613b250f702980a3bbf9e90716`;
		console.log(url);
		fetch(url).then((response) => response.json()).then((data) => {
			this.setState({
				movies: data.results
			});
		});
	}

	componentDidMount() {
		this.getPopularMovies();
	}

	handlePageChange = () => {
		const { activePage } = this.state;
		this.setState({ activePage: activePage + 1 });
	};

	componentDidCatch(error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo
		});
	}

	render() {
		const { movies, query, movieSessions, activePage, moviesPerPage, error } = this.state;

		if (error) {
			return <h1>Error caught!</h1>;
		}

		if (movies.length === 0) {
			return <div className="loader" />;
		}

		const { handlePageChange } = this;
		const isSearched = (query) => (item) => !query || item.title.toLowerCase().includes(query.toLowerCase());

		//Pagination
		const indexOfLastMovie = activePage * moviesPerPage;
		const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
		const currentMovie = movies.slice(indexOfFirstMovie, indexOfLastMovie);

		return (
			<div className="app">
				<Header />
				<NavBar>
					<span onClick={handlePageChange}>Show more movies</span>
				</NavBar>
				<Search query={query} onInput={this.onInput} placeholder="Search for Movie Title …" />
				<Movies movies={currentMovie.filter(isSearched(query))} movieSessions={movieSessions} />
				<Footer />
			</div>
		);
	}
}

export default App;
