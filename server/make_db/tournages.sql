DROP DATABASE IF EXISTS tournages;
CREATE DATABASE tournages;
USE tournages;
DROP TABLE IF EXISTS tournageData;
DROP TABLE IF EXISTS arrondissementData;

CREATE TABLE IF NOT EXISTS tournageData (
  id INT AUTO_INCREMENT PRIMARY KEY,
  annee_tournage VARCHAR(255),
  nom_producteur VARCHAR(255),
  type_tournage VARCHAR(255),
  nom_realisateur VARCHAR(255),
  nom_tournage VARCHAR(255),
  date_debut DATE,
  adresse_lieu VARCHAR(255),
  ardt_lieu INT,
  coord_y VARCHAR(100),
  coord_x VARCHAR(100)
  );
