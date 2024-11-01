// async function mainApi(){
//     let res = await fetch('https://api.themoviedb.org/3/movie/11?api_key=2a2986e3ee3a896b3558c5f051ded1d8');
//     let finalres = await res.json()
//     console.log(finalres);

// }
let nowPlayingMovie = [];
let rowData = document.getElementById('rowdata')
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
             <div class="col-md-3 movie">
                    <div class="image">
                        <img src="${imageBaseUrl + 'w300' + nowPlayingMovie[i].poster_path}" alt="">
                    </div>
                    <h2 class="h4 text-center text-white" >${nowPlayingMovie[i].title.slice(0, 15)}</h2>
                    <div class="caption">
                       <h3 class="rating"><i class="fa-solid fa-star text-warning"></i> ${nowPlayingMovie[i].vote_average}</h3>
                       <h3 class="votecount h5">${nowPlayingMovie[i].vote_count} Voter</h3>
                       <p class="overview ">${nowPlayingMovie[i].overview.slice(0, 150)}</p>
                    </div>
                </div>
        `

    }
    rowData.innerHTML += cartona;
} 
