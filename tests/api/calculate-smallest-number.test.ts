import { createMocks } from "node-mocks-http";
import handler from "../../pages/api/calculate-smallest-number";

//jest test https://jestjs.io/
test('1 to the 10', async () => {

  //create mock req and res object with our number input
  const { req, res } = createMocks({
    method: 'GET',
    query: {
      numbers: "1 2 3 4 5 6 7 8 9 10",
    },
  });

  //await the api route handler
  await handler(req, res);

  //expect status code to be 200
  expect(res._getStatusCode()).toBe(200);

  //expect the result to be number: 2520
  expect(JSON.parse(res._getData())).toEqual(
    expect.objectContaining({
      number: 2520,
    }),
  );
})
