

let currentSong = new Audio()
async function getSongs(){

let a = await fetch ("http://127.0.0.1:5500/songs/");
let response =  await a.text();

let div = document.createElement("div");
div.innerHTML=response;
let as = div.getElementsByTagName("a");
let songs = []; 
for (let index = 0; index < as.length; index++) {
  const element = as[index];
  if(element.href.endsWith(".mp3")){
    songs.push(element.href.split("/songs/")[1]);
  }
}
return songs;
}
const playMusic = (track)=>{
  // let audio = new Audio("/songs/" + track);
  currentSong.src = "/songs/" + track
  currentSong.play();
  play.src = "logos/pause.svg"
}



async function main(){
  let songs = await getSongs();


let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
              for (const song of songs) {
              songs= song.replaceAll("%20"," ");
              songs=songs.replace("()","");
              songUL.innerHTML=songUL.innerHTML+`<li>
          <img class="music invert" src="logos/musix-logo.svg" alt="">
          <div class="info">
              <div>${songs}</div>
              <div>Song Artist</div>
          </div>
          <div class="playnow">
            <span>Play</span>
            <img class="play-now invert" src="logos/play-now.svg" alt="">
          </div>
      </li>`;
   }
   
   

  
// Create a new audio object
let audio = new Audio(songs[0]);

// Play the audio
audio.addEventListener("loadeddata",()=>{
  console.log(audio.duration, audio.currentSrc, audio.currentTime);
})


Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
  e.addEventListener("click",element=>{
    console.log(e.querySelector(".info").firstElementChild.innerHTML)
    playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
 
})

play.addEventListener("click",()=>{
    if(currentSong.paused){
      currentSong.play()
      play.src = "logos/pause.svg"
    }else{
      currentSong.pause()
      play.src = "logos/songplaybtn.svg"
    }  
  }
)

 })






}
main();
