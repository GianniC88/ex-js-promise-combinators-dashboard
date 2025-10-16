/*

Nota: a differenza di quanto visto finora negli esempi, per accedere all'API utilizzare l'url base:
http://localhost:3333
al posto di:
https://freetestapi.com/api/v1

Ad esempio:
http://localhost:3333/users
per chiamare l'endpoint /users

Clicca qui per la guida su come installare il Server API Locale!



In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:

Nome completo della città e paese da  /destinations?search=[query]
(result.name, result.country, nelle nuove proprietà city e country).

Il meteo attuale da /weathers?search={query}
(result.temperature e result.weather_description nella nuove proprietà temperature e weather).

Il nome dell’aeroporto principale da /airports?search={query}
(result.name nella nuova proprietà airport).

Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.

Attenzione: le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).
Note del docente


Scrivi la funzione getDashboardData(query), che deve:
Essere asincrona (async).

-Utilizzare Promise.all() per eseguire più richieste in parallelo.
-Restituire una Promise che risolve un oggetto contenente i dati aggregati.
-Stampare i dati in console in un messaggio ben formattato.
-Testa la funzione con la query "london"

Esempio di utilizzo
getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));
Esempio di output atteso
// Risposta API
{
  city: "London",
  country: "United Kingdom",
  temperature: 18,
    weather: "Partly cloudy",
  airport: "London Heathrow Airport"
}
​
// Output in console
London is in United Kingdom. 
Today there are 18 degrees and the weather is Partly cloudy.
The main airport is London Heathrow Airport.
*/
async function fetchJson(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}

async function getDashboardData(query) {



  try {
    console.log(`Il paese di destinazione è "${query}"`)

    const destinationsPromise = fetchJson(` http://localhost:3333/destinations?search=${query}`);

    const weathersPromise = fetchJson(`http://localhost:333ddd3/weathers?search=${query}`);

    const airportsPromise = fetchJson(` http://localhost:3333/airports?search=${query}`);

    const promises = [destinationsPromise, weathersPromise, airportsPromise];
    const [destinations, weathers, airports] = await Promise.all(promises)



    return {
      city: destinations[0].name,
      country: destinations[0].country,
      temperature: weathers[0].temperature,
      weather: weathers[0].weather_description,
      airport: airports[0].name

    }
  } catch (error) {
    throw new Error(`Dati non trovati in : ${error.message}`)
  }
}


getDashboardData('london')
  .then(data => {
    console.log('Dasboard data:', data);
    console.log(
      `${data.city} is in ${data.country}.\n` +
      `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
      `The main airport is ${data.airport}.\n`
    );
  })
  .catch(error => console.error(error));

