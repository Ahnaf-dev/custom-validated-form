let form,
    name,
    email,
    message,
    button,
    displaySelect,
    selectItems,
    selectObj;

getElements();
addListeners();

function getElements() {
  form = document.forms[0];
  name = document.querySelector('input#name');
  email = document.querySelector('input#email');
  message = document.querySelector('textarea#message');
  displaySelect = document.querySelector('.select-style');
  selectItems = Array.from(document.querySelectorAll('input[name="subject"]'));
  selectObj = {};
 }


 function addListeners() {
   form.addEventListener('submit', validateForm, false)
   name.addEventListener('input', validateName, false)
   email.addEventListener('input', validateEmail, false)
   message.addEventListener('input', validateMessage, false)
   displaySelect.addEventListener('click', displayOptions, false);
   selectItems.forEach((item) => item.addEventListener('click',updateSelect, false))
 }

 function displayOptions() {
   this.parentElement.classList.toggle('active');
 }

 function updateSelect() {

  
  if (this.checked) {
    selectObj[this.value] = this.value;
    textifyObj(selectObj)
    
  } else {
    delete selectObj[this.value];
    textifyObj(selectObj)
  }

  console.log(selectObj)
 }
 
function textifyObj(obj) {
  let flag = true;
  let text = '';

  for (let x in selectObj) {
    text += `${selectObj[x]}, `;
    flag = false;
  }

  if (flag) {
    text = "I need..."
  }

  displaySelect.innerText = text;
}
function validateForm(evt) {
 
  checkFields(evt);
}

function checkFields(evt) {


   let nameValue = name.value.trim();
   let emailValue = email.value.trim();
   let messageValue = message.value.trim();

   
   // name validation
   
   if (nameValue === '') {
     setErrorFor(name, 'Name must be filled')
     evt.preventDefault();
    } else if (isFinite(nameValue)) {
      setErrorFor(name, 'Name must start with a number')
      evt.preventDefault();
      
    } else {
      validated(name);
    }
    
    if (!emailValue.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setErrorFor(email, 'Please enter a proper email address with @')
      evt.preventDefault();
    } else {
      validated(email);
    }
    
    if (messageValue === '') {
      setErrorFor(message, 'Please enter a message')
      evt.preventDefault();
  } else {
    validated(message)
  }
  }


  function setErrorFor(input, message) {

    input.parentElement.classList.add('error');
    input.nextElementSibling.innerText = message;

  }

  function validated(input) {
    input.parentElement.classList.remove('error');
  }

  function validateName() {
    let nameValue = name.value.trim();
    if (nameValue === '') {
      setErrorFor(name, 'Name must be filled')
      evt.preventDefault();
     } else if (isFinite(nameValue)) {
       setErrorFor(name, 'Name must start with a number')
       evt.preventDefault();
       
     } else {
       validated(name);
     }

  }

  function validateEmail() {
    let emailValue = email.value.trim();
     
    if (!emailValue.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setErrorFor(email, 'Please enter a proper email address with @')
      evt.preventDefault();
    } else {
      validated(email);
    }

  }
  function validateMessage() {
    let messageValue = message.value.trim();


    if (messageValue === '') {
      setErrorFor(message, 'Please enter a message')
      evt.preventDefault();
  } else {
    validated(message)
  }
  }