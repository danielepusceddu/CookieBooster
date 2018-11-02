// ==UserScript==
// @name         Cookie Booster
// @namespace    https://github.com/pusceddudaniele
// @version      0.1
// @description  Click Cookies
// @author       pusceddudaniele
// @match        http://orteil.dashnet.org/cookieclicker/
// @match        https://orteil.dashnet.org/cookieclicker/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let cookieClick = {running: false, interval: null};
    let goldenClick = {running: false, interval: null};


    //I wrap this for use when Game is loaded
    function popRandWrinkler(){
        Game.PopRandomWrinkler();
    }

    function forceHandOfFate(){
        document.getElementById('grimoireSpell1').click();
    }


    //Buys the best building given by Cookie Monster mod
    function buyBestBuilding(){
        const prices = Array.from(document.getElementsByClassName('price'));
        const bestPrice = prices.find(price => price.getAttribute('style') === 'color: rgb(0, 255, 0);');
        bestPrice.click();
    }


    //Click all golden cookies on screen
    function clickGoldenCookies(){
        const goldCookies = document.getElementsByClassName('shimmer');
        for(const goldCookie of goldCookies)
            goldCookie.click();
    }


    //Toggles normal cookie auto-clicking
    function toggleClick(){
        if(cookieClick.running)
            clearInterval(cookieClick.interval);

        else
            cookieClick.interval = setInterval(function(){
                document.getElementById('bigCookie').click();
            }, 5);

        cookieClick.running = !cookieClick.running;
    }


    //Toggles golden cookie auto-clicking
    function toggleGoldenClick(){
        if(goldenClick.running)
            clearInterval(goldenClick.interval);

        else
            goldenClick.interval = setInterval(function(){
                clickGoldenCookies();
            }, 1000);

        goldenClick.running = !goldenClick.running;
    }



    const commands = [{keys: ['b', 'B'], func: buyBestBuilding},
                      {keys: ['a', 'A'], func: toggleClick},
                      {keys: ['g', 'G'], func: toggleGoldenClick},
                      {keys: ['p', 'P'], func: popRandWrinkler},
                      {keys: ['f', 'F'], func: forceHandOfFate}
                    ]


    function processKeyPress(event){
        for(const command of commands){
            if(command.keys.includes(event.key)){
                command.func();
                break;
            }
        }
    }


    //Wait until game is ready, then
    //load Cookie Monster, add event listeners and start the autoclicking
    let checkReady = setInterval(function() {
        if (typeof Game.ready !== 'undefined' && Game.ready) {
            Game.LoadMod('https://aktanusa.github.io/CookieMonster/CookieMonster.js');
            document.addEventListener('keypress', processKeyPress);
            toggleClick();
            toggleGoldenClick();
            clearInterval(checkReady);
        }
    }, 1000);


})();