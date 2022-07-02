// this JS file will be called as a script in the body of /views/main.ejs

// create elements, set attributes, classes, etc
const orderDiv = document.createElement("div");
orderDiv.setAttribute("id", "order-div");
orderDiv.classList.add("bg-warning");

// create const references to the elements created
const startButton = document.getElementById("startButton");
const difficultySubmitBtn = document.getElementById("difficultySubmitBtn");
const difficultyForm = document.getElementById("difficultyFormContainer");
difficultyForm.style.visibility = "hidden"; // start hidden
const orderText = document.getElementById('order-text')
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
  startButton.remove();
  difficultyForm.style.visibility = "visible";
  // ok so how do i feed the order generation into my axios bits
});

difficultySubmitBtn.addEventListener("click", () => {
  axios
    .post("/play", {
      difficulty: document.querySelector("#difficulty"),
    })
    .then((req, res) => {
      // receivedOrder is being saved as 'Object Object'
      console.log('orderObj data saved to localStorage:', JSON.stringify(req.data.orderObj))
      window.localStorage.setItem('receivedOrder', JSON.stringify(req.data.orderObj))
      orderText.innerText = generateString(req.data.translatedOrderObj)
      difficultyForm.style.visibility = "hidden";
      gameDiv.style.visibility = "visible"
    });
});

submitButton.addEventListener('click', () => {
  const submittedOrder = getOrderObjectFromSelectionValues()
  window.localStorage.setItem('submittedOrder', submittedOrder)
  axios
    .post('/submit-kopi', {
      'recievedOrder': JSON.parse(window.localStorage.getItem('receivedOrder')), 
      'submittedOrder': submittedOrder
    })
    .then((req, res) => {
      window.localStorage.clear
      console.log('request data:', req.data)
      console.log('submitted request from index.js')
    })
})
// will need some sort of axios post after submission object is generated