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

const CountryItem = ({ country }) => <p>{country.name}</p>

const Countries = ({ countries }) => {
    const lenght = countries['length']

    if (lenght > 10)
        return <p>Too many matches, specify another filter</p>

    if (lenght === 0)
        return <p>No match</p>

    if (lenght === 1)
        return <Country key={countries[0].name} country={countries[0]} />

    return countries.map((country) => <CountryItem key={country.name} country={country} />)

}

export default Countries