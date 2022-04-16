import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import '../styles.css';

const Select = ({setAnnee, setArr, setMovieName, setDirectorName, setProducerName}) => {

  const [anneeArray, setAnneeArray] = useState([]);
  const [anneeSelect, setAnneeSelect] = useState('');
  const [arrArray, setArrArray] = useState([]);
  const [arrSelect, setArrSelect] = useState('');
  const [movieNameInputValue, setMovieNameInputValue] = useState('');
  const [producerNameInputValue, setProducerNameInputValue] = useState('');
  const [directorNameInputValue, setDirectorNameInputValue] = useState('');

  const getAnneeArray = async () => {
    try {
      const response = await axios.get('http://localhost:8000/annee');
      setAnneeArray(response.data);
    } catch (error) {
      console.log("error", error);
    };
  };

  const getArrArray = async () => {
    try {
      const response = await axios.get('http://localhost:8000/arrondissements');
      setArrArray(response.data);
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    getAnneeArray();
    getArrArray();
  }, [])

  return (
    <div class="select">
      <form action="" onSubmit={(event) => {
        event.preventDefault();
        setAnnee(anneeSelect);
        setArr(arrSelect);
        setMovieName(movieNameInputValue);
        setDirectorName(directorNameInputValue)
        setProducerName(producerNameInputValue)
      }}>
        <select onChange={(event) => setAnneeSelect(event.target.value)} style={{ width: '190px' }}>
          <option value="" >--Année--</option>
          {anneeArray.map((a) => (
            <option key={a.annee_tournage} name={a.annee_tournage} value={a.annee_tournage}>{a.annee_tournage}</option>
          ))}
        </select>
        <select onChange={(event) => setArrSelect(event.target.value)} style={{ width: '210px' }}>
          <option value="">--Code postal--</option>
          {console.log('arrondissement array:', arrArray)}
          {arrArray.map((a) => (
            <option name={a.ardt_lieu} value={a.ardt_lieu}>{a.ardt_lieu}</option>
          ))}
        </select>
        <input placeholder="Nom du film ou de la série..." value={movieNameInputValue} onChange={(event) => setMovieNameInputValue(event.target.value)} style={{ width: '210px' }} />
        <input placeholder="Nom du réalisateur..." value={directorNameInputValue} onChange={(event) => setDirectorNameInputValue(event.target.value)} style={{ width: '210px' }} />
        <input placeholder="Nom du producteur..." value={producerNameInputValue} onChange={(event) => setProducerNameInputValue(event.target.value)} style={{ width: '210px' }} />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  )
}

export default Select;
