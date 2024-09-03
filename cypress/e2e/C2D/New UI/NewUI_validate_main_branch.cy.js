

// apiBaseUrl = Cypress.env('New_UI_CYPRESS_API_BASE_URL');
//     projectUrl = Cypress.env('New_UI_CYPRESS_PROJECT_URL');
//     homeUrl = Cypress.env('New_UI_CYPRESS_HOME_URL');

import {  NewUI_CreateNewProject, NewUI_HistoryValidation } from "../../../support/utilities";


let projectURL;


describe("Validate_main_branch_in_new_project",()=>{
  
    beforeEach(()=>{
     
        cy.NewUI_ForProdEnvironment().then((url)=>{
      projectURL=url;
     });

     Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });

    })

     it("Validate_main_branch_in_new_project",()=>{

        NewUI_CreateNewProject(projectURL);
        NewUI_HistoryValidation();
         
     })
})