const { Command } = require("commander");
const fs = require("fs");

const program = new Command();

program
  .requiredOption("-i, --input <file>")
  .option("-o, --output <file>")
  .option("-d, --display")
  .option("-m, --mfo")
  .option("-n, --normal");

program.parse(process.argv);
const options = program.opts();


if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
} // Перевірка файлу

const data = JSON.parse(fs.readFileSync(options.input, "utf8"));
let banks = Array.isArray(data) ? data : [data];


if (options.normal) {
  banks = banks.filter(b => b.COD_STATE === "1");
} // Фільтр по COD_STATE

const lines = banks.map(b => {
  const name = b.SHORTNAME || b.FULLNAME || "Unknown";
  const mfo = options.mfo && b.MFO ? `${b.MFO} ` : "";
  return `${mfo}${name}`;
});

if (options.display) lines.forEach(line => console.log(line)); 

if (options.output) fs.writeFileSync(options.output, lines.join("\n"), "utf8"); //запис