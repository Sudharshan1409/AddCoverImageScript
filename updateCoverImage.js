const { listAnimals, listEvents, updateAnimal } = require('./graphql');

client = require('./client');
getAnimal = require('./graphql').getAnimal;

console.log(client);

const getEvents = async (animal_id) => {
    
}
let count = 1;
const parse_animal_info = async (animals) => {
    for(const animal of animals) {
        console.log(`count: ${count++}/${animals.length}`)
        if(!animal.cover_image_media_id) {
            let events = await client
                .query({
                    query: listEvents,
                    variables: {
                        animal_id: animal.id,
                    },
                })
                .then(async (res) => {
                    // console.log('then')
                    return res.data.listEvents.Events
                })
                .catch((error) => {
                    console.log('catch')
                    console.log(error)
                })
            for(const event of events) {
                if(event.media) {
                    animal.cover_image_media_id = event.media[0].media_id;
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
                    break;
                }
            }
        }
        else {

        }
    }
    // console.log(Object.keys(animals))
}

const script = async () => {
    await client
    .query({
        query: listAnimals,
    })
    .then(async (res) => {
        console.log('then')
        // console.log("get animal response:", JSON.stringify(res.data.listAnimals));
        parse_animal_info(res.data.listAnimals.Animals);
    })
    .catch((error) => {
        console.log('catch')
        console.log("Error getting animal details", error)
        throw new Error("Error getting animal details")
    });
}

script()