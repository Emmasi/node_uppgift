import express from 'express';
import { MongoClient } from "mongodb";
const port = 3000;
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'))

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('library');
const membercollection = db.collection('members');

app.get('/startpage', async (req, res) => {
    const startpage = await membercollection.find({}).toArray();
    res.render('startpage', { startpage });
});
app.get('/member', async (req, res) => {
    const member = await membercollection.find({}).toArray();
    res.render('member', { member });
});
app.get('/newmember', async (req, res) => {
    const newmember = await membercollection.find({}).toArray();
    res.render('newmember', { newmember });
});
app.get('/allmembers', async (req, res) => {
    const allmembers = await membercollection.find({}).toArray();
    res.render('allmembers', { allmembers });
});

// app.get('/member/:id', async (req, res) => {
//     const memberid = await membercollection.findOne({ _id: ObjectId(req.params.id) });
//     res.render('memberid', memberid);
//   });

app.listen(port, () => console.log(`Listening on ${port}`));
