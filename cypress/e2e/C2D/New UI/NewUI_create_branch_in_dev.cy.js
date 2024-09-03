
import { generateRandomString, NewUI_BuildValidation, NewUI_ConnectButtonValidation, NewUI_createBranchInDevelopment, NewUI_CreateNewProject, NewUI_deleteproject, NewUI_HistoryValidation, NewUI_Logs, NewUI_SuccessStatusValidation, NewUI_TabsValidationDevelopment, NewUI_TabsValidationProduction } from "../../../support/utilities"

let projectURL;
let projectName;
let branchName=generateRandomString(2);

describe('create_branch_in_dev', () => {
  
    beforeEach('',()=>{
        
        cy.NewUI_ForProdEnvironment().then((url)=>{
            projectURL= url
        })
        Cypress.on("uncaught:exception", (err, runnable) => {
            return false;
          });
    })



    it("create_branch_in_dev",()=>{
        projectName=NewUI_CreateNewProject(projectURL);
        NewUI_createBranchInDevelopment(projectName,branchName,projectURL);
        NewUI_ConnectButtonValidation();
        NewUI_SuccessStatusValidation();
        
        NewUI_HistoryValidation();
        //NewUI_TabsValidationDevelopment();
        NewUI_Logs(projectName,branchName);
        NewUI_BuildValidation(branchName);
    })
    it("delete project",()=>{
        NewUI_deleteproject(projectURL,projectName);
     })
})
