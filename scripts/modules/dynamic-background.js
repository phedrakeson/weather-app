export default class DynamicBackground {
  constructor(body) {
    this.body = document.querySelector(body);
  }

  daytimeObserver() {
    this.time = new Date();
    this.time = this.time.getHours();
    switch (true) {
      case this.time >= 19:
        this.body.style.background = "url('../assets/img/night.jpg') no-repeat center";
        this.body.style.backgroundSize = "cover";
        break;
      default:
        this.body.style.background = "url('../assets/img/day.jpg') no-repeat center";
        this.body.style.backgroundSize = "cover";
        break
    }
  }

  init() {
    this.daytimeObserver()
  }
}