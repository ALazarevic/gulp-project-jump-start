"use strict";

const button = document.querySelector('#toggle-button');
const paragraph = document.querySelector('#hidden-paragraph');

button.addEventListener('click', () => {
    paragraph.classList.toggle('show');
});