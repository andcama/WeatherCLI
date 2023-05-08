require("dotenv").config();
const {
  leerInput,
  inquirerMenu,
  pausaMenu,
  listarLugares,
} = require("./helpers/inquirer");
const { Busquedas } = require("./models/busquedas");

const main = async () => {
  console.clear();

  const busquedas = new Busquedas();
  let opt = "";

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        const termino = await leerInput("Ciudad: ");
        const lugares = await busquedas.ciudad(termino);
        const id = await listarLugares(lugares);
        if (id === "0") continue;
        const lugarSeleccionado = lugares.find((l) => l.id === id);
        busquedas.agreagarHistorial(lugarSeleccionado.nombre);
        const clima = await busquedas.climaLugar(
          lugarSeleccionado.lat,
          lugarSeleccionado.lng
        );
        console.clear();
        console.log("\nCity information\n".green);
        console.log("City:", lugarSeleccionado.nombre.green);
        console.log("Latitude:", lugarSeleccionado.lat);
        console.log("Longitude:", lugarSeleccionado.lng);
        console.log("Temperature:", clima.temp);
        console.log("Mininum:", clima.min);
        console.log("Maximum:", clima.max);
        console.log("Where is the weather like?:", clima.desc.green);
        break;
      case 2:
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;
    }

    if (opt !== "0") await pausaMenu();
  } while (opt !== "0");
};

main();
