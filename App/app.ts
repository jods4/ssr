import { PLATFORM } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";

export class AppViewModel {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.options.pushState = true;
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName('pages/home.html') },
      { route: 'all', name: 'master', moduleId: PLATFORM.moduleName('pages/master') },
      { route: 'item/:id', name: 'details', moduleId: PLATFORM.moduleName('pages/details') },      
    ]);
  }
}