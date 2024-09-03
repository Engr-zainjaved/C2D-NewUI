//cant_merge_branches_having_same_revision


///<reference types="cypress"/>

import { generateRandomString, NewUI_BuildValidation, NewUI_ConnectButtonValidation, NewUI_CreateBranchInStagging, NewUI_CreateNewProject, NewUI_deleteproject, NewUI_HistoryValidation, NewUI_SuccessStatusValidation, NewUI_toastMessageValidation } from "../../../support/utilities";


let projectURL;
let projectName;
let branchName=generateRandomString(2);

describe('cant_merge_branches_having_same_revision', () => {
  beforeEach(()=>{
    cy.NewUI_ForProdEnvironment().then((url)=>{
        projectURL=url;
       });
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });
    })


    it('cant_merge_branches_having_same_revision',()=>{
        projectName=NewUI_CreateNewProject(projectURL)
        NewUI_CreateBranchInStagging(projectName,branchName,projectURL);
        cy.contains(`[data-testid='main-17']`,"main").dragTo(`[data-testid='${branchName}-17']`);
        cy.get(".btn-primary[type='button']").click();
        NewUI_toastMessageValidation(`Failed to create pull request, Validation Failed: No commits between ${branchName} and main`,6*1000)
        cy.contains("div[class='environments-wrapper']",branchName).click();
        
       
    })

    it('Delete project',()=>{
      NewUI_deleteproject(projectURL,projectName);
    })
})


