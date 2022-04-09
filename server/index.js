const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db")

//middleware
app.use(cors());
app.use(express.json());

//routes
//===============================================================PROFILE==============================================================
//create profile
app.post("/profile", async(req, res) => {
    try {
        const {name, image, age, private} = req.body;
        let queryCreateProfile = `INSERT INTO profiles (name, image, age, private) VALUES ('${name}', '${image}', ${age}, ${private}) RETURNING *`
        const newProfile = await pool.query(queryCreateProfile);
        res.json(newProfile.rows[0])
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

//get all profiles
app.get("/profiles", async(req, res) => {
    try {
        const profiles = await pool.query("SELECT * FROM profiles");
        res.json(profiles.rows)
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

//get profile
app.get("/profile/:id", async(req, res) => {
    try {
        const {id} = req.params;
        let profile = await pool.query(`SELECT * FROM profiles WHERE profile_id = ${id}`);
        profile = profile.rows[0]
        let works = await pool.query(`SELECT * FROM works WHERE profile_id = ${id}`);
        works = works.rows
        profile.works = works
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
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
        res.json(error.message)
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
        res.json(error.message)
    }
})

//===============================================================WORKS==============================================================
// add work
app.post("/work", async(req, res) => {
    try {
        const {profile_id, start_date, end_date, is_current, title, company_name, company_logo, description} = req.body;
        let queryCreateWork = `INSERT INTO works (profile_id, ${start_date ? "start_date, " : ""} ${end_date ? "end_date, " : ""} is_current, title, company_name, company_logo, description) VALUES (${profile_id}, ${start_date ? "'" + start_date + "'," : ""} ${end_date ? "'" + end_date + "'," : ""} ${is_current}, '${title}', '${company_name}', '${company_logo}', '${description}') RETURNING *`
        const newWork = await pool.query(queryCreateWork);
        res.json(newWork.rows[0])
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

//get works by profile_id
app.get("/works/:profile_id", async(req, res) => {
    try {
        const {profile_id} = req.params;
        const works = await pool.query(`SELECT * FROM works WHERE profile_id = ${profile_id}`);
        res.json(works.rows)
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

//edit work
app.put("/work/:id", async(req, res) => {
    try {
        const {profile_id, start_date, end_date, is_current, title, company_name, company_logo, description} = req.body;
        const {id} = req.params;
        let queryUpdateWork = `UPDATE works SET ${start_date ? "start_date = '" + start_date + "'," : ""} ${end_date ? "end_date ='" + end_date + "'," : ""} is_current = ${is_current}, title = '${title}', company_name = '${company_name}', company_logo = '${company_logo}', description = '${description}' WHERE id = ${id} RETURNING *`
        const newWork = await pool.query(queryUpdateWork);
        res.json(newWork.rows[0])
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

//delete work
app.delete("/work/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const profile = await pool.query(`DELETE FROM works WHERE id = ${id}`);
        res.json(`works with id: ${id} was deleted`)
    } catch (error) {
        console.error(error.message)
        res.json(error.message)
    }
})

//========================================================================================================================================

app.listen(5000, () => {
    console.log("server has on port 5000")
})