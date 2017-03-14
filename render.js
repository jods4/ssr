const prerendering = require("aspnet-prerendering");
const jsdom = require("jsdom");

module.exports = prerendering.createServerRenderer(params => 
  new Promise((resolve, reject) => {
    let virtualConsole = jsdom.createVirtualConsole().sendTo(console);
    jsdom.env({
      html: "<html><body aurelia-app=main></body></html>",
      scripts: ["/dist/app.js"],      
      url: "http://localhost:5000" + params.url,
      features: {
        FetchExternalResources: ["script"],
        ProcessExternalResources: ["script"]
      },
      virtualConsole,
      created: (err, window) => {
        // HACK: "polyfill" missing stuff in JSDOM...
        window.SVGElement = class SVGElement extends window.Element {};
        window.requestAnimationFrame = f => window.setTimeout(f, 1000/60);
        // Work-around JSDOM weirdness!?!
        window.Object = Object;

        window.addEventListener("aurelia-composed", () => {
          // <input> .value property does not map to @value attribute, .defaultValue does.
          // so we need to copy that value over if we want it to serialize into HTML <input value="">
          for (let input of window.document.body.querySelectorAll("input"))
            if (input.value != null) 
              input.defaultValue = input.value;
          resolve({            
            html: window.document.body.innerHTML
          });
          window.close();
        });
      },      
      done: (err, window) => {
        if (err) reject(err);
      }
    });
  })
);