export default class TimerDisplay {
  constructor(seconds) {
    if (typeof seconds !== 'number' || seconds < 1) {
      throw TypeError('количество секунд должно быть больше 1');
    }
    this.startTime = seconds;
    this.currentTime = seconds;
  }

  start() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  pause() {
    clearInterval(this.interval);
  }

  reset() {
    this.pause();
    this.currentTime = this.startTime
  }

  tick() {
    if (this.currentTime <= 1) {
      this.currentTime = 0;
      this.pause();
      return;
    }
    --this.currentTime
  }

  set currentTime(time) {
    this._currentTime = time;
    if (this.displayElement) {
      this.displayElement.textContent = time
    }
  }

  get currentTime() {
    return this._currentTime;
  }

  get elapseTime() {
    return this.startTime - this.currentTime;
  }

  getComponentElement() {
    if (this.rootElement) return this.rootElement;
    const root = document.createElement('div');
    const currentTimerDisplay = document.createElement('div');
    const startButton = document.createElement('button');
    const pauseButton = document.createElement('button');
    const resetButton = document.createElement('button');
    root.append(currentTimerDisplay);
    root.append(startButton);
    root.append(pauseButton);
    root.append(resetButton);
    startButton.textContent = 'start';
    pauseButton.textContent = 'pause';
    resetButton.textContent = 'reset';

    startButton.addEventListener('click', () => this.start());
    pauseButton.addEventListener('click', () => this.pause());
    resetButton.addEventListener('click', () => this.reset());

    this.rootElement = root;
    this.displayElement = currentTimerDisplay;
    this.displayElement.textContent = this.currentTime;
    return root;
  }
}