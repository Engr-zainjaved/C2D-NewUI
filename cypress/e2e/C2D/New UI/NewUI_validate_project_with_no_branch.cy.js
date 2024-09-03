

// apiBaseUrl = Cypress.env('New_UI_CYPRESS_API_BASE_URL');
//     projectUrl = Cypress.env('New_UI_CYPRESS_PROJECT_URL');
//     homeUrl = Cypress.env('New_UI_CYPRESS_HOME_URL');

import {  NewUI_CreateNewProject, NewUI_HistoryValidation, NewUI_OpenProject, NewUI_toastMessageValidation } from "../../../support/utilities";


let projectURL;
let projectName="DND2_NobranchProd2";


describe("validate_project_with_no_branch.",()=>{
  
    beforeEach(()=>{
     
        cy.NewUI_ForProdEnvironment().then((url)=>{
      projectURL=url;
     });

     Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });

    })

     it("validate_project_with_no_branch.",()=>{

      cy.visit(projectURL);
      cy.wait('@getProjects', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
      cy.contains('div', projectName).should('be.visible').click();
      let message="Oops, it looks like you have no branches";
       NewUI_toastMessageValidation(message,2*60*1000)
         
     })
})