import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node'; //mock server
import { rest } from 'msw';  //mock server
import { MemoryRouter } from 'react-router';  //to wrap the component which has to display <Link>. As <Link> is sespectto reach out ReactRouterContext on a top
import HomeRoute from './HomeRoute';

import {createServer} from '../test/server';

createServer([{
    path: '/api/repositories',
    method: "get",
    res: (req, res, ctx)=>{
        const lang = req.url.searchParams.get('q').split('language:')[1];
        return {
            items: [
                  { id: 1, full_name: `${lang}_one` },
                  { id: 2, full_name: `${lang}_two` },
              ]
    }
    }
}]);

test('renders two links for each language', async () => {
    render(                          //msw server response is async
      <MemoryRouter>
          <HomeRoute/>
      </MemoryRouter>
    );
    /* await pause(); //to wait the response of the server
     screen.debug();*/

    // expect 6 tables.
    const languages = [
        'javascript',
        'typescript',
        'rust',
        'go',
        'python',
        'java'
    ];
// Loop over all langs, makesure to see 2links per lang
    for (let lang of languages) {
        const links = await screen.findAllByRole('link', {
            name: new RegExp(`${lang}_`)
        });
        expect(links).toHaveLength(2);

        //Asset that the links have the appropriate full_name
        expect(links[0]).toHaveTextContent(`${lang}_one`);
        expect(links[1]).toHaveTextContent(`${lang}_two`);

        expect(links[0]).toHaveAttribute('href', `/repositories/${lang}_one`);
        expect(links[1]).toHaveAttribute('href', `/repositories/${lang}_two`);
    }



});

// const pause  = ()=> new Promise(resolve=>{
//     setTimeout(resolve, 100)
// });

//OLD server mock. Nowdeleagted to '../test/server'
//
// const handlers = [                                                                 //request interception
//     rest.get('/api/repositories', (req, res, ctx) => {
//         const lang = req.url.searchParams.get('q').split('language:')[1];
//
//         return res(
//           ctx.json({
//               items: [
//                   { id: 1, full_name: `${lang}_one` },
//                   { id: 2, full_name: `${lang}_two` },
//               ],
//           })
//         );
//     }),
// ];
//
// //mock server start
// const server = setupServer(...handlers); //to setUp the server
//
// beforeAll(() => {   //jest library. function executed automatically
//     server.listen(); // to start server and lisent to it before all tests
// });
//
// afterEach(() => {  //jest library. function executed automatically
//     server.resetHandlers();  //to reset handlers to initial default state
// });
//
// afterAll(() => {   //jest library. function executed automatically
//     server.close();// stop running sever after all test
// });

//mock server end
