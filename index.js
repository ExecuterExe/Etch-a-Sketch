'use strict'

const range = document.getElementById('grid-range');
const valueDisplay = document.querySelector('.value-grid-size');
const gridContainer = document.querySelector('.grid-container');
const penColor = document.getElementById('pen-color');
const buttons = document.querySelectorAll('.standart-template-btn');
const btnColorMode = document.querySelector('.btn-color-mode');
const btnRainbowMode = document.querySelector('.btn-rainbow-mode');
const btnShadingMode = document.querySelector('.btn-shading-mode');
const btnLightingMode = document.querySelector('.btn-lighting-mode');
const btnEraser = document.querySelector('.btn-eraser');
const btnClearAll = document.querySelector('.btn-clear')
let opacity = 0;
let gridElements = null;
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
        gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridContainer.appendChild(gridElement);
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        toggleActiveClasses(button);
    });
});

function toggleActiveClasses(e) {
    buttons.forEach(button => {
        if (button.classList.contains('btn-active')) {
            button.classList.toggle('btn-active');
            removeRainbowMode();
            removeColorMode();
            removeShadingMode();
            removelightMode();
            removeEraser();
        }
    })
    e.classList.add('btn-active');
    interactionWithGrid();
}


function interactionWithGrid() {
    gridElements = document.querySelectorAll('.grid-element');
    if (btnColorMode.classList.contains('btn-active')) {
        launchColorMode()
    } if (btnRainbowMode.classList.contains('btn-active')) {
        launchRainbowMode()
    } if (btnShadingMode.classList.contains('btn-active')) {
        launchShadingMode()
    } if (btnLightingMode.classList.contains('btn-active')) {
        launchLightingMode()
    } if (btnEraser.classList.contains('btn-active')) {
        launchEraser()
    } if (btnClearAll.classList.contains('btn-active')) {
        launchClearAll()
    }
}

function launchColorMode() {
    gridElements.forEach(gridElement => {
        gridElement.addEventListener('mouseover', handleColorMode)
    });
}

function handleColorMode(event) {
    const gridElement = event.target
    gridElement.style.backgroundColor = penColor.value;
    gridElement.style.opacity = 1;
}

function removeColorMode() {
    gridElements.forEach(gridElement => {
        gridElement.removeEventListener('mouseover', handleColorMode);
    });
}

function launchRainbowMode() {
    gridElements.forEach(gridElement => {
        gridElement.addEventListener('mouseover', handleRainbowMode);
    });
}

function handleRainbowMode(event) {
    const gridElement = event.target;
    const randomColor = getRandomColor();
    gridElement.style.backgroundColor = randomColor;
    gridElement.style.opacity = 1;
}

function removeRainbowMode() {
    gridElements.forEach(gridElement => {
        gridElement.removeEventListener('mouseover', handleRainbowMode);
    });
}
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function launchShadingMode() {
    gridElements.forEach(gridElement => {
        gridElement.addEventListener('mouseover', handleShadingMode);
    });
}

function handleShadingMode(event) {
    const gridElement = event.target;
    if (gridElement.style.opacity < 1) {
        gridElement.style.opacity += 0.1;
    } else {
        gridElement.style.opacity = 1;
    }
}

function removeShadingMode() {
    gridElements.forEach(gridElement => {
        gridElement.removeEventListener('mouseover', handleShadingMode)
    })
}

function launchLightingMode() {
    gridElements.forEach(gridElement => {
        gridElement.addEventListener('mouseover', handleLightMode);
    });
}

function handleLightMode(event) {
    const gridElement = event.target;
    if (gridElement.style.opacity > 0) {
        gridElement.style.opacity -= 0.1;
    } else {
        gridElement.style.opacity = 0;
    }
}

function removelightMode() {
    gridElements.forEach(gridElement => {
        gridElement.removeEventListener('mouseover', handleLightMode)
    })
}


function launchEraser() {
    gridElements.forEach(gridElement => {
        gridElement.addEventListener('mouseover', handleEraser);
    })
}

function handleEraser(event) {
    const gridElement = event.target;
    gridElement.style.backgroundColor = '';
}

function removeEraser() {
    gridElements.forEach(gridElement => {
        gridElement.removeEventListener('mouseover', handleEraser)
    })
}

function launchClearAll() {
    gridElements.forEach(gridElement => {
        gridElement.style.backgroundColor = '';
    })
}

defineSizeGrid()
createSizeGrid()

interactionWithGrid()