/// <reference types="../@types/jquery" />

// async function mainApi(){
//     let res = await fetch('https://api.themoviedb.org/3/movie/11?api_key=2a2986e3ee3a896b3558c5f051ded1d8');
//     let finalres = await res.json()
//     console.log(finalres);

// }


let nowPlayingMovie = [];
let rowData = document.getElementById('rowdata');
let movieDetails = document.getElementById('movieDetails');
let imageBaseUrl = 'https://image.tmdb.org/t/p/'


async function nowPlaying() {
    try {
        let res = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=2a2986e3ee3a896b3558c5f051ded1d8');
        let finalresult = await res.json();
        console.log(finalresult.results);
        nowPlayingMovie = finalresult.results
        display()
    } catch (error) {
        console.log(error);

    }
    
} nowPlaying()

function display() {
    let cartona = ``
    for (let i = 0; i < nowPlayingMovie.length; i++) {

        cartona += `
     
             <div class="col-lg-3 col-md-6 movie  ">
                    <div class="image">
                        <img src="${imageBaseUrl + 'w300' + nowPlayingMovie[i].poster_path}" onclick="movieByDetails(${i})" alt="">
                    </div>
                    <h2 class="h4 text-center text-white" >${nowPlayingMovie[i].title.split(" ").slice(0, 4).join(" ")}</h2>
                    <div class="caption" onclick="movieByDetails(${i})">
                       <h3 class="rating"><i class="fa-solid fa-star text-warning"></i> ${nowPlayingMovie[i].vote_average}</h3>
                       <h3 class="votecount h5">${nowPlayingMovie[i].vote_count} Voter</h3>
                       <p class="overview ">${nowPlayingMovie[i].overview.split(" ").slice(0, 20).join(" ") }</p>
                    </div>
                </div>
        `

    }
    rowData.innerHTML += cartona;
    
} 


// async function getGenres() {
//     try {
//         let res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=5e80ac2e9bc3625482e51c6f51a469d0&language=en-US`);
//         let finalResult = await res.json();
//         console.log(finalResult.genres);
//     } catch (error) {
//         console.log("Error fetching genres:", error);
//     }
// }

// getGenres();
let movieByGener=[]
async function getMoviesByGenre(genre_id) {
    try {
        let res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5e80ac2e9bc3625482e51c6f51a469d0&language=en-US&include_adult=false&sort_by=created_at.asc&with_genres=${genre_id}`);
        let finalResult = await res.json();
        console.log(finalResult.results);
        movieByGener = finalResult.results
        // console.log(movieByGener);
        
        displayMoviesByGenre()
    } catch (error) {
        console.log("Error fetching movies by genre:", error);
    }
}

function displayMoviesByGenre() {
    let cartona = ``;
    for (i = 0; i < movieByGener.length ;i++){

        cartona += `
             
             <div class="col-lg-3 col-md-6 movie ">
                <div class="image">
                     <img src="${imageBaseUrl+'w300'+ movieByGener[i].poster_path}" alt="">
                </div>
                <h2 class="h4 text-center text-white" >${movieByGener[i].title.split(" ").slice(0,3).join(" ") }</h2>
                <div class="caption">
                       <h3 class="rating"><i class="fa-solid fa-star text-warning"></i> ${movieByGener[i].vote_average}</h3>
                       <h3 class="votecount h5">${movieByGener[i].vote_count} Voter</h3>
                       <p class="overview ">${movieByGener[i].overview.split(" ").slice(0, 20).join(" ") }</p>
                    </div>
            </div>
        `;
    };
    rowData.innerHTML = cartona;
}


 function movieByDetails(index){
     let cartona = ``
     for (let i = 0; i < nowPlayingMovie.length; i++){
        cartona = `
            <i class="fa-regular fa-circle-xmark " id="close-button"></i>
            <div class="col-md-12 col-lg-6">
                <img src="${imageBaseUrl + 'w300' + nowPlayingMovie[index].poster_path}" alt="">
            </div>
            <div class="col-md-12 col-lg-6 caption  gy-5 gap-3 p-2">
                <h1 class="movieTittle " >${nowPlayingMovie[index].title.split(" ").slice(0, 4).join(" ")}</h1>
                <a class="text-primary" href='https://www.youtube.com/watch?v='><i class="fa-solid fa-play"></i> Playing Trailer</a>
                <p class="movieView">${nowPlayingMovie[index].overview}</p>
                <h4 class="releaseDate">Release date ${nowPlayingMovie[index].release_date}</h4>
                <h5 class="movieRate h4"><i class="fa-solid fa-star text-warning"></i> Rating: ${nowPlayingMovie[index].vote_average}</h5>
            </div>
        `;
     }
     movieDetails.innerHTML = cartona
    
    $('#movieDetails').removeClass('d-none').addClass('d-flex');
    $('#close-button').on('click', function () {
        $('#movieDetails').removeClass('d-flex').addClass('d-none');
    })

};


$('#searchinput').on('input', async function searchMovie() {
    let searchTerm = $('#searchinput').val().trim();
    
    try {
        let res = await fetch(`http://api.themoviedb.org/3/search/movie?api_key=2a2986e3ee3a896b3558c5f051ded1d8&language=en-US&page=1&include_adult=false&query=${(searchTerm)}`);
        let finalresult = await res.json();
        console.log(finalresult.results);
        nowPlayingMovie = finalresult.results
        searchDisplay()
    } catch (error) {
        console.log(error);

    }

})

function searchDisplay(){
    let searchTerm = document.getElementById('searchinput').value.toLowerCase();
    let cartona=''

    for (let i = 0; i < nowPlayingMovie.length; i++) {
        if (nowPlayingMovie[i].title.toLowerCase().includes(searchTerm)){
            cartona += `
     
             <div class="col-lg-3 col-md-6 movie  ">
                    <div class="image">
                        <img src="${imageBaseUrl + 'w300' + nowPlayingMovie[i].poster_path}" alt="">
                    </div>
                    <h2 class="h4 text-center text-white" >${nowPlayingMovie[i].title.split(" ").slice(0, 4).join(" ")}</h2>
                    <div class="caption">
                       <h3 class="rating"><i class="fa-solid fa-star text-warning"></i> ${nowPlayingMovie[i].vote_average}</h3>
                       <h3 class="votecount h5">${nowPlayingMovie[i].vote_count} Voter</h3>
                       <p class="overview ">${nowPlayingMovie[i].overview.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        `

        }}
    rowData.innerHTML = cartona;
}




