const API_KEY = 'cb192ff121c372a06121e7173f44916c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

let currentPage = 1;
let currentQuery = '';

async function fetchMovies(query = '', page = 1) {
  const endpoint = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    : `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.results || [];
}

function renderMovies(movies) {
  const container = document.getElementById('movies-container');
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
      </a>
    `;
    container.appendChild(card);
  });
}

async function loadMovies(query = '', page = 1) {
  const movies = await fetchMovies(query, page);
  renderMovies(movies);
}

document.getElementById('search-button').addEventListener('click', () => {
  currentQuery = document.getElementById('search-input').value.trim();
  currentPage = 1;
  document.getElementById('movies-container').innerHTML = '';
  loadMovies(currentQuery, currentPage);
});

document.getElementById('load-more').addEventListener('click', () => {
  currentPage += 1;
  loadMovies(currentQuery, currentPage);
});

loadMovies();
