

// apiBaseUrl = Cypress.env('New_UI_CYPRESS_API_BASE_URL');
//     projectUrl = Cypress.env('New_UI_CYPRESS_PROJECT_URL');
//     homeUrl = Cypress.env('New_UI_CYPRESS_HOME_URL');

import { NewUI_CreateNewProject, NewUI_deleteproject } from "../../../support/utilities";


let projectURL;
let projectName;

describe("NewUI_ Create new project",()=>{
  
    beforeEach(()=>{
     cy.NewUI_ForProdEnvironment().then((url)=>{
      projectURL=url;
     });
    })

     it("CreateProject",()=>{

       projectName=NewUI_CreateNewProject(projectURL);
         
     })
     it("delete project",()=>{
      NewUI_deleteproject(projectURL,projectName);
   })
})