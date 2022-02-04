
const express = require('express');
const cors = require('cors');
const fs = require('fs');
var Publication = require('./models/publication');
var md_auth = require('./middlewares/authenticated');

require('dotenv').config();
const { cloudinary } = require('./cloud');
const app = express();
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())

const bodyParser = require('body-parser');
const default_routes = require('./routes/default');
const user_routes = require('./routes/user');
const follow_routes = require('./routes/follow');
const message_routes = require('./routes/message');
const publication_routes = require('./routes/publication');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});
app.get('/api/images/:url', async (req, res) => {
    const url = req.params.url

    const { resources } = await cloudinary.search
        .expression('folder:images')
        .expression(`filename:${url}`)
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();

    const publicIds = resources.map((file) => file.url);
    res.send(publicIds);

});
const multer  = require('multer')
const upload = multer({ dest: 'images/' })
// app.post('/api/upload',upload.single("images"), async (req, res) => {
//      const images = req.file
//      console.log(images);
//     try {

//         const fileStr = req.file.path;
//         console.log(fileStr)
//         const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//             folder: 'images',
//             resource_type: 'image'
//         });
//         const filepath = req.file.path;
//         fs.unlinkSync(filepath);

//         console.log(uploadResponse);
//         res.json({ msg: 'uploaded' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ err: 'Something went wrong' });
//     }
// });

app.post('/api/upload',md_auth.ensureAuth,upload.single("images"), async (req, res) => {
    var params = req.body;
    if (!params.text)
        return res.status(200).send({message: "Text field is required."});


    var publication = new Publication();
    const images = req.file
    console.log(images);
    publication.text = params.text;
    console.log(publication.text)
    publication.file = 'null';
    publication.user = req.user.sub;
    publication.created_at = moment().unix();
    publication.save((err, publicationStored) => {
        if (err)
            return res.status(500).send({message: "Saving publication error."});
        if (!publicationStored)
            return res.status(404).send({message: "Publication not saved."});

        return res.status(200).send({publication: publicationStored});
    });
});

app.use('/', default_routes);
app.use('/api', user_routes);
app.use('/api', follow_routes);
app.use('/api', message_routes);
app.use('/api', publication_routes);

module.exports = app;
