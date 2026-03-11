const fs = require("fs");

const data = fs.readFileSync("bank_managers.json", "utf8");
const managers = JSON.parse(data);

console.log(managers);