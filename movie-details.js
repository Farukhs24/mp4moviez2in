const API_KEY = 'cb192ff121c372a06121e7173f44916c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchMovieDetails(id) {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
}

function renderMovieDetails(movie) {
  const container = document.getElementById('movie-details-container');
  container.innerHTML = `
    <h1>${movie.title}</h1>
    <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}">
    <p><strong>Overview:</strong> ${movie.overview}</p>
    <p><strong>Release Date:</strong> ${movie.release_date}</p>
    <p><strong>Rating:</strong> ${movie.vote_average}/10</p>
    <p><strong>Genres:</strong> ${movie.genres.map(genre => genre.name).join(', ')}</p>
  `;
}

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

if (movieId) {
  fetchMovieDetails(movieId).then(renderMovieDetails);
}
