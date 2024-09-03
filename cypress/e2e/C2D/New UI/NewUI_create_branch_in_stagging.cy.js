

// apiBaseUrl = Cypress.env('New_UI_CYPRESS_API_BASE_URL');
//     projectUrl = Cypress.env('New_UI_CYPRESS_PROJECT_URL');
//     homeUrl = Cypress.env('New_UI_CYPRESS_HOME_URL');

import {  generateRandomString, NewUI_BuildValidation, NewUI_ConnectButtonValidation, NewUI_CreateBranchInStagging, NewUI_CreateNewProject, NewUI_deleteproject, NewUI_HistoryValidation, NewUI_Logs, NewUI_OpenProjectbranch, NewUI_SuccessStatusValidation, NewUI_TabsValidationProduction, OpenProjectbranch, SuccessStatusValidation, TabsValidation, toastMessageValidation } from "../../../support/utilities";


let projectURL;
let projectName;
let branchName= generateRandomString(2);

// let projectName= "Project-branchAKA";
// let branchName="main";

describe("create_branch_in_stagging",()=>{
  
    beforeEach(()=>{
     
        cy.NewUI_ForProdEnvironment().then((url)=>{
      projectURL=url;
     });

     Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });

    })

     it("create_branch_in_stagging",()=>{
       
       projectName=NewUI_CreateNewProject(projectURL);
        NewUI_CreateBranchInStagging(projectName,branchName,projectURL);
         NewUI_OpenProjectbranch(projectName,branchName,projectURL);
         NewUI_HistoryValidation();
         NewUI_ConnectButtonValidation();
         NewUI_SuccessStatusValidation();
        NewUI_Logs(projectName,branchName);
         //NewUI_TabsValidationProduction();
         NewUI_BuildValidation(branchName);
         
     })
     it("delete project",()=>{
      NewUI_deleteproject(projectURL,projectName);
   })

})