import axios from "axios";

export const getRandomNumber = async level => {
  // call a validator to check if num is within 4-8
  const result = await axios.get(`https://www.random.org/integers/?num=${level}&min=0&max=7&col=1&base=10&format=plain&rnd=new`);
  const codeInOneLine = await result.data.split("\n").join("").trim();
  return codeInOneLine;
};

// class validatelevel {
// to check if actually a single number
// }
