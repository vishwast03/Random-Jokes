/*Storing DOM elements in variables */
const jokeSect = document.getElementById('joke-text');
const nextBtn = document.getElementById('next-btn');
const category = document.getElementById('category');
const changeBtn = document.getElementById('category-btn');

/*Function to display jokes which are composed of two parts (setup and delivery) */
function displayTwoPart(data) {
    const setup = `<p>${data.setup}</p>`;
    const delivery = `${setup}<p style="color: green;">${data.delivery}</p>`;
    jokeSect.innerHTML = setup;
    setTimeout(() => {jokeSect.innerHTML = delivery}, 3000);
}

/*Function to display jokes which are composed of single part (joke) */
function displaySingle(data) {
    const joke = `<p style="color: green;">${data.joke}</p>`;
    jokeSect.innerHTML = joke;
}

/*Function to fetch data form jokeapi according to user preferred category */
function getData() {

    /*getting user preferred category from the local storage */
    chrome.storage.local.get(['random-jokes'], function(result) { 
        let fetchCategory;
        if(Object.entries(result).length == 0) {
            fetchCategory = "any";
        }
        else {
            fetchCategory = result['random-jokes'];
            category.value = fetchCategory;
        }
        fetch(`https://v2.jokeapi.dev/joke/${fetchCategory}`)
            .then(response => response.json())
            .then(data => {
                if(data.type == "twopart") {
                    displayTwoPart(data);
                }
                else {
                    displaySingle(data);
                }
            });
    });
}

/*Function to set the category and storing it in local storage */
function setCategory() {
    chrome.storage.local.set({'random-jokes': category.value}, function() {
        
    });
}

getData();

/*Adding event listener to the add buttton */
nextBtn.addEventListener('click', () => {
    jokeSect.innerHTML = `<div class="loading"></div>`;
    getData();
});

/*Adding event listener to the change buttton */
changeBtn.addEventListener('click', () => {
    setCategory();
    nextBtn.click();
});