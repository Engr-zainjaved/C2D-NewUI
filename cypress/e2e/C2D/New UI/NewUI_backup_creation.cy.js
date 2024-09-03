///<reference types="cypress"/>

import { generateRandomString, NewUI_ConnectButtonValidation, NewUI_CreateBranchInStagging, NewUI_CreateNewProject, NewUI_deleteproject, NewUI_OpenProject, NewUI_OpenProjectbranch, NewUI_OpenProjectbranchBackups, NewUI_toastMessageValidation, NewUI_toastMessageValidationDual, toastMessageValidation } from "../../../support/utilities";

let projectURL;
// let projectName="projectbranchdwr";
// let branchName="branchgf";
let projectName;
let branchName=generateRandomString(2);

describe('backup_creations', () => {
    beforeEach(()=>{
        
        cy.NewUI_ForProdEnvironment().then((url)=>{
            projectURL=url;
        })

        Cypress.on("uncaught:exception",(err,runnable)=>{
            return false;
        })

    })

    it("Backup Creations",()=>{
          projectName=NewUI_CreateNewProject(projectURL);
          NewUI_CreateBranchInStagging(projectName,branchName,projectURL);
            NewUI_ConnectButtonValidation();
        //  NewUI_OpenProjectbranch(projectName,branchName, projectURL);
        cy.get(`.btn.btn-sm.dh-nav-item[href='/project/${projectName}/branches/${branchName}/backups']`).should("be.visible");
        
        cy.get(`.btn.btn-sm.dh-nav-item[href='/project/${projectName}/branches/${branchName}/backups']`).click();
        cy.contains("button.btn-lg.btn-primary","Create backup").click();
        cy.contains("span[style='margin-right: 10px;']","Create").click();
        cy.wait("@getBackups" ,{ timeout:1*60*1000 }).its("response.statusCode").should("eq", 200);
        cy.wait('@postBackup', { timeout : 1*60*1000}).its("response.statusCode").should("eq", 201);
        cy.wait("@getBackups" ,{ timeout:1*60*1000 }).its("response.statusCode").should("eq", 200);
       NewUI_toastMessageValidation("Manual backup has been started!",6*60*1000);
       cy.get("path[d='M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z'][fill-rule='evenodd']").click({ multiple: true });
       NewUI_toastMessageValidationDual("Database backup completed","Database backup failed with errors",6*60*1000);
        cy.get('body > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > main:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(6)',)
          .invoke('text') // Get the text content
          .then((text) => {
            const number = parseFloat(text); // Extract the number (ignoring any non-numeric characters)
            expect(number).to.be.greaterThan(0); // Assert that the number is greater than 0
          });


    })

    it.skip("delet backup",()=>{
        NewUI_OpenProjectbranch(projectName,branchName, projectURL);
        cy.get(`.btn.btn-sm.dh-nav-item[href='/project/DND1_MergBranchProd/branches/AlreadyPresentC/backups']`).should("be.visible");
        // cy.get(`.btn.btn-sm.dh-nav-item[href='/project/${projectName}/branches/${branchName}/backups']`).click();
        cy.get(`.btn.btn-sm.dh-nav-item[href='/project/DND1_MergBranchProd/branches/AlreadyPresentC/backups']`).click();
        cy.wait("@getBackups" ,{ timeout:2*60*1000 }).its("response.statusCode").should("eq", 200);
        cy.get('.backups-scrolller.w-100')       // Select the scrolling container
        .trigger('mouseover')           // Trigger a mouseover event to simulate hovering
        .scrollTo('right') 
                     // Scroll the container to the right
        // .get('.backups-table tr')       // Select all rows in the table
        // .eq(1)                          // Get the second row (index 1)
       
        cy.get('.backups-scrolller.w-100')
        .get('.backups-table tr')       // Select all rows in the table
        .eq(1) 
         .trigger('mouseover') .scrollTo('right')           // Trigger a mouseover event to simulate hovering
        .within((backup_scroller) => {                 // Scope the subsequent command within the second row
          cy.get(".btn-danger.btn-only-icon.c2d-btn[css='1']")
            .click();                   // Click the button within the hovered row
        });

        cy.contains("span[style='margin-right: 10px;'][xpath='1']","Delete").click();
    })

    it("delete created project",()=>{
        NewUI_deleteproject(projectURL,projectName);
  })
})

