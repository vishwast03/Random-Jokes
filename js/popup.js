const jokeSect = document.getElementById('joke-text');
const nextBtn = document.getElementById('next-btn');
const category = document.getElementById('category');
const changeBtn = document.getElementById('category-btn');

function displayTwoPart(data) {
    const setup = `<p>${data.setup}</p>`;
    const delivery = `${setup}<p style="color: green;">${data.delivery}</p>`;
    jokeSect.innerHTML = setup;
    setTimeout(() => {jokeSect.innerHTML = delivery}, 3000);
}

function displaySingle(data) {
    const joke = `<p style="color: green;">${data.joke}</p>`;
    jokeSect.innerHTML = joke;
}

function getData() {
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

function setCategory() {
    chrome.storage.local.set({'random-jokes': category.value}, function() {
        console.log('value is set to ' +category.value);
    });
}

getData();

nextBtn.addEventListener('click', () => {
    jokeSect.innerHTML = `<div class="loading"></div>`;
    getData();
});

changeBtn.addEventListener('click', () => {
    setCategory();
    nextBtn.click();
});