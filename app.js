const API_KEY = 'cb192ff121c372a06121e7173f44916c';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const movieContainer = document.getElementById('movie-container');
const loadMoreButton = document.getElementById('load-more');
const searchInput = document.getElementById('search');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('movie-details');
const closeModal = document.getElementById('close-modal');

let page = 1;
let currentQuery = '';

async function fetchMovies(query = '') {
  const url = query
    ? `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    : `${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}&region=IN&page=${page}`;
  
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

function renderMovies(movies) {
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
      <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}" data-id="${movie.id}">
      <p class="movie-title" data-id="${movie.id}">${movie.title}</p>
    `;
    movieContainer.appendChild(movieElement);
  });
}

async function showMovieDetails(movieId) {
  const response = await fetch(`${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`);
  const movie = await response.json();

  const trailer = movie.videos.results.find(video => video.type === 'Trailer');
  const trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';

  modalContent.innerHTML = `
    <h2>${movie.title}</h2>
    <p>${movie.overview}</p>
    ${trailerUrl ? `<iframe src="${trailerUrl}" frameborder="0" allowfullscreen></iframe>` : ''}
  `;
  modal.classList.remove('hidden');
}

loadMoreButton.addEventListener('click', async () => {
  page++;
  const movies = await fetchMovies(currentQuery);
  renderMovies(movies);
});

searchInput.addEventListener('keyup', async (e) => {
  if (e.key === 'Enter') {
    currentQuery = e.target.value;
    page = 1;
    movieContainer.innerHTML = '';
    const movies = await fetchMovies(currentQuery);
    renderMovies(movies);
  }
});

movieContainer.addEventListener('click', (e) => {
  const movieId = e.target.dataset.id;
  if (movieId) {
    showMovieDetails(movieId);
  }
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});