const { Command } = require("commander");
const fs = require("fs");

const program = new Command();

program.configureOutput({
  outputError: (str, write) => {
    if (str.includes("required option")) {
      write("Please, specify input file\n");
    } else {
      write(str);
    }
  }
});

program
  .requiredOption("-i, --input <file>", "шлях до файлу для читання")
  .option("-o, --output <file>", "шлях до файлу для запису")
  .option("-d, --display", "вивести результат в консоль")
  .option("-m, --mfo", "додати МФО перед назвою")
  .option("-n, --normal", "тільки COD_STATE = 1");

program.parse(process.argv);
const options = program.opts();

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(options.input, "utf8"));
let banks = Array.isArray(data) ? data : [data];

if (options.normal) {
  banks = banks.filter(b => b.COD_STATE == 1);
}

const lines = banks.map(b => {
  const name = b.SHORTNAME || b.FULLNAME || "Unknown";
  const mfo = options.mfo && b.MFO ? `${b.MFO} ` : "";
  return `${mfo}${name}`;
});

if (options.display) {
  console.log(lines.join("\n"));
}

if (options.output) {
  fs.writeFileSync(options.output, lines.join("\n"), "utf8");
}