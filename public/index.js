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
const submitButton = document.getElementById("kopi-submission-buttton");

const generateString = function (orderObj) {
  let result = "Kopi";
  for (const key in orderObj) {
    result += orderObj[key];
  }
  result = result.replace(/[A-Z]/g, " $&").trim().replace("-", "");
  return result;
};

const getOrderObjectFromSelectionValues = function (){
  // document.queryselector for every attribute - .value will return a string, with 'on' being defaulted if there is no defined value
  const sugarValue = document.querySelector('input[name="sugar-btnradio"]:checked').value;
  const strengthValue = document.querySelector('input[name="strength-btnradio"]:checked').value;
  const tempValue = document.querySelector('input[name="temp-btnradio"]:checked').value;
  const milkValue = document.querySelector('input[name="milk-btnradio"]:checked').value;

  const orderObj = {}
  orderObj['Sugar'] = sugarValue
  orderObj['Strength'] = strengthValue
  orderObj['Temperature'] = tempValue
  orderObj['Milk'] = milkValue
  for (const key in orderObj){
    if (orderObj[key] === 'on'){
      delete orderObj[key]
    }
  }
  console.log('submitted order object:')
  console.log(orderObj)
  return orderObj
}

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
      console.log('generated string:', generateString(req.data.translatedOrderObj));
      difficultyForm.style.visibility = "hidden";
      gameDiv.style.visibility = "visible"
      // convert object to a sting to pass to user
      // appendchild with the given json data
    });
});

submitButton.addEventListener('click', () => {
  const submittedOrder = getOrderObjectFromSelectionValues()
  // console.log(submittedOrder)
  axios
    .post('/submit-kopi', submittedOrder)
    .then((req, res) => {
      // help why doesnt it reach this line
      console.log(req.data)
      console.log('submitted request from index.js')
    })
})
// will need some sort of axios post after submission object is generated