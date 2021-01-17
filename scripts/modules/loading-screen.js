export default class LoadingScreen {
  constructor(container) {
    this.container = document.querySelector(container);
  }

  transition() {
    this.container.style.display = 'none'
  }

  init() {
    setInterval( () => {
      this.transition();
    }, 2000);
  }
}