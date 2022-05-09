import express from 'express';
import { MongoClient,ObjectId } from "mongodb";
const port = 3000;
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }));

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('library');
const memberCollection = db.collection('members');

//läser alla sidor
app.get('/startpage', async (req, res) => {
    const startpage = await memberCollection.find({}).toArray();
    res.render('startpage', { startpage });
});
app.get('/member', async (req, res) => {
    const member = await memberCollection.find({}).toArray();
    res.render('member', { member });
});
app.get('/newmember', async (req, res) => {
    const newmember = await memberCollection.find({}).toArray();
    res.render('newmember', { newmember });
});
app.get('/allmembers', async (req, res) => {
    const allmembers = await memberCollection.find({}).toArray();
    res.render('allmembers', { allmembers });
});

//läser en användare utifrån id
app.get('/member/:id', async (req, res) => {
    const memberID = await memberCollection.findOne({ _id: ObjectId(req.params.id) });
    res.render('member',memberID )
  });

// post en ny användare
app.get('/newmember', (req, res) => {
    res.render('newmember');
  });
  
  app.post('/newmember', async (req, res) => {await memberCollection.insertOne(req.body);
    res.redirect('/allmembers');
  });

app.listen(port, () => console.log(`Listening on ${port}`));
