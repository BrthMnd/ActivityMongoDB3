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
    return arrayN;
};

module.exports = FakerFuntion;
