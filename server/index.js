const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db")

//middleware
app.use(cors());
app.use(express.json());

//routes

//create profile
app.post("/profile", async(req, res) => {
    try {
        const {name, image, age, private} = req.body;
        let queryCreateProfile = `INSERT INTO profiles (name, image, age, private) VALUES ('${name}', '${image}', ${age}, ${private}) RETURNING *`
        const newProfile = await pool.query(queryCreateProfile);
        res.json(newProfile.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

//get all profiles
app.get("/profiles", async(req, res) => {
    try {
        const profiles = await pool.query("SELECT * FROM profiles");
        res.json(profiles.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//get profile
app.get("/profile/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const profile = await pool.query(`SELECT * FROM profiles WHERE profile_id = ${id}`);
        res.json(profile.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

//update profile
app.put("/profile/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {name, image, age, private} = req.body;
        let queryUpdateProfile = `UPDATE profiles SET name = '${name}', image = '${image}', age = ${age}, private = ${private} WHERE profile_id = ${id} RETURNING *`
        const profile = await pool.query(queryUpdateProfile);
        res.json(profile.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

//delete profile
app.delete("/profile/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const profile = await pool.query(`DELETE FROM profiles WHERE profile_id = ${id}`);
        res.json(`profile with id: ${id} was deleted`)
    } catch (error) {
        console.error(error.message)
    }
})

app.listen(5000, () => {
    console.log("server has on port 5000")
})