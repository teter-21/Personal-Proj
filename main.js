$(document).ready(function () {
    let waves = document.querySelector('#wave');
    let imgSwitch = document.querySelector('#img-cont');
    let boxOne = document.getElementById('box1');
    let boxTwo = document.querySelector('#box2');
    let address = document.querySelector('.address');
    let btnAddress = document.querySelector('#right-btn');

    // makeWave function that every 2 secs toggle the class 'wave'
    const makeWave = () => {
        setInterval(() => {
            $(waves).toggleClass('wave')
        }, 2000)
    }

    //Switching Box image
    $(imgSwitch).click(function () {
        $(boxOne).toggleClass('box-slide1');
        $(boxTwo).toggleClass('box-slide2');
    });


    $(btnAddress).click(function () {
        $(address).toggleClass("address-show");
    });

    makeWave();
})

function cvClick() {
    alert("More Info Clicked!");
}

function hireClick() {
    alert("Hire Me Clicked!");
}