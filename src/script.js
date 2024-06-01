
const API_KEY = 'api_key=879c15c6b5508bb734940f0ebe7338e7';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + 'discover/movie?sort_by=popularity.desc'+API_KEY;

getMovies(API_URL)

function getMovies(url){
    fetch(url).then(res => res.json()).then(data=>{
        console.log(data);
    })
}