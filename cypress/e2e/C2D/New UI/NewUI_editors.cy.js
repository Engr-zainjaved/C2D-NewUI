import { generateRandomString, NewUI_ConnectButtonValidation, NewUI_CreateBranchInStagging, NewUI_CreateNewProject, NewUI_OpenProjectbranch, NewUI_toastMessageValidationDual } from '../../../support/utilities';


let projectURL;
let projectName;
let branchName=generateRandomString(2);

// let projectName="projectbranchfho";
// let branchName="branchso";

describe('NewUI_Editor', () => {
  beforeEach(()=>{
        
    cy.NewUI_ForProdEnvironment().then((url)=>{
        projectURL=url;
    })

    Cypress.on("uncaught:exception",(err,runnable)=>{
        return false;
    })

})

  it('Editor', () => {
    projectName=NewUI_CreateNewProject(projectURL);
    NewUI_CreateBranchInStagging(projectName,branchName,projectURL);
    // NewUI_toastMessageValidationDual("Build is now ready to connect!","Build failed with errors",11*60*1000 )
      NewUI_ConnectButtonValidation();
    // NewUI_OpenProjectbranch(projectName, branchName, projectURL);
     cy.reload();
     cy.wait("@getProjectTracking", { timeout : 20000 }).its("response.statusCode").should("eq",200);

     NewUI_OpenProjectbranch(projectName,branchName,projectURL);

    cy.get("a.btn.btn-sm.dh-nav-item[rel='noopener'][role='button'][target='_blank']")
    .contains("Editor")               
    .should('be.visible')             
    .invoke("removeAttr", "target")   
    .click({force: true});                         
 
    cy.wait(10000);

    cy.get('.jp-BreadCrumbs-home').dblclick();
        cy.get(':nth-child(2) > .jp-DirListing-itemText').should('contain.text', 'src').dblclick();
        cy.get(':nth-child(1) > .jp-DirListing-itemText').should('contain.text', 'odoo').dblclick();
        cy.get('.jp-BreadCrumbs-home').dblclick();


  });
});
