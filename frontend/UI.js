class UI {
  constructor(controller) {
    this.control = controller;
    const startGame = document.getElementById('startbutton');
    startGame.addEventListener('click', () => {requestAnimationFrame(this.control.dropdown);});
    const pauseGame = document.getElementById('pausebutton');
    pauseGame.addEventListener('click', () => {cancelAnimationFrame(this.control.game);});
    const restartGame = document.getElementById('restartbutton');
    restartGame.addEventListener('click', () => {this.control.restart();});
    const music = document.getElementById('musicbutton');
    music.addEventListener('click', () => {
      const background =  document.getElementById('background');
      if(background.paused) {
        background.play();
      } else {
        background.pause();
      }
    });
  }


}
export default UI;
