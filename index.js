const { Command } = require("commander");
const fs = require("fs");

const program = new Command();

program
  .option("-f, --first <name>", "ім'я керівника банку")
  .option("-l, --last <surname>", "прізвище керівника банку");

program.parse(process.argv);
const options = program.opts();

const data = fs.readFileSync("bank_managers.json", "utf8");
const managers = JSON.parse(data);

let result = managers;

if (options.first) {
  result = result.filter(m => m.FIRST_NAME === options.first);
}

if (options.last) {
  result = result.filter(m => m.LAST_NAME === options.last);
}

if (result.length === 0) {
  console.log("Керівника не знайдено");
} else {
  result.forEach(m => {
    console.log("=====================================");
    console.log(`Ім'я: ${m.FIRST_NAME} ${m.FATHER_NAME}`);
    console.log(`Прізвище: ${m.LAST_NAME}`);
    console.log(`Посада: ${m.NAME_DOLGN}`);
    console.log(`Стан: ${m.NAME_STATE}`);
    console.log(`Назва банку: ${m.SHORTNAME}`);
    console.log("=====================================\n");
  });
}