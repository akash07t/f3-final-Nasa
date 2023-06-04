//Loading Page

let dateStr = "Jun 16, 1995";
let dateObj = new Date(dateStr);
let formattedDate = dateObj.toISOString().split("T")[0];


let currentDate = new Date().toISOString().split("T")[0];
let searchDate = document.querySelector('input');
searchDate.max = currentDate;
searchDate.min = formattedDate;
let apiKey = "nAJQNG0nmEHglCbl4kksCo06xlSeyc7gkKDkjhgW";
let url = `https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apiKey}`;

let image = document.querySelector('img');
let title = document.querySelector('h3');
let para = document.querySelector('p');
fetch(url)           
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    title.innerText = data.title;
    image.src = data.url;
    para.innerText = data.explanation;
  });

  

  function callFunc(event) {
    event.preventDefault(); 
    
    const dateInput = document.getElementById("dateInput");
    const givenDate = dateInput.value;
    
    fetch(`https://api.nasa.gov/planetary/apod?date=${givenDate}&api_key=${apiKey}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            // console.log(data);
            let heading = document.querySelector('h2');
            heading.innerHTML = `Picture ON ${data.date}`;
            title.innerText = data.title;
            image.src = data.url;
            para.innerText = data.explanation;
            
        })
    pushInLocalStorage(givenDate);
    addHistory();
}

function pushInLocalStorage(givenDate){
  if(localStorage.hasOwnProperty("searches")){
    let arr = localStorage.getItem('searches');
    arr = JSON.parse(arr);
    let obj = {date : givenDate};
    // obj = JSON.stringify(obj);
    
    if(arr.findIndex(ob => obj.date === ob.date) === -1){
      arr.push(obj);
      localStorage.setItem('searches',JSON.stringify(arr));
    }

  }else{
      let arr = [];
      let obj = {date : givenDate};
      arr.push(obj);
      localStorage.setItem('searches',JSON.stringify(arr));
      
  }
}


function showAgain(event){
  event.preventDefault();
  let givenDate = event.target.textContent;
  // console.log(givenDate);
  fetch(`https://api.nasa.gov/planetary/apod?date=${givenDate}&api_key=${apiKey}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
          // console.log(data);
            // console.log(data);
            let heading = document.querySelector('h2');
            heading.innerHTML = `Picture ON ${data.date}`;
            title.innerText = data.title;
            image.src = data.url;
            para.innerText = data.explanation;
        })
}

function addHistory(){
  // JSON.stringify(obj)
  
  let list = document.querySelector('ul');
  list.innerHTML = '';
  let data=JSON.parse(localStorage.getItem('searches'));
  for(let i=0;i<data.length;i++){
    let listItem = `<li><a href="#" onclick="showAgain(event)">${data[i].date}</a></li>`;
  list.innerHTML += listItem;
  }
}








