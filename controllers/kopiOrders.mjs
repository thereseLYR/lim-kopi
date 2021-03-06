// setup constants for diff attributes of a coffee order:
// sugar levels, strength, temperature, additives
// use a map to translate english to kopitiam-speak and vice versa
const sugarLevelsMap = {
  Kosong: "No Sugar",
  "Siew Dai": "Less Sugar",
  "Gar Dai": "More Sugar",
};

const strengthLevelsMap = {
  Poh: "Weak",
  Gao: "Strong",
  "Di Lo": "Extra Strong",
};

const temperatureLevelsMap = {
  "Pua Sio": "Lukewarm",
  Peng: "Iced",
};

const milkMap = {
  O: "No Milk",
  C: "Evaporated Milk",
};

const basicAttributesObj = {
  Sugar: sugarLevelsMap,
  Strength: strengthLevelsMap,
  Temperature: temperatureLevelsMap,
  Milk: milkMap,
};

const additivesMap = {
  // each order can have multiple additives
  "Gu You": "Butter",
  Neng: "Egg",
  Dinosaur: "Milo Powder",
  Halia: "Ginger",
  Limau: "Lime",
};

/**
 * gets N number of random unique properties from a given object, adn returns results in an array
 * @param {number} num
 * @param {object} object
 * @return {*} - Set of properties
 */
const getNRandomKeys = function (num, object) {
  const keys = Object.keys(object);
  const returnArr = [];
  // check that num is valid
  if (keys.length > num) {
    for (let i = 0; i < num; i += 1) {
      returnArr.push(object[keys[(keys.length * Math.random()) << 0]]);
      // sets only contan unique values
      // so if the rand picker chooses the same property twice, you're SoL
      // not a problem for kopitiam difficulty, because you don't want to constantly bombard the player with high-diffculty orders
    }
    const cleanedReturnArr = returnArr.filter((c, index) => {
      return returnArr.indexOf(c) === index;
    });
    return cleanedReturnArr;
  }
};

/**
 * Finds a key in an input object that matches the value specified
 * @param {object} object
 * @param {any} value
 * @return {string} of key matching particular value
 */
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

/**
 * Translates they values of an input orderObj from english to kopitiam lingo
 * @param {object} orderObj
 * @return {object} - translated values of the same keys as the input object
 */
const translateEnglishToKopitiam = function (orderObj, targetLang) {
  let translatedObj = {};
  if (targetLang == "kopitiam") {
    for (const key in orderObj) {
      const attributeType = basicAttributesObj[key];
      const attributeTranslation = getKeyByValue(attributeType, orderObj[key]);
      translatedObj[key] = attributeTranslation;
    }
  } else if (targetLang == "english") {
    // add reverse trnaslation logic later
  }
  return translatedObj;
};

// export a class/function to randomly generate an order and return a json object
const generateOrder = function (difficultyInt) {
  // const generateOrder = function(difficultyInt) {
  // difficultyInt will determine the number of order attributes to generate, as well as max number of additives
  // difficultyInt + 1 will be the min number of basic attributes (sugar, strength, temperature, milk)
  // if difficultyInt >= 2, additives will be added
  // difficultyInt maxes out at 4
  const basicAttributesMap = {
    0: "Sugar",
    1: "Strength",
    2: "Temperature",
    4: "Milk",
  };
  let orderObj = {};
  if (1 <= difficultyInt <= 4) {
    const generatedAttributes = getNRandomKeys(
      difficultyInt + 1,
      basicAttributesMap
    );
    // console.log('generated the following attributes:', generatedAttributes);
    generatedAttributes.forEach((attr) => {
      // console.log("now iterating", attr);
      let targetObj = basicAttributesObj[attr];
      // console.log('targetObj', targetObj)
      let [attributeVariable] = getNRandomKeys(1, targetObj);
      orderObj[attr] = attributeVariable;
      // console.log(orderObj[attr])
    });
    const translatedOrderObj = translateEnglishToKopitiam(orderObj, "kopitiam");
    // console.log(orderObj);
    return { orderObj, translatedOrderObj };
    // this can be a route - eventlistener in button for axios POST, route points to this logic in the controller
  }
};
// save json object to game state file?

// to add object comparison logic into this controller
const compareObjects = function(obj1, obj2){
    for(const attribute in obj1){
        if(obj1.hasOwnProperty(attribute)){
            if(obj1[attribute] !== obj2[attribute]){
                return false;
            }
        }
    }
    for(var attribute in obj2){
        if(obj2.hasOwnProperty(attribute)){
            if(obj1[attribute] !== obj2[attribute]){
                return false;
            }
        }
    }
    return true;
};

export default function initOrdersController(db) {
  const getOrdersObject = function (req, res) {
    // console.log(req)
    const newObj = generateOrder(1); // keep difficulty to 1 for testing
    // console.log(newObj);
    res.send(newObj);
  };

  const handleSubmission = function (req, res) {
    console.log("kopi submission received!");
    console.log(req.body);
    // extract submittedOrder and translate to kopitiam
    const translatedSubmittedOrder = translateEnglishToKopitiam(req.body['submittedOrder'], 'kopitiam')
    // compare translated submittedOrder object with given receivedOrder object
    // evaluate true or false
    const result = compareObjects(translatedSubmittedOrder, req.body['receivedOrder'])
    // console.log(result)
    const resultsObj = {
      receivedOrder: req.body['receivedOrder'],
      submittedOrder: translatedSubmittedOrder,
      evaluation: result
    }
    // a modal will pop up immediately after submission
    res.send(resultsObj)
    // some function to compare the recieved object with the sent orderObj
  };

  return {
    getOrdersObject,
    handleSubmission,
  };
}
