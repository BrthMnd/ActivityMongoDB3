const { MongoClient } = require('mongodb')
const FakerFuntion = require("./middlewares/faker");
const CrearValidacion = require("./middlewares/CrearConValidacion");
const readline = require('readline');
const { pipeline } = require('stream');

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
    // ! para servicio
    let datosArray = {
        "tipo": 'Camaras de seguridad',
        "estado": true,
        "clase": 'lksj2',
        "grupo": 'asd',
        "numero": 1234567891,
        "trabajos": {
            "trabajo1": true,
            "trabajo2": true,
            "trabajo3": true,
        }
    }
    // ! para proveedor y cliente
    // let datosArray = {
    //     "direccion": 'Carrera 24 A-50',
    //     "nombres": 'Dufelsmit',
    //     "apellidos": 'Alcaheda',
    //     "telefono": '300 476 2696',
    //     "email": 'elgranvetulio8@hotmail.com',
    //     "contrasena": 'contrasena123',
    //     "tipo_servicio": "Albanil",

    // }
    try {
        await client.connect();

        //*  Crear Propiedad con validacion:
        // await CrearValidacion(client);
        // *Busqueda General. -> find
        // await rl.question('Opcion 1: Buscar a todos los Vetulios. Opcion 2: Buscar todos los datos -> ', (option) => {
        //     BusquedaGeneral(client, option)
        //     rl.close();
        // });
        // * Busqueda especifica -> findOne
        // await rl.question('Ingrese Nombre -> ', (option) => {

        //     BusquedaEspesifica(client, option)
        //     rl.close();
        // });

        // * insertar -> One
        await InsertarDatosOne(client, datosArray);
        //* Insertar con many
        // await InsertarDatosMany(client, FakerDatos);

        // *Update One con y sin upsert
        // await UpdateOneSinUpsert(client)
        // await UpdateOneConUpsert(client)
        //*Update Many con y sin upsert
        // await UpdateManySinUpsert(client)
        // await UpdateManyConUpsert(client)

        //* borrarAleatorios -> One
        // await BorrarElemntosAleatorios(client)

        //* BorrarUnElemento -> One
        // await DeleteOne(client, "Vetulio")
        //* BorrarVariosElementos -> Many
        // await DeleteMany(client, "electricista")

        //*  Borrar Collection
        // await borrarCollection(client)
        //* Borrar Databases
        // await borrarDatabases(client)

        //* Looks up -> 1
        // await LooksUp(client)
        //*Finally
        //* Pipelines -> Sort, Unwind, Limit 
        // await Pipelines(client)

        // !fin
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
            console.log("encontrados:" + result.length)
        } else if (option == 2) {
            const result = await client
                .db("Rcservice")
                .collection("empleados")
                .find({}).limit(10).toArray(); // Quitar limit 10
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
        .collection("servicio")
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
        .collection("proveedores_servicio")
        .insertMany(arregloPropiedades);
    console.log(
        `Se crearon ${result.insertedCount} nuevas propiedades con los siguientes id(s):`
    );
    console.log(result.insertedIds);
};

// * Actualizar dato -> One sin upsert
const UpdateOneSinUpsert = async (client) => {
    const result = await client.db("Rcservice").collection("empleados").updateOne(
        { nombres: "Vetulio" },
        { $set: { contrasena: "123123123" } }
    );
    console.log(`se actualizaron ${result.matchedCount} propiedades`);
}

// * Actualizar dato -> One con upsert
const UpdateOneConUpsert = async (client) => {
    // ! upsert
    const upsert = { upsert: true }
    const result = await client.db("Rcservice").collection("empleados").updateOne(
        { nombres: "Vetulio" },
        { $set: { contrasena: "5555555" } },
        upsert
    );
    console.log(`se actualizaron ${result.matchedCount} propiedades`);
}
// *Actulaizar dato -> One sin upsert
const UpdateManySinUpsert = async (client) => {
    const result = await client.db("Rcservice").collection("empleados").updateMany(
        { nombres: "Vetulio" },
        { $set: { contrasena: "123123123" } }
    );
    console.log(`se actualizaron ${result.matchedCount} propiedades`);
}

// *Actulaizar dato -> One Con upsert
const UpdateManyConUpsert = async (client) => {
    // ! upsert
    const upsert = { upsert: true }
    const result = await client.db("Rcservice").collection("empleados").updateMany(
        { nombres: "Vetulio" },
        { $set: { contrasena: "5555555" } },
        upsert
    );
    console.log(`se actualizaron ${result.matchedCount} propiedades`);
}


// * Eliminar dato -> ONE
const DeleteOne = async (client, nombrePropiedad) => {
    const dato = await client.db("Rcservice").collection("servicios").deleteOne
        ({ tipo: "Albanil" })
    if (dato) {
        console.log("El dato se elimino correctamente")
    } else {
        console.log("La propiedad que desea eliminar no existe")
    }
}
// * Eliminar dato -> Many
const DeleteMany = async (client, nombrePropiedad) => {
    const dato = await client.db("Rcservice").collection("proveedores_servicio").deleteMany
        ({ tipo_servicio: nombrePropiedad })
    if (dato) {
        console.log("El dato se elimino correctamente")
    } else {
        console.log("La propiedad que desea eliminar no existe")
    }
}

//* borrar Collection Drop - drop collection
const borrarCollection = async (client) => {
    const result = await client.db("Rcservice").collection("servicio").drop()
    if (result) {
        console.log("Se ha borrado la colección")
    } else {
        console.log("No se ha borrado la colección")
    }
}
//* Borrar Databases -> nota: no me deja ya que dice que necesito permisos
const borrarDatabases = async (client) => {
    const result = await client.db("Hospital").dropDatabase()
    if (result) {
        console.log("Se ha borrado la base de datos")
    } else {
        console.log("No se ha borrado la base de datos")
    }
}
//* Look ups 

const LooksUp = async (client) => {
    try {
        await client.connect();
        const database = client.db('Rcservice');
        const collection = database.collection('proveedores_servicio');

        const pipeline = [
            {
                $lookup: {
                    from: 'servicio',
                    localField: 'tipo_servicio',
                    foreignField: 'tipo',
                    as: 'Servicio'
                }
            }
        ];

        const results = await collection.aggregate(pipeline).toArray();

        for (let i = 0; i < results.length; i++) {
            if (results[i].Servicio != "") {
                console.log(results[i])
            }
        }
    } finally {
        await client.close();
    }
}
const Pipelines = async (client) => {

    try {
        await client.connect();
        const servicio = await client.db("Rcservice").collection("servicio");
        await servicio.aggregate([
            { $sort: { "numero": -1 } },
            { $limit: 10 },
            { $unwind: "$trabajo1" }
        ]).toArray()
        console.log("Agregao menol")

    } finally {
        await client.close();
    }
}
// todo: <------Extra--------> 
// * Borrando numero x de elementos -> One
const BorrarElemntosAleatorios = async (client) => {

    const collection = await client.db("Rcservice").collection("proveedor_servicio")
    const result = await collection.aggregate([{ $sample: { size: 10 } }]).toArray();
    let i = 1

    for (let documento of result) {
        console.log(i)
        await collection.deleteOne({ _id: documento._id });
        i++;
    }
    console.log(`Se han eliminado ${result.length} documentos`);


}