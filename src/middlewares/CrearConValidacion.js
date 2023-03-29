
const crearPropiedadesConValidacion = async (client) => {
    const result = await client.db("Rcservice").createCollection("servicio", {
        validator: {

            $jsonSchema: {
                bsonType: "object",
                required: ["tipo", "estado", "clase", "grupo", "numero"],
                // required: ["direccion", "nombres", "apellidos", "telefono", "email", "contrasena"],

                properties: {
                    tipo: {
                        bsonType: "string",
                        description: "debe ser una cadena y es obligatorio"
                    },
                    estado: {
                        bsonType: "bool",
                        description: "debe ser un valor booleano"
                    },
                    clase: {
                        bsonType: "string",
                        description: "debe ser una cadena y es obligatorio"

                    },
                    grupo: {
                        bsonType: "string",
                        description: "debe ser cadena"
                    },
                    numero: {
                        bsonType: "int",
                        description: "debe ser numerico, tipo entero y tener una longitud de 10 caracteres",
                        pattern: "^[0-9]{10}$"
                    },
                }
            }
        }

    });
    // console.log(`Se crearon ${result.insertedCount} nuevas propiedades con los siguientes id(s):`)
    console.log("creado con exito")
}

module.exports = crearPropiedadesConValidacion



// ! propiedades de empleados y clientes:
// properties: {
//     direccion: {
//         bsonType: "string",
//         description: "debe ser una cadena y es obligatorio"
//     },
//     nombres: {
//         bsonType: "string",
//         description: "debe ser una cadena y es obligatorio"
//     },
//     apellidos: {
//         bsonType: "string",
//         description: "debe ser una cadena y es obligatorio"

//     },
//     telefono: {
//         bsonType: "string",
//         description: "debe ser numerico, tipo entero"
//     },
//     email: {
//         bsonType: "string",
//         pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
//         description: "debe ser una cadena y es obligatorio"
//     },
//     contrasena: {
//         bsonType: "string"
//     },