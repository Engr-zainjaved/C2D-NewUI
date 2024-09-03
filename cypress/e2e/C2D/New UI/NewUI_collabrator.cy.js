///<reference types="cypress"/>

import { GoggarProjects, NewUI_CreateNewProject, NewUI_deleteproject, NewUI_toastMessageValidation } from "../../../support/utilities";


let projectURL;
let projectName;
let branchName;

describe('collabrator', () => {
 
    beforeEach(()=>{
    cy.NewUI_ForProdEnvironment().then((url)=>{
        projectURL=url;
    })

    Cypress.on("uncaught:exception",(err,runnable)=>{
        return false;
    })
  })

 it("collabrator",()=>{
     projectName=NewUI_CreateNewProject(projectURL);
     cy.get("[data-name='SvgIcon--CustomSetting']").click();
     cy.get("[placeholder='GitHub username']").type("pucar15sahiwal{enter}")
     cy.get(".dropdown-item").should("be.visible");
     cy.get(".dropdown-item").contains("pucar15sahiwal").click();
     cy.contains(".btn-hover-shadow.btn-primary[type='button']","Add").click();
     NewUI_toastMessageValidation("Collaborator added to the project.",5000);
     cy.wait(5000);
     cy.scrollTo("top");
    // cy.contains(".btn-close").click();
    cy.visit(`${projectURL}`);
    GoggarProjects();
     
     cy.get('.project-grid-card')
       .contains(projectName)
       .parents('.project-grid-card') // Ensure you have the correct card
       .within(() => {
         // Scope the following commands to this card
         cy.get('img.border').should('have.length', 2);
       });




 })

 it("delete project",()=>{
    NewUI_deleteproject(projectURL,projectName);
 })



})
