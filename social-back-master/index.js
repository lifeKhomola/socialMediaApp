
const mongoose = require('mongoose');
const app = require('./app'); 
const port = process.env.PORT || 3100;

mongoDb = "mongodb+srv://vhutshilo:Vhutshilo1@cluster0.hi4oc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongoDb, { useNewUrlParser: true })
.then(() => {
    console.log('DB: Connect OK!');
    app.listen(port, () => {
        console.log('Server running on port '+ port);
    });
})
.catch(err => console.log(err));

console.log('Starting...');
