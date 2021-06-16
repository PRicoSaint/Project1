var addItemsHere = document.querySelector('#start-here');
var beerInput = document.querySelector('#beername')
var userFormEl = document.querySelector('#userinput')
var randomBeerGen = document.querySelector('#randomgen')

var foodpairing1 = [];
var foodpairing2 = [];
var foodpairing3 = [];
function searchPunkAPI(beerName) {
  addItemsHere.innerHTML = '';
  // fetch request a random beer
  var requestUrl = 'https://api.punkapi.com/v2/beers/1?beer_name=' + beerName;
  console.log(requestUrl);

  fetch(requestUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayCurrentBeer(data);

        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to beer library. :( ');
    });
};


var formSubmitHandler = function (event) {
  event.preventDefault();

  var beerName = beerInput.value.trim();
  console.log(beerName);

  if (beerName) {
    searchPunkAPI(beerName);

  } else {
    alert('Please enter another Beer name');
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
randomBeerGen.addEventListener('click', searchRandomPunkAPI);

function searchRandomPunkAPI() {
  addItemsHere.innerHTML = '';
  // fetch request a random beer
  var requestUrl = 'https://api.punkapi.com/v2/beers/random';

  fetch(requestUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayCurrentBeer(data);

        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to beer library. :( ');
    });
};


var displayCurrentBeer = function (data) {
  if (data.length === 0) {
    alert('No info found');
    return;
  }
  var cBeerName = data[0].name;
  var cBeerABV = data[0].abv;
  var cBeerDescription = data[0].description;
  var imgURL = data[0].image_url;
  var food1 = data[0].food_pairing[0];
  var food2 = data[0].food_pairing[1];
  var food3 = data[0].food_pairing[2];
  console.log(cBeerName, cBeerABV, cBeerDescription, imgURL, food1, food2, food3);

  var title = document.createElement('h2');
  title.textContent = 'More Information';
  var box = document.createElement("ul");
  var li1 = document.createElement("li");
  li1.textContent = 'Beer: ' + cBeerName;
  var li2 = document.createElement("li");
  li2.textContent = 'Alcohol Content: ' + cBeerABV;
  var li3 = document.createElement("li");
  li3.textContent = 'Description: ' + cBeerDescription;
  var thumbnail = document.createElement("img");
  thumbnail.setAttribute("src", imgURL);
  thumbnail.setAttribute("alt", "Picture of beer");
  thumbnail.setAttribute("style", "width:75px");
  var pairings = document.createElement('div');
  var pairingTitle = document.createElement('h2');
  pairingTitle.textContent = "Recommended Food Pairings";
  var pairingsList = document.createElement('ul');
  var pairingsBullet1 = document.createElement('li');
  pairingsBullet1.textContent = food1;
  var pairingsBullet2 = document.createElement("li");
  pairingsBullet2.textContent = food2;
  var pairingsBullet3 = document.createElement("li");
  pairingsBullet3.textContent = food3;

  addItemsHere.appendChild(title);
  addItemsHere.appendChild(box);
  box.appendChild(li1);
  box.appendChild(li2);
  box.appendChild(li3);
  box.appendChild(thumbnail);
  addItemsHere.appendChild(pairings);
  pairings.appendChild(pairingTitle);
  pairings.appendChild(pairingsList);
  pairingsList.appendChild(pairingsBullet1);
  pairingsList.appendChild(pairingsBullet2);
  pairingsList.appendChild(pairingsBullet3);

}

function searchRecipe() {
  addItemsHere.innerHTML = '';

  fetch("https://api.edamam.com/api/recipes/v2?type=public&q=s'mores&app_id=50b06b27&app_key=e832a13e6b33ae73edb54c8225f3c49f")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })

    .catch(function (error) {
      alert('Unable to connect to recipe library. :( ');
    });
};

searchRecipe();