// this JS file will be called as a script in the body of /views/main.ejs

// create elements, set attributes, classes, etc
const orderDiv = document.createElement("div");
orderDiv.setAttribute("id", "order-div");
orderDiv.classList.add("bg-warning");

const orderText = document.createElement("h1");
orderText.setAttribute("id", "order-text");
orderText.classList.add("bg-secondary");

// create const references to the elements created
// const orderWindow = document.getElementById("order-text");
const startButton = document.getElementById("startButton");
const difficultySubmitBtn = document.getElementById("difficultySubmitBtn");
const difficultyForm = document.getElementById("difficultyFormContainer");
difficultyForm.style.visibility = "hidden"; // start hidden
const gameDiv = document.getElementById("gameContainer");
gameDiv.style.visibility = "hidden";

const generateString = function (orderObj) {
  let result = "Kopi";
  for (const key in orderObj) {
    result += orderObj[key];
  }
  result = result.replace(/[A-Z]/g, " $&").trim().replace("-", "");
  return result;
};

startButton.addEventListener("click", () => {
  document.body.appendChild(orderDiv);
  orderDiv.appendChild(orderText);
  startButton.remove();
  difficultyForm.style.visibility = "visible";
  // ok so how do i feed the order generation into my axios bits
  // orderText.innerHTML = "HI THERE";
});

difficultySubmitBtn.addEventListener("click", () => {
  axios
    .post("/play", {
      difficulty: document.querySelector("#difficulty"),
    })
    .then((req, res) => {
      // console.log(req.data);
      console.log(generateString(req.data.translatedOrderObj));
      difficultyForm.style.visibility = "hidden";
      gameDiv.style.visibility = "visible"
      // convert object to a sting to pass to user
      // appendchild with the given json data
    });
});

// // identify particular paths via window.location.pathname?
// if (window.location.pathname === "/") {
//   // set set axios requests for those paths
//   // axios requests here must have a corresponding app.get in routes.mjs
//   axios
//     .get("/something")
//     .then((response) => {
//       orderText.innerHTML = "test";
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
