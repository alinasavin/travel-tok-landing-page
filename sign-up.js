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
  const lastName = document.getElementById('lname');
  const errorMessage = document.getElementById('fname-error');
  const submitForm = document.getElementById('submit-form');
  const output = document.getElementById('output');
  const loginBtn = document.querySelector('.login-btn');


  function allLetter(input)
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

      // save form data using Local Storage

const signUp = e => {
    let formData = {
        fname: firstName.value,
        lname: lastName.value
    };

    localStorage.setItem('userLogin', JSON.stringify(formData));
    //prevent re-loading ( prevent default browser behaviour)
    // console.log(localStorage.getItem('userLogin'));
    displayData();
    e.preventDefault();
    // location.href = 'index.html';
}

function displayData(){
    
    if(localStorage.getItem('userLogin')){
        let { fname, lname } = JSON.parse(localStorage.getItem('userLogin'));
        let output = document.getElementById('output');
        output.innerHTML = 
        `<h2>Hello&nbsp;<span>${fname}</span>&nbsp;<span>${lname}</span></h2>
         <h3>Welcome to Travel Tok</h3>`;
    }
}
displayData();

