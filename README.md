# yngwie-mvc
An MVC framework using yngwie-js

## What Is This?

As noted in the readme for [yngwie-js](https://github.com/mastergray/yngwie-js#readme), trying to build a practical UI with yngwie-js alone would be "admittedly clunky" - so this is an attempt to build a "more explicit MVC approach". Included are classes for [models](https://github.com/mastergray/yngwie-mvc/wiki/YngwieMVC.Model), [views](https://github.com/mastergray/yngwie-mvc/wiki/YngwieMVC.View), and [controllers](https://github.com/mastergray/yngwie-mvc/wiki/YngwieMVC.Controller) with examples found [here](https://github.com/mastergray/yngwie-mvc/tree/main/test).

## How To Use This

yngwie-mvc is built as an [ES6 module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), so you can't just require it with nodejs - nor would you want to since it's intended to run client-side in the browser. The two primary use cases then are to either include [yngwie-mvc.js](https://github.com/mastergray/yngwie-mvc/blob/main/dist/yngwie-mvc.js) as an external source with a `SCRIPT` tag or install from NPM and import the module into your project with [webpack](https://webpack.js.org/guides/getting-started/) using something like `import * as YngwieMVC from "yngwie-mvc"`.

## An Example
```javascript
// Define model:
let MODEL = YngwieMVC.Model.init({
  "Select A Value":"null",
  "Guitar 1":"Ibanez GRX20L",
  "Guitar 2":"Schecter Omen-6",
  "Guitar 3":"Fender Standard Stratocaster (MIM)",
  "Guitar 4":"Fender Telecaster (MODSHOP)",
  "Guitar 5":"Gibson Les Paul (Studio 2018)",
  "Guitar 6":"Ibanez Prestige RG (RG652AHMLNGB)"
});

// Define view for showing selected value:
let VIEW = YngwieMVC.View.init("p").text("No Guitar Selected");

// Define "controller" for updating view:
let CONTROLLER = (view) => YngwieMVC.Controller.init()
  // Add event to listen for :
  .register("update-view", value => {
    // Changes text of view to value provided by event:
    view.text(value === "null" ? "No Guitar Selected" : value).renderAgain();
  });

// Define another view for selecting value:
let SELECT = (model, controller) =>  {
  // Get all data from model:
  let items = model.state();
  // Generate OPTION elements from model data:
  let options = Object.entries(items).map(([label, value])=>{
    return YngwieMVC.View.init("OPTION", {"value":value}, label);
  })
  // Add options to SELECT and bind event handler to trigger controller when value changes:
  return YngwieMVC.View.init("select")
    .appends(options)
    .on("change", (evt, node) => {
      // Sends value of selected option to controller "update-view" event:
      controller.signal("update-view", node.value);
    });
};

// Initialize everything:
let controller = CONTROLLER(VIEW);        // Initialize controller with view
let select = SELECT(MODEL, controller);   // Initialize SELECT with model and controller
select.render("body");                    // Render and append select to body
VIEW.render("body");                      // Render and append view to body

```

The full API can be found [here](https://github.com/mastergray/yngwie-mvc/wiki/API).
