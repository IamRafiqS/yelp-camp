const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '6810abc56d4e50680db69832',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis odio nisi provident sint officiis nam, vitae tempore autem enim rerum natus ipsa facere explicabo eius sequi! Dolorem fuga architecto blanditiis!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images : [
                {
                  url: 'https://res.cloudinary.com/dyv6rwyhy/image/upload/v1746866571/YelpCamp/ylsanmydtduwteqcnhzy.png',
                  filename: 'YelpCamp/ylsanmydtduwteqcnhzy',
                },
                {
                  url: 'https://res.cloudinary.com/dyv6rwyhy/image/upload/v1746866574/YelpCamp/bltd3sym4uhf9xoqzbwu.png',
                  filename: 'YelpCamp/bltd3sym4uhf9xoqzbwu',
                },
                {
                  url: 'https://res.cloudinary.com/dyv6rwyhy/image/upload/v1746866574/YelpCamp/oz5z3tkbrnbqym5s07hs.png',
                  filename: 'YelpCamp/oz5z3tkbrnbqym5s07hs',

                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})