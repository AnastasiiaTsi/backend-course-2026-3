const { Command } = require("commander");
const fs = require("fs");

const program = new Command();

program
  .requiredOption("-i, --input <file>", "шлях до файлу для читання") // обов'язковий
  .option("-o, --output <file>", "шлях до файлу для запису результату") // необов'язковий
  .option("-d, --display", "вивести результат у консоль"); // необов'язковий

program.parse(process.argv);
const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

let data;
try {
  const raw = fs.readFileSync(options.input, "utf8");
  data = JSON.parse(raw);
} catch (err) {
  console.error("Error reading or parsing input file");
  process.exit(1);
}

const result = JSON.stringify(data, null, 2);

if (options.display) {
  console.log(result);
}

if (options.output) {
  fs.writeFileSync(options.output, result, "utf8");
}