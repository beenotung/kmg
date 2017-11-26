let package = require("./package.json");
let deps = package.dependencies;
Object.keys(deps).forEach(x => console.log(x + '@' + deps[x]));
