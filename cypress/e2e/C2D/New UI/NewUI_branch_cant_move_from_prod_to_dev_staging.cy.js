///<reference types="cypress"/>

import { generateRandomString, NewUI_BuildValidation, NewUI_ConnectButtonValidation, NewUI_CreateBranchInStagging, NewUI_CreateNewProject, NewUI_deleteproject, NewUI_HistoryValidation, NewUI_SuccessStatusValidation, NewUI_toastMessageValidation } from "../../../support/utilities";


let projectURL;
let projectName;
let branchName="main";

describe('branch_cant_move_from_prod_to_dev/staging', () => {
  beforeEach(()=>{
    cy.NewUI_ForProdEnvironment().then((url)=>{
        projectURL=url;
       });
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });
    })


    it('branch_cant_move_from_prod_to_dev/staging',()=>{
        projectName=NewUI_CreateNewProject(projectURL)
        cy.contains(`[data-testid='${branchName}-17']`,branchName).dragTo("div#Production");
        cy.get('.btn-primary').click();
        cy.wait(2000)
        cy.contains(`[data-testid='${branchName}-17']`,branchName).dragTo("div#Staging");
        cy.get('.btn-primary').click();
        NewUI_toastMessageValidation("You can not change stage of Production branch.",6*1000)
        cy.contains(`[data-testid='${branchName}-17']`,branchName).dragTo("div#Development");
        cy.get('.btn-primary').click();
        NewUI_toastMessageValidation("You can not change stage of Production branch.",6*1000)
        cy.contains("div[class='environments-wrapper']",branchName).click();

    })
    it("delete project",()=>{
      NewUI_deleteproject(projectURL,projectName);
   })
})


