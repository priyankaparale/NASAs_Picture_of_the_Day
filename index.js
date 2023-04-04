const apiKey = "1mIUXnLryjA4tSxuydHCk51jGkPZBVR8RIdSKgZn";
function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  console.log(currentDate);
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;
  console.log(apiUrl);
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayData(data);
    })
    .catch((error) => console.log(error));
}

function getImageOfTheDay(date) {
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayData(data);
      saveSearch(date);
      addSearchToHistory(date);
    })
    .catch((error) => console.log(error));
}

function displayData(imageData) {
  const imageContainer = document.getElementById("current-image-container");
  const image = document.createElement("img");
  image.src = imageData.hdurl;
  image.alt = imageData.title;
  imageContainer.innerHTML = "";
  imageContainer.appendChild(image);
  const title = document.createElement("h1");
  title.innerHTML = imageData.title;
  imageContainer.appendChild(title);
  const explanation = document.createElement("h4");
  explanation.innerHTML = imageData.explanation;
  imageContainer.appendChild(explanation);
}

function saveSearch(search) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push(search);
  localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory(search) {
  let searchHistory = document.getElementById("search-history");
  let searchItem = document.createElement("li");
  searchItem.innerText = search;
  searchItem.addEventListener("click", () => {
    changeTitle(search);
    getImageOfTheDay(search);
  });
  searchHistory.appendChild(searchItem);
}
function changeTitle(search) {
  const heading = document.getElementById("heading");
  heading.innerText = `Picture on : ${search}`;
}

window.onload = function () {
  getCurrentImageOfTheDay();
  let searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let searchInput = document.getElementById("search-input");
    let search = searchInput.value;
    changeTitle(search);
    console.log(search);
    getImageOfTheDay(search);
  });
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.forEach((search) => addSearchToHistory(search));
};
