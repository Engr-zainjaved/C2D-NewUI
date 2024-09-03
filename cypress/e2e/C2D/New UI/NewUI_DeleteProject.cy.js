///<reference types="cypress" />
import { NewUI_CreateNewProject, NewUI_deleteproject } from "../../../support/utilities";


let projectURL;
let projectName;


describe("Delete Project",()=>{
  
    beforeEach(()=>{

     cy.NewUI_ForProdEnvironment().then((url)=>{
      projectURL=url;
     });

     Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });

    })

     it("CreateProject",()=>{

       projectName= NewUI_CreateNewProject(projectURL);
         
     })
     it ("Delete project",()=>{
        NewUI_deleteproject(projectURL,projectName)
     })
})