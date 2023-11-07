import { render, screen, act } from "@testing-library/react"; //act function - is not the best solution
import { MemoryRouter } from "react-router"; //to create router context. to provide router to component
import RepositoriesListItem from "./RepositoriesListItem";

// jest.mock('../tree/FileIcon', //1 arg - the path to file to component to be mocked
//         () => {                   //2 arg - the component to be returned as mock
//             return () => {
//                 return "File Icon Component"
//             }
//         }
// );

describe("RepositoriesListItem", () => {
    const renderComponent = () => {
        const repository = {
            full_name: "Full name",
            language: "Javascript",
            description: "Description",
            owner: {
                login : "facebook"
            },
            name: "Name",
            html_url: "https://githib.com/facebook/react"
        };

        render(
          <MemoryRouter>
              <RepositoriesListItem repository={repository}/>
          </MemoryRouter>
        )
        return {repository}
    }

    it("displays link to gitHub repo", async () => {
        const {repository} = renderComponent();
        await (screen.findByRole("img", { name: "Javascript" })) // Solution1: to solve the warning related to fetching data in useEffect (we shoulddetect element whichhas to appear after the fetching the dataand wait for this element

        const link = screen.getByRole('link', {name: /github repository/i});
        expect(link).toHaveAttribute('href', repository.html_url);

        //screen.debug()

        /* await act(async()=>{   //this is the worse method
           await pause();
         })*/

    })

    it('shows a file icon with the appropriate icon', async ()=>{
        renderComponent();
        const icon = await screen.findByRole('img', {name: "Javascript"});

        expect(icon).toHaveClass('js-icon');

    });

    it('shows the link to the code editor page', async ()=>{
        const {repository} = renderComponent();
        const link = await screen.findByRole('link', {
            name: new RegExp(repository.owner.login)
        });

        expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`)
    })
});

// const pause = () => {
//     return new Promise(resolve => {
//         setTimeout(()=>{
//             resolve();
//         }, 100)
//     })
// }
