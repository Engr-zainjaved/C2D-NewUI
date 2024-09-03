import { generateRandomString, NewUI_BuildValidation, NewUI_ConnectButtonValidation, NewUI_createBranchInDevelopment, NewUI_CreateNewProject, NewUI_deleteproject, NewUI_HistoryValidation, NewUI_OpenProjectbranch, NewUI_SuccessStatusValidation, NewUI_TabsValidationDevelopment, NewUI_TabsValidationProduction, NewUI_toastMessageValidation } from "../../../support/utilities";


let projectURL;
let projectName;
let branchName=generateRandomString(2);

// let projectName="Project-branchSOY";
// let branchName="branchOW";

describe('move_branch_dev_to_stagging', () => {
  
  beforeEach(()=>{
    cy.NewUI_ForProdEnvironment().then((url)=>{
        projectURL=url;
       });
  
       Cypress.on("uncaught:exception", (err, runnable) => {
          return false;
        });

  })

  it('move_branch_dev_to_stagging',()=>{
        projectName=NewUI_CreateNewProject(projectURL);
        NewUI_createBranchInDevelopment(projectName,branchName,projectURL);
      //  NewUI_OpenProjectbranch(projectName,branchName,projectURL);
        cy.contains(`[data-testid='${branchName}-17']`,branchName).dragTo("div#Staging");
        cy.get('.btn-primary').click();
        cy.contains("div[class='environments-wrapper']",branchName).click();
        //NewUI_toastMessageValidation("",10*60*1000)
        NewUI_ConnectButtonValidation() ;
        NewUI_SuccessStatusValidation();
        NewUI_HistoryValidation();
       // NewUI_TabsValidationProduction();
        NewUI_BuildValidation(branchName);

  })
  it("delete project",()=>{
    NewUI_deleteproject(projectURL,projectName);
  })

})
