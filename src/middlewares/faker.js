const faker = require("faker");


const FakerFuntion = () => {
    //* utilizamos var para que sean variables globales
    var arrayN = [];
    var arreglo = [];
    for (let i = 0; i < 100; i++) {
        //! arreglo para servicios
        // arreglo = {
        //     "tipo": faker.random.arrayElement(['electricidad', 'Plomería', 'Pintor']),
        //     "estado": faker.datatype.boolean(),
        //     "clase": faker.random.arrayElement(['clase1', 'clase2', 'clase3']),
        //     "grupo": faker.random.arrayElement(['grupo1', 'grupo2', 'grupo3']),
        //     "numero": parseInt(faker.datatype.number({ min: 100000000, max: 999999999 }))
        // };
        // ! Arreglo para empleado y cliente
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

    // console.log(arrayN);
    return arrayN;
};

module.exports = FakerFuntion;
