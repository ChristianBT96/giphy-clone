

const apiKey = "9wNfx7YGWSOAO803f3340bz3Ke2RaeaZ";

const searchInput = document.querySelector(".search-input");
const searchAmount = document.querySelector(".amount-input");
const ulResult = document.querySelector(".result-container ul");
const searchBtn = document.querySelector(".search-btn");
const trendingBtn = document.querySelector(".trending-btn");
const randomBtn = document.querySelector(".random-gif");



const renderResult = (gifs) => {
    // Clear the ul
    ulResult.innerHTML = "";
    // Display the gifs
    gifs.forEach(gif => {
        // Create li and img
        const li = document.createElement("li");
        const img = document.createElement("img");
        const imgSrc = gif.images.fixed_height.url;
        // Set attributes
        img.setAttribute("src", imgSrc);
        img.setAttribute("alt", gif.title);
        // Append img to li and li to ul
        li.appendChild(img);
        ulResult.appendChild(li);
    });
}

trendingBtn.addEventListener("click", async () => {
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=5`)
    .then(response => response.json())
    .then(gifsData => {
        // Get the array of gifs
        const gifsArray = gifsData.data;
        // Display the gifs
        renderResult(gifsArray);
    });
});

searchBtn.addEventListener("click",  async () => {
    // Get the value of the input
    const searchValue = searchInput.value;
    const numberOfGifs = searchAmount.value;
    // Make url for fetching data
    const urlNoLimit = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchValue}`
    const urlLimit = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchValue}&limit=${numberOfGifs}`
    // Fetch data using the url with the ternary operator
    numberOfGifs === "" ?
        fetch(urlNoLimit)
        .then(response => response.json())
        .then(gifsData => {
            // Get the array of gifs
            const gifsArray = gifsData.data;
            // Display the gifs
            renderResult(gifsArray);
        }) :
        fetch(urlLimit)
        .then(response => response.json())
        .then(gifsData => {
            // Get the array of gifs
            const gifsArray = gifsData.data;
            // Display the gifs
            renderResult(gifsArray);
        });
});

randomBtn.addEventListener("click", async () => {
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&Limit=1`)
    .then(response => response.json())
    .then(gifsData => {
        // Get the array of gifs
        const gifArray = [gifsData.data];
        // Display the gifs
        renderResult(gifArray);
    });
});
