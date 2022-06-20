
//form validation

//Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  const firstName = document.getElementById('fname');
  const errorMessage = document.getElementById('fname-error');
  const submitForm = document.getElementById('submit-form');
  function allLetter(inputtxt)
      { 
      let letters = /^[A-Za-z]+$/;
      if(firstName.value.match(letters))
      {
      errorMessage.innerHTML = 'Your name have accepted : you can try another';
      return true;
      }
      else
      {
     errorMessage.innerHTML = 'Please input alphabet characters only';
      return false;
      }
      }

      submitForm.addEventListener("click", allLetter);


const displaySection = document.getElementById("display-location");
const submitResult = document.getElementById("submitButton");


// function call to select city by user selection 

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





