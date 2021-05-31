import React from 'react'

const LanguageList = ({ languages }) =>
    languages.map((language) => <li key={language.iso639_1}>{language.name}</li>)

const Country = ({ country }) =>

    <>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Spoken languages:</h3>
        <ul>
        <LanguageList languages={country.languages} />
        </ul>
        <img src={country.flag} alt="Flag" width="300"/>
    </>

export default Country