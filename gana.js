// console.log("Welcome to Gana_Bajao");

//Initialize the variables
let songIndex=0;
let audioElement=new Audio('song/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let currentSongButton = null;

//audioElement.play();
let songs=[
    {songName: "Agar Tum Sath Ho",filepath:"song/1.mp3",coverpath:"covers/img1.avif"},
    {songName: "Oh Mahi",filepath:"song/2.mp3",coverpath:"covers/img2.jpg"},
    {songName: "Sajni Re",filepath:"song/3.mp3",coverpath:"covers/img3.jpg"},
    {songName: "Galti Se Mistake",filepath:"song/4.mp3",coverpath:"covers/img4.jpg"},
    {songName: "Apna Bana le",filepath:"song/5.mp3",coverpath:"covers/img5.jpg"},
    {songName: "Chaleya",filepath:"song/6.mp3",coverpath:"covers/img6.jpg"},
]

songItems.forEach((element, i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText=songs[i].songName;
    
})

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        if(currentSongButton){
            currentSongButton.classList.remove('fa-play-circle');
            currentSongButton.classList.add('fa-pause-circle');
        }
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
        if(currentSongButton){
            currentSongButton.classList.remove('fa-pause-circle');
            currentSongButton.classList.add('fa-play-circle');
        }
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    //Update Seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays= ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        // console.log(e.target);
        songIndex = parseInt(e.target.id);
        currentSongButton = e.target;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.src=`song/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0
    }
    else{
        songIndex+=1
    }
    audioElement.src=`song/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeAllPlays();
    let songItemPlayBtns = document.getElementsByClassName('songItemPlay');
    currentSongButton = songItemPlayBtns[songIndex];
    currentSongButton.classList.remove('fa-play-circle');
    currentSongButton.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0
    }
    else{
        songIndex-=1
    }
    audioElement.src=`song/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeAllPlays();
    let songItemPlayBtns = document.getElementsByClassName('songItemPlay');
    currentSongButton = songItemPlayBtns[songIndex];
    currentSongButton.classList.remove('fa-play-circle');
    currentSongButton.classList.add('fa-pause-circle');
})

audioElement.addEventListener('ended', () => {
    document.getElementById('next').click();
});


// `song/${songIndex+1}.mp3`