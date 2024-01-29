const archives = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "L",
  "M",
  "O",
  "P",
  "Q",
  "R",
];

let UseTypeKnown = new Set();

const readFiles = () => {

  archives.forEach((archive) => {

    fetch(`./ZonasGeoJson/ZONA_${archive}.geojson`).then((response) => {

      response.json().then((zones) => {

        zones.features.forEach((feature) => {

          const name = feature.properties.name || feature.properties.Name;
          if (!UseTypeKnown.has(name)) {

            UseTypeKnown.add(name);
            console.log(UseTypeKnown);
          
          }
        
        });
      
      });
    
    });
  
  });

};

readFiles();