import {  NewUI_CreateNewProjectUsingExistingRepo, NewUI_deleteproject } from "../../../support/utilities";
let projectURL;
let projectName;
describe('create_project_using_existing_repository', () => {
  

    beforeEach(()=>{
        
        cy.NewUI_ForProdEnvironment().then((url)=>{
            projectURL=url;
        })

        Cypress.on("uncaught:exception",(err,runnable)=>{
            return false;
        })

    })

    it("create_project_using_existing_repository",()=>{
        projectName=NewUI_CreateNewProjectUsingExistingRepo(projectURL);
    })
    it("Delete Project ",()=>{
        NewUI_deleteproject(projectURL,projectName);
    })
})
