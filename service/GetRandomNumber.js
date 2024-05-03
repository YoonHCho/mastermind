import axios from "axios";

export const getRandomNumber = async level => {
  const result = await axios.get(`https://www.random.org/integers/?num=${level}&min=0&max=7&col=1&base=10&format=plain&rnd=new`);
  const codeInOneLine = await result.data.split("\n").join("").trim();
  return codeInOneLine;
};
