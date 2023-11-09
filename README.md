### To run App
run `npm run start`


### To run test
run `npm test`

### to display the rendered component to console 
screen.debug()

### To render and screen component
import { render, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router"; //to create router context. to provide router to component
example : 
render(
          <MemoryRouter>
              <MyComponent repository={repository}/>
          </MemoryRouter>
        );

### Data Fetching

1.Mock the file that contains data fetching: jest.mock
2.Use a library to mock axios: mock service worker - msw library, intercept request and automatically return response
 import { setupServer } from 'msw/node';
 import { rest } from 'msw';
//mock server start
const server = setupServer(...handlers); //to setUp the server

beforeAll(() => {   //jest library. function executed automatically
    server.listen(); // to start server and lisent to it before all tests
});

afterEach(() => {  //jest library. function executed automatically
    server.resetHandlers();  //to reset handlers to initial default state
});

afterAll(() => {   //jest library. function executed automatically
    server.close();// stop running sever after all test
});

3. Createa manual mock for axios

###Setting debugger
- Add to script section in packege.json
"test:debug" : "react-scripts --inspect-brk test --runInBand --no-cache",
- Add 
  debugger 
  to testing component
-run `npm run test:debug`
- in browser navigate to 'about:inspect' in chrome
  

