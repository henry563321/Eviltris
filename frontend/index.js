import Controller from './control.js';
import UI from './UI.js';

document.addEventListener('DOMContentLoaded', () => {
const canvas = document.getElementById('canvas');
const control = new Controller(canvas);
const controlboard = document.getElementById('controlboard');
const ui = new UI(control);
});
