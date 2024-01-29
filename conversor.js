const fs = require('fs');

const archives = [
  'A',
  'B',
  'C', 
  'D', 
  'E', 
  'F', 
  'G', 
  'H', 
  'I', 
  'J', 
  'L', 
  'M', 
  'O', 
  'P', 
  'Q', 
  'R',
];

const categories = {
  'RESIDENCIAL': 'residencial',
  'RESODENCIAL': 'residencial',
  'Residencial': 'residencial',
  'RESDIDENCIAL': 'residencial',
  'RESEIDENCIAL': 'residencial',
  'Resindencial': 'residencial',
  'ESPAÇO PÚBLICO': 'espacosPublicos',
  'Espaços Públicos': 'espacosPublicos',
  'ESPAÇOS PÚBLICOS': 'espacosPublicos',
  'Espaços públicos': 'espacosPublicos',
  'ESPAÇOSPÚBLICOS': 'espacosPublicos',
  'Institucional': 'institucional',
  'INSTITUCIONAL': 'institucional',
  'ÁREAS VERDES': 'areasVerdes',
  'AREA VERDE': 'areasVerdes',
  'ÁREA VERDE': 'areasVerdes',
  'ÁREAS VERDES 2': 'areasVerdes',
  'Misto': 'usoMisto',
  'MISTO': 'usoMisto',
  'Uso Misto': 'usoMisto',
  'Uso misto': 'usoMisto',
  'USO MISTO': 'usoMisto',
  'COMERCIAL': 'comercial',
  'Comercial': 'comercial',
  'INDUSTRIAL': 'industrial',
  'Industrial': 'industrial',
  'RELIGIOSO': 'religioso',
  'SERVIÇOS': 'servicos',
  'SERVIÇO': 'servicos',
  'Serviços': 'servicos',
  'Serviço': 'servicos',
  'Comércio e serviços': 'comercioEServicos',
  'Comércio e Serviços': 'comercioEServicos',
};

function readFile() {
  archives.forEach((archive) => {

    fs.readFile(`./ZonasGeoJson/ZONA_${archive}.geojson`, 'utf-8', (error, data) => {
      
      if (error) {
        console.error(`Erro ao ler o arquivo ./ZONA_${archive}.geojson: ${error}`);
        return;
      }

      if (!data) {
        console.log(`O arquivo ./ZonasGeoJson/ZONA_${archive}.geojson está vazio.`);
        return;
      }

      const zone = JSON.parse(data);
      console.log('zona', archive);

      const contadores = {
        residencial: 0,
        espacosPublicos: 0,
        areasVerdes: 0,
        usoMisto: 0,
        comercial: 0,
        institucional: 0,
        industrial: 0,
        religioso: 0,
        servicos: 0,
        comercioEServicos: 0,
      };

      zone.features.forEach((feature) => {

        const name = feature.properties.name || feature.properties.Name;
        checkNames(name, contadores);
      
      });

      fs.writeFile(
        `contadores${archive}.json`,
        JSON.stringify(contadores),
        (err) => {
          if (err) throw err;
          console.log('Os dados foram escritos no arquivo contadores.json');
        }
      );
    
    });
 
  });
}

function checkNames(name, contadores) {
  const category = categories[name.toUpperCase()];

  if (category) {

    contadores[category]++;
 
  }
}

readFile();
