const countryName = new URLSearchParams(window.location.search).get('name');
const flagImg = document.querySelector('.flagImg img')
const nameCountry = document.querySelector('.countryInfo h2')
const nativeName = document.querySelector('.nativeName')
const Population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.subRegion')
const Capital = document.querySelector('.Capital')
const topDomain = document.querySelector('.topDomain')
const currency = document.querySelector('.currency')
const language = document.querySelector('.language')
const borderCountries=document.querySelector('.countryBorderCountry')

const themeChanger = document.querySelector('.darkAndLightMode')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res)=> res.json())
.then(([country])=>{
    // console.log(country)
    flagImg.src = country.flags.svg;
    nameCountry.innerText = country.name.common;

    if(country.name.nativeName){
        nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    }
    else{
        nativeName.innerText = country.name.common;
    }
    Population.innerText= country.population.toLocaleString('en-IN');
    region.innerText = country.region;
    subRegion.innerText = country.subregion;
    Capital.innerText = country.capital?.[0];
    topDomain.innerText = country.tld;
    currency.innerText = Object.values(country.currencies).map((currency)=>currency.name).join(', ');
    language.innerText = Object.values(country.languages).map((language)=>language).join(', ');


    if(country.borders){
        country.borders.forEach((borders)=>{
            // console.log(borders)
            fetch(`https://restcountries.com/v3.1/alpha/${borders}`).then((res) => res.json())
            .then(([borderCountry])=>{
                // console.log(borderCountry)
                const borderCountryTag=document.createElement('a')
                borderCountryTag.innerText = borderCountry.name.common;
                borderCountryTag.href = `countryPage.html?name=${borderCountry.name.common}`;
                // console.log(borderCountryTag)
                borderCountries.append(borderCountryTag);
            })
        })
    }
})



themeChanger.addEventListener('click',()=>{
    document.body.classList.toggle('dark')
})