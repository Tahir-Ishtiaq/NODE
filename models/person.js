// Importing Mongoose to interact with the MongoDB database
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
// Defining a schema for the 'Person' collection
// A schema defines the structure of the documents stored in the database
const personSchema = new mongoose.Schema({
    // The 'name' field is a required string
    name: {
        type: String,
        required: true, // This field must be provided
    },
    // The 'age' field is an optional number
    age: {
        type: Number,
    },
    // The 'work' field is a required string with specific allowed values
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'], // Only these values are allowed
        required: true, // This field must be provided
    },
    // The 'mobile' field is a required string that must be unique
    mobile: {
        type: String,
        required: true, // This field must be provided
        unique: true, // This ensures no two people can have the same mobile number
    },
    // The 'email' field is a required string that must be unique
    email: {
        type: String,
        required: true, // This field must be provided
        unique: true, // This ensures no two people can have the same email
    },
    // The 'address' field is an optional number (e.g., house or flat number)
    address: {
        type: Number,
    },
    // The 'salary' field is a required number
    salary: {
        type: Number,
        required: true, // This field must be provided
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
});

personSchema.pre('save', async function(next){
    const person =this;

    if(!person.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err)
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

// Creating a Mongoose model named 'Person'
// This connects the schema to the MongoDB 'Person' collection
const Person = mongoose.model('Person', personSchema);

// Exporting the model so it can be used in other files
module.exports = Person;
