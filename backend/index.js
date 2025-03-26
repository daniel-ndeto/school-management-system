const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser"); 
const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

dotenv.config();

// body-parser middleware to parse JSON and URL-encoded data with a 10MB limit
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


app.use(express.json({ limit: '10mb' }));

app.use(cors());

// Connecting to MongoDB using credentials from the environment variables
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Defining routes
app.use('/', Routes);

// Starting the server on port 5000
app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});
