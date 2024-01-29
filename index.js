const fs = require('fs').promises;
const ExcelJS = require('exceljs');

const workbook = new ExcelJS.Workbook();
const landUses = workbook.addWorksheet('Tipos de uso de solo');

const COLUMN_KEYS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M', 'O', 'P', 'Q', 'R',
];

const TYPE_KEYS = [
  'residencial', 'espaçosPublicos', 'areasVerdes', 'usoMisto', 'comercial',
  'institucional', 'industrial', 'religioso', 'serviços', 'comércioEServiços',
];

landUses.columns = [
  { header: '', key: 'type' },
  ...COLUMN_KEYS.map((key) => ({ header: `Zona ${key}`, key: `zona${key}` })),
];

async function readAndParseFile(path) {
  try {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erro ao ler o arquivo ${path}: ${error}`);
  }
}

async function readFiles() {
  for (let key of TYPE_KEYS) {
    let row = { type: key };
    for (let archive of COLUMN_KEYS) {
      const types = await readAndParseFile(`./Zonas/contadores${archive}.json`);
      if (types) {
        row[`zona${archive}`] = types[key];
      }
    }
    landUses.addRow(row);
  }
  await workbook.xlsx.writeFile('test.xlsx');
  console.log('Os dados foram escritos no arquivo test.xlsx');
}

readFiles();
