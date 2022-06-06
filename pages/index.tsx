import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { fetcher } from '../lib/constants/fetcher';
import { Data } from '../lib/types/data.type';

const Home: NextPage = () => {

  const [data, setData] = useState<Data>();
  const [responseTime, setResponseTime] = useState(0);

  //reference the input 
  const inputRef = useRef<HTMLInputElement>(null);

  const Calculate = async () => {

    //get the input element
    const input = inputRef.current;

    //check if there is an input element
    if (!input) return;

    //get the value of the input and replace al the spaces to + symbols so there query would look like: ?number=1+2+3...
    const value = input.value.replaceAll(" ", "+");

    //use try catch so that we have error handling.
    try {
      //get the start time
      const startTime = Date.now();

      //fetch the data from our api
      const res = await fetcher(`/api/calculate-smallest-number?numbers=${value}`);

      //set the reponse time, we can then track how long our api took to return data to us.
      setResponseTime(Date.now() - startTime);

      //set the data in data useState
      setData(res)

    } catch (error) {
      //if there is an error, do something. For example give an alert.
      alert(error)
    }
  }

  return (
    <>
      <main className='flex justify-center flex-col items-center p-5 h-[90vh]'>

        <h2 className='md:max-w-[50vw] text-center'>Calculate the smallest number that can be divided by each of the numbers from 1 to ... without any remainder</h2>

        <div className="py-10">
          {/* if there is a number from the api, show it */}
          {responseTime ?
            <p>{`Response time: ${responseTime} ms`}</p>
            : null}
          {data?.number ?
            <p>{`Answer: ${data?.number}`}</p>
            : null}
        </div>

        <div className='flex gap-5 items-end'>

          {/* input component */}
          <Input placeholder="1 2 3 ..." errorMessage={data?.errorMessage} inputRef={inputRef} />

          {/* button component, fire the calculate function onclick */}
          <Button onClick={Calculate}>Calculate</Button>

        </div>
      </main>

      <footer className="h-[10vh] border-t border-black flex justify-center items-center">
        Made by Nick Voerman
      </footer>
    </>
  )
}

export default Home
