import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { createServer } from '../../test/server';
import AuthButtons from './AuthButtons';
import {SWRConfig} from 'swr';

const renderComponent = async()=>{
     render(
       <SWRConfig value={{provider: () => new Map()}}>
           <MemoryRouter>
               <AuthButtons/>
           </MemoryRouter>
       </SWRConfig>

    );
    await screen.findAllByRole('link');
};

describe('When user is SingedIn', ()=>{
    //CreateServer GET '/api/user' ---> {user: {id: 3, email: user@email.com}
    createServer([
        {
            method: 'get',
            path: '/api/user',
            res: ()=>{
                return {user: {id: 3, email: "email@test.be"}}
            }
        }
    ]);
    test('sign in and sign up are not visible', async () => {

        await renderComponent();

        const signInButton = screen.queryByRole('link', {
            name: /sign in/i,
        });
        const signUpButton = screen.queryByRole('link', {
            name: /sign up/i,
        });

        expect(signInButton).not.toBeInTheDocument();
        expect(signUpButton).not.toBeInTheDocument();
    });
    test('sign out is visible', async () => {
        await renderComponent();

        const signOutButton = screen.getByRole('link', {
            name: /sign out/i,
        });

        expect(signOutButton).toBeInTheDocument();
        expect(signOutButton).toHaveAttribute('href', '/signout');
    });
});
describe('When user is NOT signedIn', ()=>{
    //CreateServer GET '/api/user' ---> {user: null}
    createServer([
        {
            method: 'get',
            path: '/api/user',
            res: ()=>{
                return {user: null}
            }
        }
    ]);
    test('signIn and signUp is visible', async () => {

        await renderComponent();

        const signInButton = screen.getByRole('link', {name: /sign in/i});
        const signUpButton = screen.getByRole('link', {name: /sign up/i});

        expect(signInButton).toBeInTheDocument();
        expect(signInButton).toHaveAttribute('href', '/signin');

        expect(signUpButton).toBeInTheDocument();
        expect(signUpButton).toHaveAttribute('href', '/signup');

        // screen.debug();
        // await pause();
        // screen.debug();
    });
    test(' signOut is NOT visible', async () => {
        await renderComponent();

        const signOutButton = screen.queryByRole("link", {name: /sign out/i})
        expect(signOutButton).not.toBeInTheDocument();
    });
});






// const pause = () => new Promise(resolve => {
//     setTimeout(resolve, 100)
// })


