export class AppViewModel {
  time = "n/a";

  activate() {
    return this.fetchTime();
  }

  fetchTime() {
    return fetch("/api/Time")
      .then<any>(response => response.json())
      .then(obj => this.time = obj.time);
  }
}