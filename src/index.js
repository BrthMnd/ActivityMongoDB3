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

        //*  Crear Propiedad con validacion:
        // await CrearValidacion(client);
        // *Busqueda General. -> find
        // await rl.question('Opcion 1: Buscar a todos los Vetulios. Opcion 2: Buscar todos los datos -> ', (option) => {
        //     BusquedaGeneral(client, option)
        //     rl.close();
        // });
        // * Busqueda especifica -> findOne
        // await rl.question('Ingrese Nombre de la base de datos -> ', (option) => {

        //     BusquedaEspesifica(client, option)
        //     rl.close();
        // });

        // * insertar -> One
        // await InsertarDatosOne(client, datosArray);
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
        // await DeleteMany(client, "Vetulio")

        //*  Borrar Collection
        // await borrarCollection(client)
        //* Borrar Databases
        // await borrarDatabases(client)
        //* Looks up -> 1
        await LooksUp(client)
        //*Finally
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
        .collection("cliente")
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
    const dato = await client.db("Rcservice").collection("empleados").deleteOne
        ({ nombres: nombrePropiedad })
    if (dato) {
        console.log("El dato se elimino correctamente")
    } else {
        console.log("La propiedad que desea eliminar no existe")
    }
}
// * Eliminar dato -> Many
const DeleteMany = async (client, nombrePropiedad) => {
    const dato = await client.db("Rcservice").collection("empleados").deleteMany
        ({ nombres: nombrePropiedad })
    if (dato) {
        console.log("El dato se elimino correctamente")
    } else {
        console.log("La propiedad que desea eliminar no existe")
    }
}

//* borrar Collection Drop - drop collection
const borrarCollection = async (client) => {
    const result = await client.db("Rcservice").collection("proveedores_servicio").drop()
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
    await client.connect();
    const collection1 = await client.db("Rcservice").collection("empleados")
    // const collection2 = await client.db("Rcservice").collection("proveedores_servicio")
    // const collection3 = await client.db("Rcservice").collection("cliente")
    collection1.aggregate([
        {
            $lookup: {
                from: client.db("Rcservice").collection('proveedores_servicio'),
                localField: 'id',
                foreignField: 'id',
                as: 'join1'
            }
        },
        {
            $lookup: {
                from: client.db("Rcservice").collection('cliente'),
                localField: 'id',
                foreignField: 'id',
                as: 'join2'
            }
        }
    ], (err, result) => {
        if (err) throw err;
        console.log(result);
        client.close()
    });

}
// todo: <------Extra--------> 
// * Borrando numero x de elementos -> One
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