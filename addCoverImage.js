const { listAnimals, listEvents, updateAnimal, getAnimal } = require('./graphql');

client = require('./client');

console.log(client);

const getEvents = async (animal_id) => {
    
}
let count = 1;
const parse_animal_info = async (animal) => {
    // console.log(`count: ${count++}/${animals.length}`)
    if(!animal.cover_image_media_id) {
        animal.cover_image_media_id = "763ff7f5-662c-11eb-9282-790497203095";
        console.log('before:', animal);
        delete animal.__typename
        for(const key of Object.keys(animal)) {
            if(animal[key] === null || animal[key] === undefined) {
                delete animal[key]
            }
            else {
                if (key == 'additional_colors' || key == 'other_ids') {
                    for(const item of animal[key]) {
                        delete item.__typename
                    }
                }
            }
        }
        console.log('after:', animal);
        await client
        .mutate({
            mutation: updateAnimal,
            variables: {
                ...animal
            },
        })
        .then(async (res) => {
            console.log("final response", JSON.stringify(res))
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

const script = async () => {
    await client
    .query({
        query: getAnimal,
        variables: {
            id: "fc340d67-6f7f-11eb-bafd-35ef4299cd5a"
        }
    })
    .then(async (res) => {
        console.log('then')
        // console.log("get animal response:", JSON.stringify(res.data.listAnimals));
        parse_animal_info(res.data.getAnimal);
        // console.log(res.data.getAnimal)
    })
    .catch((error) => {
        console.log('catch')
        console.log("Error getting animal details", error)
        throw new Error("Error getting animal details")
    });
}

script()