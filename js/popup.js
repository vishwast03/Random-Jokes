const jokeSect = document.getElementById('joke-text');
const nextBtn = document.getElementById('next-btn');

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
    fetch('https://v2.jokeapi.dev/joke/any')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.type == "twopart") {
                displayTwoPart(data);
            }
            else {
                displaySingle(data);
            }
        });
}

getData();

nextBtn.addEventListener('click', () => {
    jokeSect.innerHTML = `<div class="loading"></div>`;
    getData();
});