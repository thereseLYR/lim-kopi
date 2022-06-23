// this JS file will be called as a script in the body of /views/main.ejs
// const { default: axios } = require("axios");

// create elements, set attributes, classes, etc
const orderDiv = document.createElement("div");
orderDiv.setAttribute("id", "order-div");

const orderText = document.createElement("h1");
orderText.setAttribute("id", "order-text");

// create const references to the elements created
// const orderWindow = document.getElementById("order-text");

// identify particular paths via window.location.pathname
if (window.location.pathname === "/") {
  document.body.appendChild(orderDiv);
  orderDiv.appendChild(orderText);

  orderText.innerHTML = 'HI THERE'

  // set set axios requests for those paths
  // axios requests here must have a corresponding app.get in routes.mjs
  axios
    .get('/something')
    .then((response) => {
      orderText.innerHTML = "test"
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}
