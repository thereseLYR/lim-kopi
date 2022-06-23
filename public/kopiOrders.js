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
  "": "Normal", // yes, this is an empty string as a key
  Gao: "Strong",
  "Di Lo": "Extra Strong",
};

const temperatureLevelsMap = {
  "": "Hot", // assume drinks are hot unless told otherwise
  "Pua Sio": "Lukewarm",
  Peng: "Iced",
};

const milkMap = {
  O: "No Milk",
  "": "Consensed Milk",
  C: "Evaporated Milk",
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
  const keys = Object.keys(object)
  const returnArr = new Set()
  // check that num is valid
  if (keys.length > num) {
    for (let i = 0; i < num; i += 1){
      returnArr.add(object[keys[keys.length * Math.random() << 0]])
      // sets only contan unique values
      // so if the rand picker chooses the same property twice, you're SoL
      // not a problem for kopitiam difficulty, because you don't want to constantly bombard the player with high-diffculty orders
    }
    return returnArr
  }
};

// export a class/function to randomly generate an order and return a json object
// save json object to game state file?
