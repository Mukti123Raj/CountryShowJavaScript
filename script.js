const countriesContainer = document.querySelector('.countriesContainer')
const filterByRegion = document.querySelector('#FileterByRegion')

const searchInput = document.querySelector('#SearchCountryName')

const themeChanger = document.querySelector('.darkAndLightMode')
let allCountriesData;

countriesContainer.innerHTML =' '
fetch('https://restcountries.com/v3.1/all').then((res) => res.json())

.then((data)=>{
    renderCountryCard(data);
    allCountriesData = data;
})

filterByRegion.addEventListener('change', (e)=>{
    
    countriesContainer.innerHTML =' '
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`).then((res) => res.json())

.then(renderCountryCard)
})


function renderCountryCard(data){
    countriesContainer.innerHTML =' '
    data.forEach((country) => {
        const countryCard= document.createElement('a');
countryCard.classList.add('countryCard');
countryCard.href=`/countryPage.html?name=${country.name.common}`

const createCard=`
                <img src="${country.flags.svg}" alt="CountryFlag">
                <div class="countryDetail">
                    <h3 class="countryName">${country.name.common}</h3>
                    <p class="population"><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                    <p class="region"><b>Region: </b>${country.region}</p>
                    <p class="Capital"><b>Capital: </b>${country.capital}</p>
                </div>
`;
countryCard.innerHTML=createCard

countriesContainer.append(countryCard)
    });
}


searchInput.addEventListener('input', (e)=>{
    console.log(e.target.value)
    
    const filteredCountries =allCountriesData.filter((country)=> country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountryCard(filteredCountries)
})

themeChanger.addEventListener('click',()=>{
    document.body.classList.toggle('dark')
})