import {Aurelia, PLATFORM} from "aurelia-framework";

export function configure(aurelia: Aurelia) {
  aurelia.use.standardConfiguration()
             .developmentLogging();

  // This is a hack so that we can delay Aurelia startup until user clicks on "Start Aurelia" button,
  // to better demonstrate the effect of server-side rendering
  Promise.resolve(window['clientStart'])
         .then(_ => aurelia.start())
         .then(() => aurelia.setRoot(PLATFORM.moduleName("app")));
}