///<reference types="cypress"/>

import { generateRandomString, NewUI_BuildValidation, NewUI_ConnectButtonValidation, NewUI_CreateBranchInStagging, NewUI_CreateNewProject, NewUI_deleteproject, NewUI_HistoryValidation, NewUI_OpenProject, NewUI_SuccessStatusValidation, NewUI_toastMessageValidation } from "../../../support/utilities";


let projectURL;
let projectName="dndmerge1";
let branchName1="branchone";
let branchName2="main";
let mergeState = 'first-to-second';


describe('merge_branches_on_different_Stages', () => {
  beforeEach(()=>{

    cy.NewUI_ForProdEnvironment().then((url)=>{
        projectURL=url;
       });


    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });


      cy.readFile('NewUI_mergeState.txt').then((state) => {
        mergeState = state.trim();
      });

    })


    it('merges_branches_cyclically', () => {
        if (mergeState === 'first-to-second') {
          NewUI_OpenProject(projectName,projectURL);
          cy.contains("div[class='environments-wrapper']",branchName1).should("be.visible");
          cy.contains("div[class='environments-wrapper']",branchName2).should("be.visible");
          cy.contains(`[data-testid='${branchName1}-17']`,`${branchName1}`).dragTo(`[data-testid='${branchName2}-17']`, { force: true });
          cy.wait(2000);
          cy.get(".btn-primary[type='button']").click();
    
        //   toastMessageValidation('Merge operation performed successfully', 6000);
        //   toastMessageValidation('Branch has been updated (new commit received)', 6000);
    
          mergeState = 'second-to-first';
          cy.writeFile('NewUI_mergeState.txt', mergeState);
    
          cy.reload();
          cy.contains(`[data-testid='${branchName1}-17']`,`${branchName1}`)
            .should('be.visible')
            .click()
            .then(() => {
              cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
              cy.wait('@getProjectTracking', { timeout: 600000 }).its('response.statusCode').should('eq', 200);
              //NewUI_toastMessageValidation("",10*60*1000)
             
              NewUI_HistoryValidation();
            
            });
        } else {
            NewUI_OpenProject(projectName,projectURL);
            cy.contains(`[data-testid='${branchName2}-17']`,`${branchName2}`).dragTo(`[data-testid='${branchName1}-17']`, { force: true });
            cy.wait(2000);
            cy.get(".btn-primary[type='button']").click();
        //   toastMessageValidation('Merge operation performed successfully', 6000);
        //   toastMessageValidation('Branch has been updated (new commit received)', 6000);
          mergeState = 'first-to-second';
          cy.writeFile('NewUI_mergeState.txt', mergeState);
          cy.reload();
          cy.contains(`[data-testid='${branchName2}-17']`,`${branchName2}`)
            .should('be.visible')
            .click()
            .then(() => {
              cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
              cy.wait('@getProjectTracking', { timeout: 600000 }).its('response.statusCode').should('eq', 200);
             //NewUI_toastMessageValidation("",10*60*1000)
            
             NewUI_HistoryValidation();
             
             
            });
        }
      });
   

   
})


