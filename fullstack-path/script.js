// define the callAPI function that takes a first name and last name as parameters
const callAPI = (firstName, lastName) => {
  console.log(firstName, lastName)
  // instantiate a headers object
  const myHeaders = new Headers();
  // add content type header to object
  myHeaders.append("Content-Type", "application/json");

  // using built in JSON utility package turn object to string and store in a variable
  const raw = JSON.stringify({ "firstName": firstName, "lastName": lastName });

  // create a JSON object with parameters for API call and store in a variable
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  // make API call with parameters and use promises to get response
  fetch("https://qovacsa3tg.execute-api.eu-central-1.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));
}

const button = document.getElementById('api-button');
const fNameInput = document.getElementById('fName');
const lNameInput = document.getElementById('lName');

button.addEventListener('click', () => callAPI(fNameInput.value, lNameInput.value));