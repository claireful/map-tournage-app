const bodyParser = require("body-parser");
const express = require('express');
var cors = require('cors');
import { getMapBoxPoints } from './treatQueryFunctions';
import { getDatabaseResults } from './treatQueryFunctions';
import { arrond } from './arrondissements';

var app = express();

app.use(cors());

// body-parser
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(jsonParser);
app.use(urlencodedParser);

app.get('/arrondissements', async function(req:any , res:any){
  let query = `SELECT ardt_lieu FROM tournageData GROUP BY ardt_lieu ORDER BY ardt_lieu;`
  const arr = await getDatabaseResults(query);
  await res.send(arr);
});

app.get('/annee', async function(req:any , res:any){
  let query = `SELECT annee_tournage FROM tournageData GROUP BY annee_tournage ORDER BY annee_tournage;`
  const years = await getDatabaseResults(query);
  await res.send(years);
});

app.get('/', async function (req:any , res:any) {
  const query = `SELECT * FROM tournageData;`
  const tournagesMapbox = await getMapBoxPoints(query);
  await res.send(tournagesMapbox);
});

app.get('/arrondissements-limits', async function (req:any , res:any) {
  await res.send(arrond);
});

app.post('/', async function (req:any , res:any){
  let yearQuery:string = ` IS NOT NULL`;
  if (req.body.year != "") {
    yearQuery = `=${req.body.year}`;
  }

  console.log("requete : ", req.body);

  let ardtQuery:string = ` IS NOT NULL`;
  if (req.body.ardt != "") {
    ardtQuery = `=${req.body.ardt}`;
  }
  let MovieNameQuery:string = ` IS NOT NULL`;
  if (req.body.nom_tournage != "") {
    MovieNameQuery = `="${req.body.nom_tournage}"`;
  }
  let MovieDirectorNameQuery:string = ` IS NOT NULL`;
  if (req.body.nom_realisateur != "") {
    MovieDirectorNameQuery = `="${req.body.nom_realisateur}"`;
  }
  let ProducerNameQuery:string = ` IS NOT NULL`;
  if (req.body.nom_producteur != "") {
    ProducerNameQuery = `="${req.body.nom_producteur}"`;
  }
  const query =
    `SELECT * FROM tournageData
    WHERE annee_tournage${yearQuery}
    AND ardt_lieu${ardtQuery}
    AND nom_tournage${MovieNameQuery}
    AND nom_realisateur${MovieDirectorNameQuery}
    AND nom_producteur${ProducerNameQuery}
    LIMIT 1000;`;

  console.log(query);
  const tournagesMapbox = await getMapBoxPoints(query);
  await res.send(tournagesMapbox);
});

app.listen(8000);
