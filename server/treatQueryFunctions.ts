import { db } from "./db";

export async function getMapBoxPoints(query:string){
  const results = await db.promise().query(query);
  const tournagesMapbox = await results[0].map((result:any) => {
    return {
          "type": 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [result.coord_x,result.coord_y]
          },
          "properties": {
            "nom_tournage": result.nom_tournage,
            "ardt_lieu": result.ardt_lieu,
            "adresse_lieu": result.adresse_lieu,
            "nom_realisateur": result.nom_realisateur,
            "nom_producteur": result.nom_producteur,
            "annee_tournage": result.annee_tournage
          }
    };
  });
  return tournagesMapbox;
}

export async function getDatabaseResults(query:string){
  const results = await db.promise().query(query);
  return results[0];
}
