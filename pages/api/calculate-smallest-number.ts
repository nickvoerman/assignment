import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '../../lib/types/data.type';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  //function that returns the greatest common divisor. Based on the GCD formula
  const gcd = (a: number, b: number) => {

    //check if a is divisible by b by a whole number, if not call gcd again
    if (a % b != 0) {
      return gcd(b, a % b);
    }
    else {
      return b;
    }
  }

  // Function returns the least common multiply. Based on the LCM formula
  const lcm = (a: number, b: number) => {
    return (a * b) / (gcd(a, b));
  }

  //check if the user filled in a sequential string of numbers
  if (!req.query.numbers || typeof req.query.numbers != "string") {
    return res.status(500).json({ errorMessage: "Please enter a sequential string of numbers (1 2 3 ...)" })
  }

  // split the numbers on space and create a array. Also parse the string number to an int.
  const input = req.query.numbers.split(" ").map(number => parseInt(number));

  //check if the user entered text instead of numbers or empty spaces
  if (input.includes(NaN)) {
    return res.status(500).json({ errorMessage: "Please enter a sequential string of numbers (1 2 3 ...)" })
  }

  // check if the user filled in a zero. LCM doenst work with the number zero
  if (input.includes(0)) {
    return res.status(500).json({ errorMessage: "The LCM of zero does not exist. Remove 0's and try again." })
  }

  //check if the user entered more than one number
  if (input.length < 2) {
    return res.status(500).json({ errorMessage: "Enter more than one number separated by spaces." })
  }

  //create a let to update the answer each loop, const cant be changed.
  let ans = 1;

  //loop x amount of times, depending on the size of the number that is being queried.
  for (let i = 1; i <= input.length; i++) {
    //update the ans each loop by calling the LCM function
    ans = lcm(ans, input[i - 1])
  }

  //sending back the smallest number to the client
  res.status(200).json({ number: ans })

}
