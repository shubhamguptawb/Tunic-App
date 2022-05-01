import { data } from "./data";

export function sortByGender(input, list) {
  let gender_array = list.filter((elem) => elem.gender === input);
  return gender_array;
}

// filter utitlity functions

export function filterByQuery(filterArray, list) {
  let discountArray = filterArray.filter((elem) => elem.type === "discount");
  let colorArray = filterArray.filter((elem) => elem.type === "color");
  let priceArray = filterArray.filter((elem) => elem.type === "price");
  let genderArray = filterArray.filter((elem) => elem.type === "gender");
  let outputArray = [];
  if (discountArray.length != 0) {
    outputArray = sortByDiscount(discountArray[0].value, list);
  }
  if (colorArray.length != 0) {
    if (outputArray.length != 0) {
      outputArray = searchByColor(colorArray, outputArray);
    } else {
      outputArray = searchByColor(colorArray, list);
    }
  }

  if (priceArray.length != 0) {
    if (outputArray.length != 0) {
      outputArray = searchByPrice(priceArray, outputArray);
    } else {
      outputArray = searchByPrice(priceArray, list);
    }
  }

  if (genderArray.length != 0) {
    if (outputArray.length != 0) {
      outputArray = sortByGender(genderArray[0].value, outputArray);
    } else {
      outputArray = sortByGender(genderArray[0].value, list);
    }
  }

  return outputArray;
}

//Helper function to  filter discount

export function sortByDiscount(input, list) {
  let discount_array = [];
  list.map((elem) => {
    if (Math.floor(((elem.mrp - elem.price) / elem.mrp) * 100) >= input) {
      discount_array.push(elem);
    }
  });

  return discount_array;
}

//Helper function to   filter Price

export function searchByPrice(priceArray, list) {
  let upperValue = 0;
  let lowerValue = 40540;
  for (let elem of priceArray) {
    if (elem.value.upper > upperValue) {
      upperValue = elem.value.upper;
    }
  }
  for (let elem of priceArray) {
    if (elem.value.lower < lowerValue) {
      lowerValue = elem.value.lower;
    }
  }

  return list.filter(
    (elem) => elem.price < upperValue && elem.price > lowerValue
  );
}

//Helper function to  filter Color
export const searchByColor = (colorArray, list) => {
  let output = [];
  for (let element of colorArray) {
    for (let elem of list) {
      if (element.value === elem.primaryColour) {
        output.push(elem);
      }
    }
  }

  return output;
};

export const filterList = [
  {
    id: 1,
    type: "price",
    value: { lower: 200, upper: 2000 },
  },
  {
    id: 2,
    type: "price",
    value: { lower: 2000, upper: 5000 },
  },
  {
    id: 3,
    type: "price",
    value: { lower: 5000, upper: 12000 },
  },
  {
    id: 4,
    type: "price",
    value: { lower: 12000, upper: 20000 },
  },
  {
    id: 5,
    type: "color",
    value: "Blue",
  },
  {
    id: 6,
    type: "color",
    value: "Black",
  },
  {
    id: 7,
    value: "Pink",
    type: "color",
  },
  {
    id: 8,
    type: "color",
    value: "White",
  },
  {
    id: 9,
    type: "color",
    value: "Olive",
  },
  {
    id: 10,
    type: "color",
    value: "Yellow",
  },
  {
    id: 11,
    type: "color",
    value: "Red",
  },
  {
    id: 12,
    type: "color",
    value: "Green",
  },
  {
    id: 13,
    type: "gender",
    value: "Men",
  },
  {
    id: 14,
    type: "gender",
    value: "Women",
  },
  {
    id: 15,
    type: "gender",

    value: "Boys",
  },
  {
    id: 16,
    type: "gender",
    value: "Girls",
  },
  {
    id: 17,
    type: "discount",
    value: "20",
  },
  {
    id: 18,
    type: "discount",
    value: "35",
  },
  {
    id: 19,
    type: "discount",
    value: "50",
  },
  {
    id: 20,
    type: "discount",
    value: "80",
  },
];

//search implementation function

export function searchHelper(input, list) {
  let resultArray = [];
  input = "_" + input + "_";
  const findCommon = (str1, str2) => {
    let str1Index = 0;
    let str2Index = 0;
    while (str1Index != str1.length) {
      while (str2Index < str2.length) {
        if (str2[str2Index] === str1[str1Index]) {
          str2Index++;
          str1Index++;
          if (str2[str2Index] != str1[str1Index]) {
            str1Index = 0;
          }
        } else {
          str2Index++;
        }

        if (str2Index === str2.length) {
          return false;
        }

        if (str1Index == str1.length - 1) {
          return true;
        }
      }
    }
    return false;
  };
  list.map((element) => {
    let res =
      "_" + element.productName.replace(/\s+/g, "_").toLowerCase() + "_";

    let a = findCommon(input, res);

    if (a) {
      resultArray.push(element);
    }
  });

  return resultArray;
}

export function search(input, data) {
  const queries = input.split(" "); //convert string to array of keywords
  queries.map((elem) => {
    let temp = searchHelper(elem, data);
    data = temp;
  });
  return data;
}

///////////////////////////////////////////

//utility functions to fetch items

export function fetchProducts() {
  return data;
}

export function fetchProductFromid(id) {
  let a = data.filter((elem) => elem.productId == id.id);
  return a;
}

export function fetchProductFromBrand(brand, gender) {
  let a = data.filter((elem) => elem.brand === brand && elem.gender === gender);
  return a;
}

//////////////////
//sort implementation function

export function sort(query, data) {
  let output = [];
  switch (query) {
    case "new":
      output = data.sort((a, b) => a.productId - b.productId);
      break;
    case "discount":
      output = data.sort((a, b) => b.discount - a.discount);
      break;
    case "rating":
      output = data.sort((a, b) => a.rating - b.rating);
      break;
    case "popularity":
      output = data.sort((a, b) => a.ratingCount - b.ratingCount);
      break;
    case "price-asc":
      output = data.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      output = data.sort((a, b) => b.price - a.price);
      break;
    default:
      output = data.sort((a, b) => a.year - b.year);
  }

  return output;
}
