const { MongoClient } = require('mongodb')
const FakerFuntion = require("./middlewares/faker");
const CrearValidacion = require("./middlewares/CrearConValidacion");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// FakerFuntion();

// * MAIN 
const Input = async () => {


}
Input()
const main = async () => {

    const uri = "mongodb+srv://Brandon:1allahuakbar123@cluster0.nsvkq9w.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
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
        // await rl.question('Opcion 1: Buscar a todos los Carrie Mayert. Opcion 2: Buscar todos los datos -> ', (option) => {

        //     BusquedaGeneral(client, option)
        //     rl.close();
        // });
        // * Busqueda especifica -> findOne
        // await rl.question('Ingrese Nombre de la base de datos -> ', (option) => {

        //     BusquedaEspesifica(client, option)
        //     rl.close();
        // });
        //*  Crear Propiedad con validacion:
        // await crearPropiedadesConValidacion(client);
        // * insertar con One
        // await InsertarDatosOne(client, datosArray);
        //* Insertar con many
        // await InsertarDatosMany(client, arrayN);

        // await FindOneDeDatos(client, "Amos Quitzon")
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}
main();

// * Busqueda General -> FIND
const BusquedaGeneral = async (client, option) => {
    await client.connect();
    option = parseInt(option)

    if (option == 1) {

        console.log('Busqueda General')
        const result = await client
            .db("Rcservice")
            .collection("empleados")
            .find({ nombres: "Carrie Mayert" }).toArray();
        console.log(result)
    } else if (option == 2) {
        const result = await client
            .db("Rcservice")
            .collection("empleados")
            .find({}).toArray();
        console.log(result)

    } else {
        console.log(error);
    }



    // console.log("Opcion no valida")
    // console.log("datos encontrados :" + result.insertedCount)


}

// * Busqueda Espesifica -> ONE 
const BusquedaEspesifica = async (client, name) => {
    await client.connect();

    const result = await client
        .db("Rcservice")
        .collection("empleados")
        .find({ nombres: name }).toArray();
    console.log(result)
};
// * Insertando datos -> Many
const InsertarDatosOne = async (client, Datos) => {
    // * InsertMany
    const result = await client
        .db("Rcservice")
        .collection("empleados")
        .insertOne(Datos);
    console.log(
        `Se crearon ${result.insertedCount} nuevas propiedades con los siguientes id(s):`
    );
    console.log(result.insertedIds);
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

// * Buscando Datos -> ONE

// *Borrando datos -> One
async function deleteRandomDocuments() {
    try {
        await client.connect();
        const database = client.db("nombre_de_la_db");
        const collection = database.collection("nombre_de_la_coleccion");
        const filtro = {
            /* Objeto con el filtro a aplicar */
        };
        const documentos = await collection
            .aggregate([{ $sample: { size: 100 } }])
            .toArray();
        for (const documento of documentos) {
            await collection.deleteOne({ _id: documento._id });
        }
        console.log(`Se han eliminado ${documentos.length} documentos`);
    } finally {
        await client.close();
    }
}



// * Actualizar dato -> Many
async function actualizarPropiedades(client) {
    const result = await client.db("RCservice").collection("Servicios").updateMany({ property_type: { $exists: false } }, { $set: { property_type: "Sin definir" } });
    console.log(`se actualizaron ${result.matchedCount} propiedades`);

}

// * Eliminar dato -> ONE
async function eliminar1dato(client, nombrePropiedad) {
    const dato = await client.db("sample_airbnb").collection("listingsAndRewiews").deleteOne
        ({ name: nombrePropiedad })
    if (dato) {
        console.log("El dato se elimino correctamente")
    } else {
        console.log("La propiedad que desea eliminar no existe")
    }
}
// * Buscar varios datos -> FIND
async function encontrarPropiedades(client, nroHabitaciones, nroBanos) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").find({
        bedrooms: { $gte: nroHabitaciones },
        bathrooms: { $gte: nroBanos }
    }).limit(5);

    const propiedades = await result.toArray();
    if (propiedades.length > 0) {
        // console.log("Mensaje Exito");
        propiedades.forEach(propiedad => {
            console.log(propiedad.name)
        });
    } else {
        console.log("Mensaje de error")
    }
}
