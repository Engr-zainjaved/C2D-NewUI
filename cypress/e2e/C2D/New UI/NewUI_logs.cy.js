///<reference types="cypress" />

import { NewUI_ConnectButtonValidation, NewUI_CreateNewProject, NewUI_deleteproject, NewUI_Logs, NewUI_OpenProjectbranch, NewUI_SuccessStatusValidation } from "../../../support/utilities";
import 'cypress-wait-until';


let projectURL;
let projectName;
let branchName="main";


// let projectName="projectbranchsza";
// let branchName="probranch";

describe('Hellow to the world', () => {
  
    beforeEach(()=>{
        
        cy.NewUI_ForProdEnvironment().then((url)=>{
            projectURL=url;
        })

        Cypress.on("uncaught:exception",(err,runnable)=>{
            return false;
        })

    })

    it('logs',()=>{
        //NewUI_OpenProjectbranch(projectName,branchName,projectURL);
      projectName =NewUI_CreateNewProject(projectURL)
      NewUI_ConnectButtonValidation();
      NewUI_SuccessStatusValidation();
        NewUI_Logs(projectName,branchName);
    })
    it("delete project",()=>{
        NewUI_deleteproject(projectURL,projectName);
     })
})
