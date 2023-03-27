
const crearPropiedadesConValidacion = async (client) => {
    const result = await client.db("Rcservice").createCollection("cliente", {
        validator: {

            $jsonSchema: {
                bsonType: "object",
                // required: ["identificacion", "nombres","apellidos","email","telefono","servicio","contrasena"],
                required: ["direccion", "nombres", "apellidos", "telefono", "email", "contrasena"],
                //* direccion -- nombres -- apellidos -- telefono -- email -- contraseña
                //* identificacion -- nombres -- apellidos -- telefono -- email --Servicio(s) --contraseña
                properties: {
                    direccion: {
                        bsonType: "string",
                        description: "debe ser una cadena y es obligatorio"
                    },
                    nombres: {
                        bsonType: "string",
                        description: "debe ser una cadena y es obligatorio"
                    },
                    apellidos: {
                        bsonType: "string",
                        description: "debe ser una cadena y es obligatorio"

                    },
                    telefono: {
                        bsonType: "string",
                        description: "debe ser numerico, tipo entero"
                    },
                    email: {
                        bsonType: "string",
                        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                        description: "debe ser una cadena y es obligatorio"
                    },
                    contrasena: {
                        bsonType: "string"
                    }
                }
            }
        }

    });
    // console.log(`Se crearon ${result.insertedCount} nuevas propiedades con los siguientes id(s):`)
    console.log("creado con exito")
}

module.exports = crearPropiedadesConValidacion