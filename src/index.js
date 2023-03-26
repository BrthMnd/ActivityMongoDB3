const { MongoClient } = require('mongodb')
const FakerFuntion = require("./middlewares/faker");
const CrearValidacion = require("./middlewares/CrearConValidacion");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const FakerDatos = FakerFuntion();

// * MAIN 

const main = async () => {

    const uri = "mongodb+srv://Brandon:1allahuakbar123@cluster0.nsvkq9w.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    // *** DatosArray para no tener que repetir codigo ***
    let datosArray = {
        "direccion": 'Carrera 24 A-50',
        "nombres": 'Vetulio',
        "apellidos": 'Alcaheda',
        "telefono": '300 476 2696',
        "email": 'elgranvetulio8@hotmail.com',
        "contrasena": 'contrasena123'
    }
    try {
        await client.connect();

        // *Busqueda General. -> find
        await rl.question('Opcion 1: Buscar a todos los Vetulios. Opcion 2: Buscar todos los datos -> ', (option) => {

            BusquedaGeneral(client, option)
            rl.close();
        });
        // * Busqueda especifica -> findOne
        // await rl.question('Ingrese Nombre de la base de datos -> ', (option) => {

        //     BusquedaEspesifica(client, option)
        //     rl.close();
        // });
        //*  Crear Propiedad con validacion:
        // await crearPropiedadesConValidacion(client);
        // * insertar -> One
        // await InsertarDatosOne(client, datosArray);
        //* Insertar con many
        // await InsertarDatosMany(client, FakerDatos);
        //* borrarAleatorios -> One
        // await BorrarElemntosAleatorios(client)
        //* BorrarUnElemento -> One
        // await BorrarElemntosUnElemento(client, "Vetulio")

        // await FindOneDeDatos(client, "Amos Quitzon")
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}
main();

// * Busqueda Espesifica -> ONE 
const BusquedaEspesifica = async (client, name) => {
    try {
        await client.connect();

        const result = await client
            .db("Rcservice")
            .collection("empleados")
            .find({ nombres: name }).toArray();
        console.log(result)

    } finally {
        await client.close();

    }
};

// * Busqueda General -> FIND
const BusquedaGeneral = async (client, option) => {
    try {

        await client.connect();
        option = parseInt(option)

        if (option == 1) {

            console.log('Busqueda General')
            const result = await client
                .db("Rcservice")
                .collection("empleados")
                .find({ nombres: "Vetulio" }).toArray();
            console.log(result)
            console.log("vetulios encontrados:" + result.length)
        } else if (option == 2) {
            const result = await client
                .db("Rcservice")
                .collection("empleados")
                .find({}).toArray();
            console.log(result)

        } else {
            console.log(error);
        }
    } finally {
        await client.close();
    }



    // console.log("Opcion no valida")
    // console.log("datos encontrados :" + result.insertedCount)


}


// * Insertando datos -> One
const InsertarDatosOne = async (client, Datos) => {
    const result = await client
        .db("Rcservice")
        .collection("empleados")
        .insertOne(Datos);
    console.log(
        `Se crearon ${result.insertedCount} nuevas propiedades con los siguientes id(s):`
    );
    console.log(Datos);
    console.log(result);
};
const InsertarDatosMany = async (client, arregloPropiedades) => {
    // * InsertMany
    const result = await client
        .db("Rcservice")
        .collection("empleados")
        .insertMany(arregloPropiedades);
    console.log(
        `Se crearon ${result.insertedCount} nuevas propiedades con los siguientes id(s):`
    );
    console.log(result.insertedIds);
};

// * Borrando datos -> One
const BorrarElemntosAleatorios = async (client) => {

    const collection = await client.db("Rcservice").collection("empleados")
    const result = await collection.aggregate([{ $sample: { size: 100 } }]).toArray();
    let i = 1

    for (let documento of result) {
        console.log(i)
        await collection.deleteOne({ _id: documento._id });
        i++;
    }
    console.log(`Se han eliminado ${result.length} documentos`);


}




// * Eliminar dato -> ONE
async function BorrarElemntosUnElemento(client, nombrePropiedad) {
    const dato = await client.db("Rcservice").collection("empleados").deleteOne
        ({ nombres: nombrePropiedad })
    if (dato) {
        console.log("El dato se elimino correctamente")
    } else {
        console.log("La propiedad que desea eliminar no existe")
    }
}

// * Actualizar dato -> Many
async function actualizarPropiedades(client) {
    const result = await client.db("RCservice").collection("Servicios").updateMany({ property_type: { $exists: false } }, { $set: { property_type: "Sin definir" } });
    console.log(`se actualizaron ${result.matchedCount} propiedades`);

}