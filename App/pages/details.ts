export class DetailsViewModel {
  item: any;

  activate({ id }: any) {
    return fetch("/api/duck/" + id)
      .then<any>(response => response.json())
      .then(duck => this.item = duck);
  }
}