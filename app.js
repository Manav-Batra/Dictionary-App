let input = document.querySelector('#input');
let searchbtn = document.querySelector('#search');
let apikey ='9fd6ab7b-77e2-4a6c-93a4-c716c0f69db6';
let notfound = document.querySelector('.not_found');
let def=document.querySelector('.def');
let audioclass=document.querySelector('.audio');
let load=document.querySelector('.Loading');
searchbtn.addEventListener('click', function (e) {
    e.preventDefault();
    // clear data
    audioclass.innerText='';
    notfound.innerText='';
    def.innerText='';
    // get input data
    let word = input.value;
    // call API get data
    if (word == '') {
        alert('word is required');
        return;
    }
    getData(word);
})

async function getData(word) {
    load.style.display='block';
    // ajax api
    const response = await fetch(`https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=9fd6ab7b-77e2-4a6c-93a4-c716c0f69db6`);
    const data = await response.json();
    // if empty result
    if (!data.length) {
        load.style.display='none';
        notfound.innerText = 'No result found';
        return;
    }
    // if result is suggestions
    if (typeof data[0] === 'string') {
        load.style.display='none';
        let heading = document.createElement('h3');
        heading.innerText = "Did you mean?"
        notfound.appendChild(heading);
data.forEach(element=>{
    let suggestion=document.createElement('span');
    suggestion.classList.add('suggest');
    suggestion.innerText=element;
    notfound.appendChild(suggestion);
})
return;
    }
    // /result found
    load.style.display='none';
    let defintion=data[0].shortdef[0];
    def.innerText=defintion;

    // sound
    const soundname=data[0].hwi.prs[0].sound.audio;
    if(soundname)
    {
        renderSound(soundname);
    }
    console.log(data);
}
function renderSound(soundname)
{
    let subfolder=soundname.charAt(0);
    let soundsrc=`https://media.merriam-webster.com/audio/prons/en/us/wav/${subfolder}/${soundname}.wav` ;
    let aud=document.createElement('audio');
    aud.src=soundsrc;
    aud.controls=true;
    audioclass.appendChild(aud);
}
