///<reference types="cypress" />

import { DropStatusValidation, NewUI_BuildValidation, NewUI_ConnectButtonValidation, NewUI_CreateNewProject, NewUI_deleteproject, NewUI_DroppedButtonValidation, NewUI_HistoryValidation, NewUI_Logs, NewUI_OpenProject, NewUI_SuccessStatusValidation, NewUI_toastMessageValidation } from "../../../support/utilities";

let projectURL;
let projectName;
let branchName="main";

// let projectName="Project-branchPLO";
// let branchName="main";


describe('validating Previous Build drops on stage change', () => {
    beforeEach(()=>{
        
        cy.NewUI_ForProdEnvironment().then((url)=>{
            projectURL=url;
        })

        Cypress.on("uncaught:exception",(err,runnable)=>{
            return false;
        })

    })

    it('Dropping_inprogress_build (dev_to_stagging)', () => {
      
        projectName=NewUI_CreateNewProject(projectURL);
        
        cy.contains(`[data-testid='${branchName}-17']`,branchName).dragTo("div#Staging");
        cy.get('.btn-primary').click();
        cy.wait('@getProjectTracking',{ timeout: 10000 }).its('response.statusCode').should('eq', 200);
        cy.contains("div[class='environments-wrapper']",branchName).click();
        cy.reload();
        NewUI_toastMessageValidation("Build has been dropped",15*60*1000)
        NewUI_ConnectButtonValidation() ;
        NewUI_SuccessStatusValidation();
        NewUI_DroppedButtonValidation();
       
        
        NewUI_HistoryValidation();
        NewUI_Logs(projectName,branchName);
       // NewUI_TabsValidationProduction();
        NewUI_BuildValidation(branchName);

        
      });


      it('dropping_Already_Created_branch (stagging_to_dev) ', () => {
        NewUI_OpenProject(projectName,projectURL);
        
        cy.contains(`[data-testid='${branchName}-17']`,branchName).dragTo("div#Development");
        cy.get('.btn-primary').click();
        cy.wait('@getProjectTracking',{ timeout: 10000 }).its('response.statusCode').should('eq', 200);
        cy.reload();

        cy.contains("div[class='environments-wrapper']",branchName).click();
        NewUI_toastMessageValidation("Build has been dropped",15*60*1000)
        NewUI_ConnectButtonValidation() ;
        NewUI_SuccessStatusValidation();
        NewUI_DroppedButtonValidation();
       
        
        NewUI_HistoryValidation();
        NewUI_Logs(projectName,branchName);
       // NewUI_TabsValidationProduction();
        NewUI_BuildValidation(branchName);
      });

      it("delete project",()=>{
        NewUI_deleteproject(projectURL,projectName);
     })
})
