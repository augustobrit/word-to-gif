const WORD_API =
  'https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=';
const WORD_API_KEY = '';
const GIF_API = 'https://api.giphy.com/v1/gifs/search?';
const GIF_API_KEY = '';

const getImageButton = document.querySelector('.get-image');
const getLinkButton = document.querySelector('.get-link');

const loadedImg = document.querySelector('.loaded-img');
const loadedWord = document.querySelector('.loaded-word');

const footer = document.querySelector('.footer');

window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  loader.className += ' hidden';
  footer.innerHTML = `${new Date().getFullYear()} © - Made with ❤`;
  fill();
});

getImageButton.addEventListener('click', () => {
  fill();
});

getLinkButton.addEventListener('click', () => {
  console.log('Link copied');
});

async function getImageData(word) {
  try {
    const query = `&q=${word}`;
    const url = GIF_API + GIF_API_KEY + query;
    let res = await fetch(url);
    return res.json();
  } catch (err) {
    console.log('Error fetching image ', err);
  }
}

async function getWordData() {
  try {
    const url = WORD_API + WORD_API_KEY;
    let res = await fetch(url);
    return res.json();
  } catch (err) {
    console.log('Error fetching word ', err);
  }
}

async function fill() {
  try {
    const wordData = await getWordData();
    const word = wordData[0].word;
    //console.log(word);
    const imgData = await getImageData(word);
    //console.log(imgData);
    const img = imgData.data[0].images['fixed_height_small'].url;
    //console.log(img);
    loadedWord.innerHTML = `Your random word is: ${word}`;
    loadedImg.src = img;
  } catch (err) {
    console.log(err);
  }
}
