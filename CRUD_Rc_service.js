const { MongoClient } = require("mongodb");

const faker = require("faker");

const FakerFuntion = () => {
    //* utilizamos var para que sean variables globales
    var arrayN = [];
    var arreglo = [];
    for (let i = 0; i < 100; i++) {
        arreglo = {
            direccion: faker.address.streetAddress(),
            nombres: faker.name.findName(),
            apellidos: faker.name.lastName(),
            telefono: faker.phone.phoneNumber(),
            email: faker.internet.email(),
            contrasena: faker.internet.password(),
        };
        const lol = async (arreglo) => {
            arrayN.push(arreglo);
        };
        lol(arreglo);
    }

    console.log(arrayN);
    async function main() {
        const uri =
            "mongodb+srv://Brandon:1allahuakbar123@cluster0.nsvkq9w.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri);

        try {
            await client.connect();

            //*  Crear Propiedad
            // await crearPropiedadesConValidacion(client, arrayN); //Donde llamo la funcion
            //* Insertar con many
            await InsertarDatosMany(client, arrayN); //Donde llamo la funcion
            // await encontrarPropiedad(client, "Amos Quitzon")
        } finally {
            await client.close();
        }
    }

    main().catch(console.dir);
};
FakerFuntion()


//*-----------------------------------------Validar--------------------------------------
//todo: ---> VALIDAR DATOS
// async function crearPropiedadesConValidacion(client, arregloPropiedades){
//     const result = await client.db("Rcservice").createCollection("proveedores_servicio",{
//         validator:{
    
//                 $jsonSchema: {
//                         bsonType: "object",
//                         required: ["identificacion", "nombres","apellidos","email","telefono","servicio","contraseña"],
//                     //* direccion -- nombres -- apellidos -- telefono -- email -- contraseña
//                     //* identificacion -- nombres -- apellidos -- telefono -- email --Servicio(s) --contraseña
//             properties: {
//                 direccion: {
//                     bsonType: "string",
//                     description: "debe ser una cadena y es obligatorio"
//                 },
//                 nombres: {
//                     bsonType: "string",
//                     description: "debe ser una cadena y es obligatorio"
//                 },
//                 apellidos:{
//                     bsonType: "string",
//                     description: "debe ser una cadena y es obligatorio"

//                 },
//                 telefono:{
//                     bsonType: "string",
//                     description: "debe ser numerico, tipo entero"
//                 },
//                 email:{
//                     bsonType: "string",
//                     pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
//                     description: "debe ser una cadena y es obligatorio"
//                 },
//                 contrasena:{
//                     bsonType:"string"
//                 }
//             }
//         }
//     }

//     });
//     console.log(`Se crearon ${result.insertedCount} nuevas propiedades con los siguientes id(s):`)
//     console.log(result.insertedIds)
// }

// ----------------------------------------------------------------
async function InsertarDatosMany(client, arregloPropiedades) {
    // * InsertMany
    const result = await client
        .db("Rcservice")
        .collection("empleados")
        .insertMany(arregloPropiedades);
    console.log(
        `Se crearon ${result.insertedCount} nuevas propiedades con los siguientes id(s):`
    );
    console.log(result.insertedIds);
}
// *id -- NombreSer -- descripcion -- estado -- trabajadore

// * -------------------------------------------------------------------------------
// *Buscar Find()
async function encontrarPropiedad(client, nombreEmp) {
    const empleado = await client
        .db("RCservice")
        .collection("Empleados")
        .findOne({ nombre: nombreEmp });
    if (empleado) {
        console.log(empleado);
    } else {
        console.log("No se pudo encontrar al empleado");
    }
}

// //Buscar un Proveedor de servicio por su numero de Identificacion
// async function encontrarPropiedad(client, numeroIdentificacion){
//     const Proveedor = await client.db("RCservice").collection("Proveedores de servicio").findOne
//     ({identificacion:numeroIdentificacion})
//     if(Proveedor){
//         console.log(Proveedor)
//     } else{
//         console.log("No se pudo encontrar al proveedor")
//     }
// }

// //Buscar un servicio por su nombre
// async function encontrarPropiedad(client, nombre){
//     const Servicio = await client.db("RCservice").collection("Servicios").findOne
//     ({NombreSer:nombre})
//     if(Servicio){
//         console.log(Servicio)
//     } else{
//         console.log("No se pudo encontrar el servicio")
//     }
// }

// //----------------------------------------------------------------------------------------
// //!UpdateMany
// //! No me acuerdo como hacer el update
// async function actualizarPropiedades(client){
//     const result = await client.db("RCservice").collection("Servicios").updateMany({property_type:{$exists: false}},{$set: {property_type: "Sin definir"}});
//     console.log(`se actualizaron ${result.matchedCount} propiedades`);

// }

// //-----------------------------------------------------------------------
// //Eliminar 1 dato por su nombre
// //!ESTA MELO
// // async function eliminar1dato(client, nombrePropiedad){
// //     const dato = await client.db("sample_airbnb").collection("listingsAndRewiews").deleteOne
// //     ({name:nombrePropiedad})
// //     if(dato){
// //         console.log("El dato se elimino correctamente")
// //     } else{
// //         console.log("La propiedad que desea eliminar no existe")
// //     }
// // }

// //----------------------------------------------------------------------------------------------------------
// //Buscar Muchas Propiedades FIND
// //!Esta MELO
// // async function encontrarPropiedades(client, nroHabitaciones, nroBanos){
// //     const result = await client.db("sample_airbnb").collection("listingsAndReviews").find({
// //         bedrooms:{$gte:nroHabitaciones},
// //         bathrooms:{$gte:nroBanos}
// //     }).limit(5);

// //     const propiedades = await result.toArray();
// //     if(propiedades.length > 0){
// //         // console.log("Mensaje Exito");
// //         propiedades.forEach(propiedad => {
// //             console.log(propiedad.name)
// //         });
// //     }else{
// //         console.log("Mensaje de error")
// //     }
// // }
