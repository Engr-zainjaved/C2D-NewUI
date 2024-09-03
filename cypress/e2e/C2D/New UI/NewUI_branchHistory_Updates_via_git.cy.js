///<reference types="cypress"/>

import { NewUI_HistoryValidation, NewUI_OpenProjectbranch } from "../../../support/utilities";

let projectName="dndmerge1";
let branchName="branchone";
let projectURL;

describe('branchHistory_Updates_via_git', () => {
    beforeEach(()=>{

        cy.NewUI_ForProdEnvironment().then((url)=>{
         projectURL=url;
        });
   
        Cypress.on("uncaught:exception", (err, runnable) => {
           return false;
         });
   
       })


       it("History validate",()=>{
        NewUI_OpenProjectbranch(projectName,branchName,projectURL);
        NewUI_HistoryValidation();

       })
})
