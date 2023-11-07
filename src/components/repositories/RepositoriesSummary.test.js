import RepositoriesSummary from "./RepositoriesSummary";
import {render, screen} from "@testing-library/react";
import {expect} from "@playwright/test";

describe("RepositoriesList", ()=>{
    it('displays info about repo', ()=>{
        const repository = {
            language: "Javascript",
            stargazers_count: 5,
            forks: 30,
            open_issues: 1
        }
        render(<RepositoriesSummary repository={repository}/>)

        for (let key in repository){
            const value = repository[key];
            const element = screen.getByText(new RegExp(value));
            expect(element).toBeInTheDocument();
        }
    })

})