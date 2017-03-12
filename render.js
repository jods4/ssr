const prerendering = require("aspnet-prerendering");
const jsdom = require("jsdom");

module.exports = prerendering.createServerRenderer(params => 
  new Promise((resolve, reject) => {
    jsdom.env({
      html: "<html><body aurelia-app=main></body></html>",
      scripts: ["/dist/app.js"],      
      url: "http://localhost:5000" + params.url,
      features: {
        FetchExternalResources: ["script"],
        ProcessExternalResources: ["script"]
      },
      created: (err, window) => {
        // HACK: "polyfill" missing stuff in JSDOM...
        window.SVGElement = class SVGElement extends window.Element {};
        window.requestAnimationFrame = f => window.setTimeout(f, 1000/60);

        window.addEventListener("aurelia-composed", () => {
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