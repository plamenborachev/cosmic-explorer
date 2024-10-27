import Planet from "../models/Planets.js";

const getAll = (filter = {}) => {
    let planetsQuery = Planet.find();

    // if (filter.search) {
    //     recipesQuery.find({ title: { $regex: filter.search, $options: 'i' } });
    //     // moviesQuery.regex('title', new RegExp(filter.name, 'i'))
    // }

    // if (filter.typeVolcano) {
    //     recipesQuery.find({ typeVolcano: filter.typeVolcano });
        // moviesQuery.where('genre').equals(filter.genre.toLowerCase())
    // }

    // if (filter.year) {
    //     volcanoesQuery.find({ year: filter.year });
    //     // moviesQuery.where('year').equals(filter.year);
    // }

    return planetsQuery;
};

// const getTopThree = () => Recipe.find().sort({createdAt: -1}).limit(3);

// const getDevicesCreatedByUser = (ownerId) => Device.find({owner: ownerId});

// const getDevicesPreferredByUser = (userId) => Device.find({ preferredList: userId});

const create = (planet, ownerId) => Planet.create({ ...planet, owner: ownerId });

const getOne = (planetId) => Planet.findById(planetId).populate('likedList');

const like = (planetId, userId) => {
    return Planet.findByIdAndUpdate(planetId, { $push: { likedList: userId } });
};

const remove = (planetId) => Planet.findByIdAndDelete(planetId);

// const edit = (recipeId, data) => Recipe.findByIdAndUpdate(recipeId, data, {runValidators: true});

export default {
    getAll,
    // getTopThree,
    // getDevicesCreatedByUser,
    // getDevicesPreferredByUser,
    create,
    getOne,
    like,
    remove,
    // edit,
}