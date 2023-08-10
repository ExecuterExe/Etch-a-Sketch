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
const btnClearAll = document.querySelector('.btn-clear');
let gridElements = null;
let gridElement = null;
let lastButtonClick = null;
let isDrawing = false;


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
        gridElement.style.backgroundColor = `rgb(${255}, ${255}, ${255})`
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
        gridElement.addEventListener('mouseover', handleColorMode);
    });
    document.addEventListener('mousedown', () => {
        isDrawing = true;
    });
    document.addEventListener('mouseup', () => {
        isDrawing = false;
    });
}

function handleColorMode(event) {
    if (isDrawing) {
        const gridElement = event.target;
        gridElement.style.backgroundColor = penColor.value;
    }
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
    document.addEventListener('mousedown', () => {
        isDrawing = true;
    });
    document.addEventListener('mouseup', () => {
        isDrawing = false;
    });
}

function handleRainbowMode(event) {
    if (isDrawing) {
        const gridElement = event.target;
        const randomColor = getRandomColor();
        gridElement.style.backgroundColor = randomColor;
    }
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
    document.addEventListener('mousedown', () => {
        isDrawing = true;
    });
    document.addEventListener('mouseup', () => {
        isDrawing = false;
    });
}

function handleShadingMode(event) {
    if (isDrawing) {
        const gridElement = event.target;
        const style = getComputedStyle(gridElement);
        const backgroundColor = style.backgroundColor;
        const rgbValues = backgroundColor.match(/\d+/g).map(Number);
        let [r, g, b] = rgbValues;
        if (r > 0 || g > 0 || b > 0) {
            r = Math.max(0, r - 15);
            g = Math.max(0, g - 15);
            b = Math.max(0, b - 15);
            gridElement.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }
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
    document.addEventListener('mousedown', () => {
        isDrawing = true;
    });
    document.addEventListener('mouseup', () => {
        isDrawing = false;
    });
}

function handleLightMode(event) {
    if (isDrawing) {
        const gridElement = event.target;
        const style = getComputedStyle(gridElement);
        const backgroundColor = style.backgroundColor;
        const rgbValues = backgroundColor.match(/\d+/g).map(Number);
        let [r, g, b] = rgbValues;
        if (r < 255 || g < 255 || b < 255) {
            r = Math.min(255, r + 15);
            g = Math.min(255, g + 15);
            b = Math.min(255, b + 15);
            gridElement.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }
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
    });
    document.addEventListener('mousedown', () => {
        isDrawing = true;
    });
    document.addEventListener('mouseup', () => {
        isDrawing = false;
    });
}

function handleEraser(event) {
    if (isDrawing) {
        const gridElement = event.target;
        gridElement.style.backgroundColor = `rgb(${255}, ${255}, ${255})`;
    }
}

function removeEraser() {
    gridElements.forEach(gridElement => {
        gridElement.removeEventListener('mouseover', handleEraser)
    })
}

function launchClearAll() {
    gridElements.forEach(gridElement => {
        gridElement.style.backgroundColor = `rgb(${255}, ${255}, ${255})`
    })
}

defineSizeGrid(range)
createSizeGrid()


interactionWithGrid()