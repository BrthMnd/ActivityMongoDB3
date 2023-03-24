const {MongoClient} = require('mongodb');

const faker = require('faker');


let arrayN =[]
let arreglo = []
for (let i = 0; i < 100; i++) {
    arreglo = {
        direccion: faker.address.streetAddress(),
        nombre: faker.name.findName(),
        apellido: faker.name.lastName(),
        telefono: parseInt(faker.phone.phoneNumber()),
        email: faker.internet.email(),
        contrasena: faker.internet.password()
    };
    const lol = async(arreglo) =>{ 
        
        arrayN.push(arreglo)
        
    }
    lol(arreglo)
    
    
}

console.log(arrayN)
async function main(){
    
    const uri = "mongodb+srv://cris:1234@cluster0.g6uloko.mongodb.net/?retryWrites=true&w=majority"
    const client = new MongoClient(uri);

    
    try{
        await client.connect();

        // await client.haceAlgo();
        // await client.db("admin").command({ping:1}); 
        // console.log("La conexion fue exitosa");
        await crearPropiedades(client, arrayN) //Donde llamo la funcion
        // await encontrarPropiedad(client, "Amos Quitzon")      


    }finally{
        await client.close(); 
    }

}


main().catch(console.dir);

//-----------------------------------------Validar--------------------------------------
//todo: ---> VALIDAR DATOS
// async function crearPropiedades(client, arregloPropiedades){
//     const result = await client.db("RCservice").createCollection("empleados",{
//         validator:{

//             $jsonSchema: {
//                 bsonType: "object",
//                 required: ["direccion", "nombres","apellidos","telefono","email","contrasena"],
//             // direccion -- nombres -- apellidos -- telefono -- email -- contraseña
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
//                     bsonType: "int",
//                     pattern: "^\\+?[0-9]{2,20}$",
//                     description: "debe ser numerico, tipo entero o booleano"
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

// Propiedades que va a tener el empleado
// Propiedades que va a tener el Proveedor
// identificacion -- nombres -- apellidos -- telefono -- email --Servicio(s) --contraseña


// //Insertar 100 documentos en la coleccion de servicios
async function crearPropiedades(client, arregloPropiedades){
    const result = await client.db("RCservice").collection("empleados").insertMany(arregloPropiedades);
    console.log(`Se crearon ${result.insertedCount} nuevas propiedades con los siguientes id(s):`)
    console.log(result.insertedIds)
}
// //Propiedades que va a tener los servicios 
// //id -- NombreSer -- descripcion -- estado -- trabajadore 

                                                                                          
// //-----------------------------------------------------------------------
// //!Buscar Find()
// //Buscar un Empleado por su numero nombre 
async function encontrarPropiedad(client, nombreEmp){
    const empleado = await client.db("RCservice").collection("Empleados").findOne
    ({nombre:nombreEmp})
    if(empleado){
        console.log(empleado)
    } else{
        console.log("No se pudo encontrar al empleado")
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






