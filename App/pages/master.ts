import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@autoinject
export class MasterViewModel {
  list: any[];
  
  constructor(private router: Router) { }

  activate() {
    return fetch("/api/duck")
      .then<any[]>(response => response.json())
      .then(list => this.list = list);
  }

  go(id: number) {
    this.router.navigateToRoute("details", { id });
  }
}