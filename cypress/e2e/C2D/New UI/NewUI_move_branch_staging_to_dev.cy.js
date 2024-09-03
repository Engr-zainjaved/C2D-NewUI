///<reference types="cypress"/>

import { generateRandomString, NewUI_BuildValidation, NewUI_ConnectButtonValidation, NewUI_CreateBranchInStagging, NewUI_CreateNewProject, NewUI_deleteproject, NewUI_HistoryValidation, NewUI_Logs, NewUI_SuccessStatusValidation } from "../../../support/utilities";


let projectURL;
let projectName;
let branchName=generateRandomString(2);

describe('move_branch_staging_to_dev', () => {
  beforeEach(()=>{
    cy.NewUI_ForProdEnvironment().then((url)=>{
        projectURL=url;
       });
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });
    })


    it('move_branch_staging_to_dev',()=>{
        projectName=NewUI_CreateNewProject(projectURL)
        NewUI_CreateBranchInStagging(projectName,branchName,projectURL);
        cy.contains(`[data-testid='${branchName}-17']`,branchName).dragTo("div#Development");
        cy.get('.btn-primary').click();
        cy.wait(2000)
        cy.reload();
        cy.wait(2000)
        cy.wait("@getProjectTracking", { timeout : 20000 }).its("response.statusCode").should('eq',200);
        cy.contains(`[data-testid='${branchName}-17']`,branchName).click();

        cy.get('body').then((body)=>{
          if(body.find(`.branch-name:contains(${branchName.toUpperCase()})`).length > 0)
          {
             cy.log(`branch opened : ${branchName}`)
          }
          else
          {
            cy.contains(`[data-testid='${branchName}-17']`,branchName).click();
            cy.get(".branch-name").contains(`${branchName}`).should("be.visible");
          }
        })
       
        //NewUI_toastMessageValidation("",10*60*1000)
        NewUI_ConnectButtonValidation() ;
        NewUI_SuccessStatusValidation();
        NewUI_HistoryValidation();
        NewUI_Logs(projectName,branchName);
       // NewUI_TabsValidationProduction();
        NewUI_BuildValidation(branchName);
    })
    it("delete project",()=>{
      NewUI_deleteproject(projectURL,projectName);
    })
})


