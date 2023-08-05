'use strict'

const range = document.getElementById('grid-range');
const valueDisplay = document.querySelector('.value-grid-size');
const gridContainer = document.querySelector('.grid-container');
const penColor = document.getElementById('pen-color');
const buttons = document.querySelectorAll('.standart-template-btn');
let gridElement = null;
let lastButtonClick = null;

range.addEventListener('input', () => {
    defineSizeGrid(range);
});

range.addEventListener('mouseup', () => {
    createSizeGrid()
    interactionWithGrid()
});

function defineSizeGrid(range) {
    let value = range.value;
    valueDisplay.textContent = `${value}x${value}`;
}

function createSizeGrid() {
    let numbersGridElements = range.value;
    gridContainer.style.gridTemplateColumns = `repeat(${numbersGridElements}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${numbersGridElements}, 1fr)`;

    while (gridContainer.firstChild) {
        gridContainer.firstChild.remove();
    }

    for (let i = 0; i < numbersGridElements ** 2; i++) {
        console.log(1);
        gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridContainer.appendChild(gridElement);
    }
}

function interactionWithGrid() {


    const gridElements = document.querySelectorAll('.grid-element');

    gridElements.forEach(gridElement => {
        gridElement.addEventListener('mouseover', () => {
            gridElement.style.backgroundColor = penColor.value;;
        });
    });
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        lastButtonClick = button;
        console.log(lastButtonClick)
    });
});

createSizeGrid()