const express = require("express");
const fs = require("fs");
const mime = require("mime");
const path = require("path");
const MongoClient = require('mongodb').MongoClient;
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

var errorhandler = require('errorhandler');
var morgan = require('morgan');
var responseTime = require('response-time');
const debug = require('express-debug');

const app = express();
app.use(morgan('dev'));
app.use(responseTime());
debug(app, {
    depth: 3,   // Object depth for logging
    panels: ['locals', 'request', 'session'] // Choose what to show
  });
const port = process.env.PORT || 3000;
const appdata = [];
const dir = "public";

const url = "mongodb+srv://austin:mingming7ate9@austina3.uwuux.mongodb.net/";
const dbconnect = new MongoClient(url);
let scoresCollection = null;

MongoClient.connect(url).then(client => {
    db = client.db("cs4241");
    console.log("Connected to MongoDB");

    // Initialize Passport Local Strategy after database connection is ready
    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            const users = db.collection("users");
            let user = await users.findOne({ username });
    
            if (!user) {
                const newUser = { username: username, password: password }; //Store only required fields
                await users.insertOne(newUser);
                user = newUser;
            }
    
            return done(null, { username: user.username }); //Pass a plain object to prevent serialization issues
        } catch (err) {
            return done(err);
        }
    }));
    

    passport.serializeUser(function(user, done) {
        console.log("serializing user");
        done(null, user);
    });
    

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
    

}).catch(err => console.error(err));


app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Enable JSON parsing
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public", { index: false }));

async function run() {
    await dbconnect.connect().then(() => console.log("Connected!"));
    scoresCollection = await dbconnect.db("cs4241").collection("cars");

    // Middleware to parse JSON
    app.use(express.json());

    // Serve static files
    app.use(express.static(dir));

    // Handle GET requests
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "public", "login.html"));
    });

    app.post("/check", async (req, res) => {
        console.log("Request received:", req.body);
        sortItem();
        console.log("user", req.body.user);
        let databaseArray = await scoresCollection.find().toArray();
        let filteredArray = databaseArray.filter((v)=>{
            return v.user === req.user.username;
        });
        sortItem(filteredArray);

        res.json(filteredArray);
    });

    // Handle POST requests
    app.post("/submit", async (req, res) => {
        console.log("Authenticated?", req.isAuthenticated(), req.session, req.user.username);
        const {username, name, score, date } = req.body;
        let id = crypto.randomUUID();
        let submission = { "_id": id, "rank": null, "user":req.user.username, name, score, date };
        if (name && score && date) {
            const results = await scoresCollection.insertOne(submission);
            
            updateRankings(req.user.username);

            res.json({ message: "Submission successful", appdata });
        } else {
            res.status(400).json({ error: "Invalid input" });
        }
    });

    app.post("/delete", async (req, res) => {
        const { index } = req.body;

        let databaseArray = await scoresCollection.find().toArray();
        let filteredArray = databaseArray.filter((v)=>{
            return v.user === req.user.username && v.rank === index+1;
        });
        
        if(filteredArray.length === 0) {
            return res.status(400).json({ error: "no matching thing" });
        }
        console.log("id", filteredArray[0]._id);
        await scoresCollection.deleteOne({ _id: filteredArray[0]._id });

        updateRankings(req.user.username);

        res.json({ message: "Edited successfully", appdata });
    });

    app.post("/edit", async (req, res) => {
        const { index, name, score, date } = req.body;
        console.log("rank:", index);

        let databaseArray = await scoresCollection.find().toArray();
        let filteredArray = databaseArray.filter((v)=>{
            return v.user === req.user.username && v.rank === index+1;
        });
        
        if(filteredArray.length === 0) {
            return res.status(400).json({ error: "no matching thing" });
        }
        await scoresCollection.updateOne(
            { _id: filteredArray[0]._id },  // Filter by unique _id
            { $set: { name: name, score: score, date: date } } // Fields to update
        );

        updateRankings(req.user.username);

        res.json({ message: "Edited successfully", appdata });
    });
    
    

    app.post("/login", (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                const error = new Error('Something went wrong!');
                error.status = 500;
                return next(error);
            }
            if (!user) {
                console.log("Login failed for:", req.body.username);
                return res.redirect("/failure");
            }
            req.logIn(user, (err) => {
                if (err) {
                    const error = new Error('Something went wrong!');
                    error.status = 500;
                    return next(error);
                }
                console.log("Login successful for:", user.username);
                res.redirect(301, "/dashboard");
                next();
            });
        })(req, res, next);
    });
    

    app.get("/dashboard", (req, res) => {
        console.log("Request received at /dashboard");
    
        if (!req.isAuthenticated()) {
            console.log("User not authenticated, redirecting to /");
            return res.redirect("/");
        }
    
        const filePath = path.join(__dirname, "public", "scoreboard.html");
        console.log("Serving file:", filePath);
        
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
    
    app.get("/failure", (req, res) => {
        res.send("Login failed.");
    });

    app.post("/store", async (req, res) => {
        if (!req.isAuthenticated()) {
            return res.status(401).send("Unauthorized");
        }
        try {
            const userData = db.collection("users");
            await userData.insertOne({ username: req.user.username, data: JSON.parse(JSON.stringify(req.body.data)) });

            res.send("Data stored successfully");
        } catch (err) {
            res.status(500).send("Error storing data");
        }
    });

    // Catch-all for serving files
    app.get("/*", (req, res) => {
        const filename = path.join(__dirname, dir, req.path);
        if (fs.existsSync(filename)) {
            res.type(mime.getType(filename));
            res.sendFile(filename);
        } else {
            res.status(404).send("404 Error: File Not Found");
        }
    });

}
const appRun = run();

// Sort function
const sortItem = (a) => { a?.sort((a, b) => b.score - a.score); };

async function updateRankings(un) {
    let databaseArray = await scoresCollection.find().toArray();
            let aArray = databaseArray.filter((v)=>{
                return v.user === un;
            });
            sortItem(aArray);

            aArray.forEach((item, index) => {
                item.rank = index + 1;
            });
            
            let bArray = databaseArray.filter((v)=>{
                return v.user !== un;
            });

            aArray.push(...bArray);

            const deleted = await scoresCollection.deleteMany({ });
            if(aArray.length > 0) {
                const added = await scoresCollection.insertMany(aArray);
            }
}

function errorNotification (err, str, req) {
    var title = 'Error in ' + req.method + ' ' + req.url
  
    notifier.notify({
      title: title,
      message: str
    })
  }

  // Express Error Handler Middleware
app.use((err, req, res, next) => {
    const errorMessage = err.message || 'Internal Server Error';
    const statusCode = err.status || 500;
  
    // Send error response to client
    res.status(statusCode).json({ error: errorMessage });
  
    // Send a desktop notification
    errorNotification(err, errorMessage, req);
  
    // Continue error handling (optional, or log errors)
    console.error(`Error: ${errorMessage}`);
  });

app.listen(port, () => { console.log(`Server running on port ${port}`); });
module.exports = app;