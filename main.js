
  
// thai destinations api call
      const displaySection = document.getElementById("display-location");
      const submitResult = document.getElementById("submitButton");


/// function call to select city by user selection 

let locationNumber = 0;
function changeLocationId() {
    let location = document.getElementById("cities");
    let locationValue = location.value;
    if (locationValue === "Pattaya") {
        locationNumber = 293919;
    } else if (locationValue === "Bangkok") {
        locationNumber = 293916;
    } else if (locationValue === "ChiangMai") {
        locationNumber = 293917;
        console.log(locationNumber)
    } else if (locationValue === "KoSamui") {
        locationNumber = 293918;
    } else if (locationValue === "Phuket") {
        locationNumber = 293920;
    }
}

// async function to get location and activity from API 

async function getActivities() {
    changeLocationId(locationNumber);
    const getData = await fetch(`https://travel-advisor.p.rapidapi.com/attractions/list?location_id=${locationNumber}&currency=GBP&lang=en_US&lunit=km&sort=recommended`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "c55d2d23f7msh63ff74ae914833dp1b1565jsnb15ec0c1c3db",
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
        }
    })
        const response = await getData.json();
        const result = response.data;
    // console.log(response);

     // used .slice methos to grab only 3 items from the array
    generateActivities(result.slice(1, 4));
       
    }


// function to generate and display activities on html 

function generateActivities(results) {
    let generatedActivities = "";
    // use map to create new modified array 
    results.map((result) => {
        generatedActivities +=
            `
            <div class="col-md-4">
                <div class="feature-box">
                    <div class="feature-img">
                        <img src="${result.photo.images.medium.url}" alt"">
                            <div class="price">
                                <p>${result['offer_group']['offer_list'][0].price}</p>
                            </div>
                        <div class="rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                    </div>
                    <div class="feature-details">
                        <h2>${result.name}</h2>
                        <a class="activities-label" href="${result.website}" target = "_blank">View website</a>
                        <p class="activities-data">Ranking : ${result.ranking}</p>
                        <p class="activities-data">Activity to do  : ${result['offer_group']['offer_list'][0].title}</p>
                    <div>
                        <span><i class="fa-solid fa-location-dot"></i>${result.name}</span>
                        <span><i class="fa-solid fa-sun"></i>3 days</span>
                        <span><i class="fa-solid fa-moon"></i>4 nights</span>
                    </div>
                    </div>
                </div>
               </div> 
        `

    })
    // populate search result section by changing the inner HTML with the
    // generated div with the results from the mapp array method
    displaySection.innerHTML = generatedActivities;
}


// event listener for button click
submitResult.addEventListener("click", getActivities);



// search country details

const searchBtn = document.getElementById('search-btn');
const countryInput = document.getElementById('country-input');

searchBtn.addEventListener("click", () => {
  let countryName = countryInput.value;
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  console.log(finalURL);
  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data[0]);
      //   console.log(data[0].capital[0]);
      //   console.log(data[0].flags.svg);
      //   console.log(data[0].name.common);
      //   console.log(data[0].continents[0]);
      //   console.log(Object.keys(data[0].currencies)[0]);
      //   console.log(data[0].currencies[Object.keys(data[0].currencies)].name);
      //   console.log(
      //     Object.values(data[0].languages).toString().split(",").join(", ")
      //   );
      result.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-img">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continent:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Population:</h4>
                <span>${data[0].population}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Currency:</h4>
                <span>${
                  data[0].currencies[Object.keys(data[0].currencies)].name
                } - ${Object.keys(data[0].currencies)[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Common Languages:</h4>
                <span>${Object.values(data[0].languages)
                  .toString()
                  .split(",")
                  .join(", ")}</span>
            </div>
        </div>
      `;
    })
    .catch(() => {
      if (countryName.length == 0) {
        result.innerHTML = `<h3>The input field cannot be empty</h3>`;
      } else {
        result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
      }
    });
});