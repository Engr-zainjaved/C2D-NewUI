///<reference types="cypress"  />

// const baseUrl = Cypress.env('CYPRESS_API_BASE_URL');
// const projectUrl = Cypress.env('CYPRESS_PROJECT_URL');
// const homeUrl = Cypress.env('CYPRESS_HOME_URL');
// const prodUrl = 'https://api.click2deploy.com/api/v1';

export const generateRandomString = (length) => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return 'branch' + result;
};

export const toastMessageValidation = (message, time) => {
  cy.contains("div[role='alert']", message, { timeout: time }).should('be.visible');
};

export const HistoryValidation = () => {
  cy.get("div[class='d-flex justify-content-between'] div:nth-child(1)")
    .should('be.visible')
    .then(($element) => {
      cy.log('Branch History :' + $element.text());
    });
};

export const ConnectButtonValidation = () => {
  let time = 15 * 60 * 1000;
  cy.get("button[class='btn btn-success']", { timeout: time }).should('be.visible');
};

export const DroppedButtonValidation = () => {
  let time = 10 * 60 * 1000;
  toastMessageValidation('Build completed successfully', time);
  cy.reload();

  cy.contains('span', 'Dropped').should('be.visible');
  cy.contains('span', 'Success').should('be.visible');
};

export const SuccessStatusValidation = () => {
  cy.contains('span', 'Success').should('be.visible');
  cy.log('Build succeeded');
};

export const DropStatusValidation = () => {
  cy.wait(3000);
  cy.contains('span', 'Dropped').should('be.visible');
  cy.log('Merged succeed');
};

export const LogValidation = () => {
  // cy.intercept("GET","https://api.click2deploy.com/api/v1/builds/app-logs/*").as("LogsFetch");
  // cy.intercept("GET","https://api.click2deploy.com/api/v1/builds/build-logs/*").as("BuildsLog");
  //https://dev-api.erp-deploy.com/api/v1/builds/build-logs/942
  cy.contains('div', 'LOGS').click();

  cy.wait('@LogsFetch', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.get('.card-body > div').should('contain.text', "Finished 'clean'");
  cy.get('#defaultSelect').select('build.log');
  cy.wait('@BuildsLog', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.get('.card-body > div').should('contain.text', 'Build succeeded');

  applogs();
  installlogs();
};

export const MergLogValidation = () => {
  cy.intercept('GET', 'https://api.click2deploy.com/api/v1/builds/app-logs/*').as('LogsFetch');
  cy.intercept('GET', 'https://api.click2deploy.com/api/v1/builds/build-logs/*').as('BuildsLog');
  cy.contains('div', 'LOGS').click();

  cy.wait('@LogsFetch', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.get('.card-body > div').should('contain.text', "Finished 'clean'");
  cy.get('#defaultSelect').select('build.log');
  let time = 3000;
  toastMessageValidation('No build logs found on build server', time);

  applogs();
  installlogs();
};

export const LogValidationStaggingToDev = () => {
  cy.intercept('GET', 'https://api.click2deploy.com/api/v1/builds/app-logs/*').as('LogsFetch');
  cy.intercept('GET', 'https://api.click2deploy.com/api/v1/builds/build-logs/*').as('BuildsLog');
  cy.contains('div', 'LOGS').click();

  cy.get('#defaultSelect').select('build.log').should('have.value', '2');
  cy.get('@BuildsLog', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.get('.card-body > div').should('contain.text', 'Phase complete: DOWNLOAD_SOURCE State: SUCCEEDED');

  applogs();
  installlogs();
};

export const applogs = () => {
  cy.contains('div', 'LOGS').click();

  cy.wait('@LogsFetch', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.get('#defaultSelect').select('app.log').should('have.value', 'app');

  cy.get('.card-body > div').should('contain.text', 'jupyter_lsp | extension was successfully linked.');
};

export const installlogs = () => {
  cy.contains('div', 'LOGS').click();

  cy.wait('@LogsFetch', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.get('#defaultSelect').select('install.log').should('have.value', 'install');
  cy.wait(4000);
  cy.get('.card-body > div').should('contain.text', 'init db');
};

export const OpenProjectbranch = (projectName, branchName, ProjectURL) => {
  cy.visit(ProjectURL);
  cy.intercept('GET', `https://api.click2deploy.com/api/v1/user/project').as('getProjects`);
  cy.wait('@getProjects', { timeout: 20000 }).its('response.statusCode').should('eq', 200);

  cy.contains('div', projectName).should('be.visible').click();
  cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.contains('button', 'Development').should('be.visible');
  cy.get('.aside-body')
    .scrollIntoView()
    .then(($element) => {
      const hasScrollbar = $element.get(0).scrollHeight > $element.get(0).clientHeight;
      if (hasScrollbar) {
        cy.get('.aside-body').trigger('mouseover').scrollTo('bottom');
      }
    });
  cy.contains('div[style^="cursor: pointer;"]', branchName).click();
  cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
  cy.wait(3000);
};

export const DeleteBranch = (projectName, branchName, ProjectURL) => {
  cy.wait(2000);
  OpenProjectbranch(projectName, branchName, ProjectURL);
  cy.get("div[id='__next'] div:nth-child(8) div:nth-child(1)")
    .last()
    .should('contain', 'SETTINGS')
    .should('be.visible')
    .click({ force: true });

  cy.wait(2000);
  cy.get('.btn.btn-danger').click();
  cy.get('input[name="confirmationName"]').type(branchName);
  cy.wait(2000);
  cy.get('button.btn.btn-outline-danger').click();
  cy.wait(3000);
};

export const BuildValidation = () => {
  let openedUrl;
  cy.get("button[class='btn btn-success']").should('be.visible');
  cy.window().then((win) => {
    cy.stub(win, 'open')
      .callsFake((url) => {
        openedUrl = url;
        return win.open.wrappedMethod.call(win, openedUrl, '_self');
      })
      .as('windowOpen');
  });

  cy.get("button[class='btn btn-success']").contains('Connect').click();

  cy.get('@windowOpen')
    .then((stub) => {
      const args = stub.args;
      if (args.length > 0) {
        openedUrl = args[0][0];
        if (openedUrl) {
          cy.log('Opened URL:', openedUrl);
          cy.visit(openedUrl, { timeout: 90000 });
        } else {
          cy.log('URL captured from window.open is null or undefined');
        }
      } else {
        cy.log('window.open stub has not been called');
      }
    })
    .then(() => {});

  cy.get('#login').type('admin');
  cy.get('#password').type('admin');
  cy.get("button[type='submit']").click();
};

export const TabsValidation = () => {
  const tabs = ['SHELL', 'EDITOR', 'BACKUPS'];
  tabs.forEach((tab) => {
    cy.get('div[style="font-weight: bold; color: lightgrey;"]').should('contain', tab);
    cy.log(`${tab} is Inactive`);
  });
};

export const TabsValidationstaggingToProduction = () => {
  const tabs = ['SHELL', 'EDITOR'];
  tabs.forEach((tab) => {
    cy.get('div[style="font-weight: bold; color: graytext;"]').should('contain', tab);
    cy.log(`${tab} is Active`);
  });
};

export const TabsValidationProduction = () => {
  cy.wait(3000);
  cy.get('div[style="font-weight: bold; color: graytext;"]').should('contain', 'SHELL');
  cy.log('SHELL is Active');
  cy.get('div[style="font-weight: bold; color: graytext;"]').should('contain', 'EDITOR');
  cy.log('Editor is Active');
  cy.get('div[style="font-weight: bold; color: graytext;"]').should('contain', 'BACKUPS');
  cy.log('Backups is Active');
};

export const CreateNewProject = (URL) => {
  const projectlastname = generateRandomString(3);
  const uniqueNumber = Date.now();
  const versions = [15, 16, 17];
  const randomVersion = versions[Math.floor(Math.random() * versions.length)];
  let projectName = `Project-${projectlastname}`;

  cy.visit(`${URL}/create/`);
  cy.get('#newRepoName').click();
  cy.get('#newRepoName').type(projectName);
  cy.get('#odooVersion').select(`${randomVersion}`);
  cy.contains('button', 'Deploy').click();
  cy.wait('@deployRequest', { timeout: 10000 }).its('response.statusCode').should('eq', 201);
  cy.wait('@getProjects', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  //cy.wait(1000);
  cy.visit(URL);
  // cy.wait(10000);
  cy.contains('div', projectName).should('be.visible').click();
  cy.contains('div', 'Development').should('be.visible');
  cy.contains('button', 'Development').should('be.visible');
  cy.log('Project Created');

  return projectName;
};

export const createBranch = (projectName, branchName, ProjectURL) => {
  cy.visit(ProjectURL);
  cy.intercept('GET', `https://api.click2deploy.com/api/v1/user/project').as('getProjects`);

  // cy.wait('@getProjects', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
  cy.contains('div', projectName).should('be.visible').click();
  cy.wait('@getBranches', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
  cy.contains('button', 'Development').should('be.visible').click();

  cy.get('#accorDevelopment-shadow-2Collapse > .accordion-body > .mb-3 > #existingBranchName').select('main');
  //.should("have.text","main")
  cy.get('#newBranchName-Development').type(branchName).type('{enter}');
  cy.wait('@createBranch', { timeout: 20000 }).its('response.statusCode').should('eq', 201);
  toastMessageValidation('Branch created successfully', 3000);
  cy.wait('@getBranches', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
  cy.contains('div[style^="cursor: pointer;"]', branchName).click();
  cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
  cy.contains('span', 'In Progress').should('be.visible');
};

export const CreateBranchInStagging = (projectName, branchName, ProjectURL) => {
  cy.visit(ProjectURL);
  cy.wait('@getProjects', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.contains('div', projectName).should('be.visible').click();
  cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.contains('button', 'Staging').should('be.visible').click();
  cy.get('#accorStaging-shadow-2Collapse > .accordion-body > .mb-3 > #existingBranchName').select('main');
  cy.get('#accorStaging-shadow-2Collapse > .accordion-body > .mb-3 > #existingBranchName')
    .find('option:selected')
    .should('have.text', 'main');
  cy.get('#newBranchName-Staging')
    .type(branchName)
    .type('{enter}')
    .then(() => {
      cy.wait('@createBranch', { timeout: 20000 }).its('response.statusCode').should('eq', 201);
    });

  toastMessageValidation('Branch created successfully', 6000);
  cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.contains('div[style^="cursor: pointer;"]', branchName).click();
  cy.wait('@getProjectTracking', { timeout: 10000 }).its('response.statusCode').should('eq', 200).wait(2000);
  cy.contains('span', 'In Progress').should('be.visible');
};

export const ValidateBranches = (branches) => {
  branches.forEach((branch) => {
    cy.contains('div', branch).should('exist');
  });
};

export const DeleteRepository = (repoName) => {
  cy.get('.btn-only-icon[aria-label="Quick menu"]').click();

  // Clicking on the 'Settings' option from the dropdown menu
  cy.contains('.dropdown-menu', 'Settings').click();

  // Clicking on the 'Delete' button to delete the project
  cy.get('.btn.btn-danger').click();

  // Typing the project name for confirmation
  cy.get('input[name="confirmationName"]').type(repoName);

  // Confirming the deletion by clicking on the confirmation button
  cy.get('.alert.alert-light-danger .btn.btn-outline-danger').click();

  // Waiting for the response to get the list of projects after deletion
  cy.wait('@getProjects', { timeout: 10000 }).its('response.statusCode').should('eq', 200);

  // Verifying that the project card is no longer visible after deletion
  cy.get('.card').should('not.contain', repoName);
};

export const BackupsValidation = (BackupComments) => {
  cy.get('div[style="font-weight: bold; color: graytext;"]').eq(-3).should('contain', 'BACKUPS').click({ force: true });
  cy.wait('@getBackups', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.wait('@getMeta', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.get("button[style='margin-right: 10px;']").click();
  cy.get('#backupComment').type(BackupComments);
  cy.get("button[class='btn btn-info']").click();
  cy.wait('@postBackup', { timeout: 10000 }).its('response.statusCode').should('eq', 201);
  toastMessageValidation('Manual backup triggered!', 3000);
  cy.wait('@getMeta', { timeout: 3 * 60000 })
    .its('response.statusCode')
    .should('eq', 200);
  toastMessageValidation('Backup completed successfully', 6 * 60 * 1000);
  cy.wait(3000);
  cy.contains('div', 'Success').should('be.visible');
};

export const OpenProject = (projectName, projectURL) => {
  cy.visit(projectURL);
  cy.wait('@getProjects', { timeout: 10000 }).its('response.statusCode').should('eq', 200);

  cy.contains('div', projectName).should('be.visible').click();
  cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.wait('@getProjectTracking', { timeout: 600000 }).its('response.statusCode').should('eq', 200);
  cy.contains('button', 'Development').should('be.visible');
};

// --------------------------------NEW UI -----------------------------------------------//
// --------------------------------NEW UI -----------------------------------------------//
// --------------------------------NEW UI -----------------------------------------------//
// --------------------------------NEW UI -----------------------------------------------//

export const NewUI_CreateNewProject = (URL) => {
  const projectlastname = generateRandomString(3);
  const uniqueNumber = Date.now();
  const versions = [17]; //[15, 16, 17]
  const randomVersion = versions[Math.floor(Math.random() * versions.length)];
  let projectName = `project${projectlastname}`;


  cy.visit(`${URL}/`);



  cy.get("button[class='btn btn-primary btn-lg rounded-3 c2d-btn']").click();
  cy.get("input[name='repository']").type(projectName);


  cy.get("select[name='version']").select(`${randomVersion}`);
  cy.contains("div[class='d-flex align-items-center justify-content-center'] span", 'Deploy').click();
  cy.wait('@deployRequest', { timeout: 20000 }).its('response.statusCode').should('eq', 201);

  cy.get('.c2d-form > .row', { timeout: 10000 }).should('not.exist');

  cy.wait('@getProjects', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
 
  cy.wait(1000);
  cy.contains('div', projectName).should('be.visible').click();
  cy.wait(2000)

  cy.get('body').then((body) => {
    if (body.find(`.branch.cursor-pointer`).length > 0)
       {
      cy.contains('div', 'Development').should('be.visible');
      cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
      
      cy.contains(`.branch.cursor-pointer`, 'main').should('be.visible');
      cy.log('Project Created');
      cy.contains("div[draggable='true']", 'main').should('be.visible').click();
    } else {
      cy.contains('div', projectName).should('be.visible').click();
      cy.wait(2000)
      cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
   
      cy.contains(`.branch.cursor-pointer`, 'main').should('be.visible');
      cy.log('Project Created');
      cy.contains("div[draggable='true']", 'main').should('be.visible').click();
    }
  });


  return projectName;
};

export const NewUI_HistoryValidation = () => {
  cy.get("span[class='cursor-pointer text-decoration-none hover:text-decoration-underline']")
    .should('be.visible')
    .then(($element) => {
      cy.log('Branch History :' + $element.text());
    });
};

export const NewUI_OpenProjectbranch = (projectName, branchName, ProjectURL) => {
  cy.visit(ProjectURL);
  cy.intercept('GET', `https://api.click2deploy.com/api/v1/user/project').as('getProjects`);
  cy.wait('@getProjects', { timeout: 20000 }).its('response.statusCode').should('eq', 200);

  cy.contains('div', projectName).should('be.visible').click();
  cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);

  cy.get('body').then((body) => {
    if (body.find(`.branch.cursor-pointer`).length > 0) {
      cy.contains('div', 'Development').should('be.visible');

      cy.contains(`.branch.cursor-pointer`, branchName).should('be.visible');
    } else {
      cy.contains('div', projectName).should('be.visible').click();
      cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
      cy.contains(`.branch.cursor-pointer`, branchName).should('be.visible');
    }
  });

  // cy.contains('div', 'Development').should('be.visible');

  // cy.contains(`.branch.cursor-pointer`,branchName).should("be.visible");
  cy.contains(' .branch.cursor-pointer', branchName).click();
  cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
  cy.wait(3000);
};

export const NewUI_CreateBranchInStagging = (projectName, branchName, ProjectURL) => {
  cy.visit(ProjectURL);
  cy.wait('@getProjects', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.contains('div', projectName).should('be.visible').click();

  cy.get("body").then((body)=>{
    if(body.find(`.branch.cursor-pointer`).length > 0)
    {
      cy.wait(2000)
      cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
    }
    else
    {
      cy.contains('div', projectName).should('be.visible').click();
      cy.wait(2000)
      cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);

      // if still it re-directs - re open the project

      cy.get("body").then((body)=>{
        if(body.find(`.branch.cursor-pointer`).length > 0)
        {
          cy.wait(1000)
        }
        else
        {
          cy.contains('div', projectName).should('be.visible').click();
          cy.wait(2000)
          cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
        }
      })

    }
  })
  cy.wait(2000)
  cy.contains('.env-header h4', 'Staging').should('be.visible').click();
  cy.get(".environments-wrapper [style=''] select").select('main');
  cy.get(".environments-wrapper [style=''] select").find('option:selected').should('have.text', 'main');
  cy.get(
    'body > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > main:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > input:nth-child(2)',
  )
    .type(branchName)
    .type('{enter}')
    .then(() => {
      cy.wait('@createBranch', { timeout: 20000 }).its('response.statusCode').should('eq', 201);
    });



    cy.get("body").then((body)=>{
      if(body.find(`.details-sidebar:contains("${branchName}")`).length > 0)
      {
        cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
        cy.contains('span', 'In Progress').should('be.visible');
      }
      else
      {    cy.visit(ProjectURL);
        cy.wait('@getProjects', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
        cy.contains('div', projectName).should('be.visible').click();
        cy.wait(2000)
      
        cy.get('body').then((body) => {
          if (body.find(`.details-sidebar:contains("${branchName}")`).length > 0)
             {
              
            cy.contains('div', 'Development').should('be.visible');
           // cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
           cy.contains(`[data-testid='${branchName}-17']`,branchName).click();
            cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
            cy.contains('span', 'In Progress').should('be.visible');
            
          } else {
           
            cy.contains('div', projectName).should('be.visible').click();
            cy.wait(2000)
            cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
         
            cy.contains(`.branch.cursor-pointer`, 'main').should('be.visible');
            cy.contains(`[data-testid='${branchName}-17']`,branchName).click();
            // cy.contains('.details-sidebar', branchName).click();
            cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
            cy.contains('span', 'In Progress').should('be.visible');
          }
        });
      }
    })




  //  NewUI_toastMessageValidationDual('Branch created successfully','Build fail with Error', 6000);
  // cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.contains('.details-sidebar', branchName).click();
  cy.wait('@getProjectTracking', { timeout: 10000 }).its('response.statusCode').should('eq', 200).wait(2000);
  cy.contains('span', 'In Progress').should('be.visible');
};

export const NewUI_SuccessStatusValidation = () => {
  cy.contains('[style="display: flex; align-items: center;"] > .m-2', 'Success').should('be.visible');
  cy.log('Build succeeded');
};
export const NewUI_ConnectButtonValidation = () => {

  cy.wait(6000)
  NewUI_toastMessageValidationDual("Build is now ready to connect!","Build failed with errors",11*60*1000 )
 
  // cy.get(".btn-success.connect", { timeout: time }).should('be.visible');
  cy.get('.btn-success.connect', { timeout: 600000 }) // Wait for up to 600 seconds (10 minutes)
    .should('exist');
};

export const NewUI_TabsValidationProduction = () => {
  cy.wait(3000);
  cy.contains('.details-header-navbar.w-100.d-flex.gap-1', 'SHELL').should('be.visible');
  cy.log('SHELL is Active');
  cy.contains('a.editor', 'EDITOR').should('be.visible');
  cy.log('Editor is Active');
  cy.contains('.details-header-navbar', 'BACKUPS').should('be.visible');
  cy.log('Backups is Active');
};

export const NewUI_BuildValidation = (branchName) => {

  cy.contains(`[data-testid='${branchName}-17']`,branchName).click();
  cy.get('body').then((body)=>{
     if(body.find(`.branch-name:contains(${branchName.toUpperCase()})`).length > 0)
     {
       cy.wait("@getProjectTracking", { timeout : 20000 }).its("response.statusCode").should("eq",200);

     }
     else
     {
      cy.contains(`[data-testid='${branchName}-17']`,branchName).click();
     }
  })

  let openedUrl;
  cy.get('.btn-success.connect').should('be.visible');
  cy.window().then((win) => {
    cy.stub(win, 'open')
      .callsFake((url) => {
        openedUrl = url;
        return win.open.wrappedMethod.call(win, openedUrl, '_self');
      })
      .as('windowOpen');
  });

  cy.get('.btn-success.connect', { timeout: 6000 }) .should('exist');
  cy.get('.btn-success.connect').contains('Connect').click();

  cy.get('@windowOpen')
    .then((stub) => {
      const args = stub.args;
      if (args.length > 0) {
        openedUrl = args[0][0];
        if (openedUrl) {
          cy.log('Opened URL:', openedUrl);
          cy.visit(openedUrl, { timeout: 90000 });
        } else {
          cy.log('URL captured from window.open is null or undefined');
        }
      } else {
        cy.log('window.open stub has not been called');
      }
    })
    .then(() => {});

  cy.get('#login').type('admin');
  cy.get('#password').type('admin');
  cy.get("button[type='submit']").click();
};

export const NewUI_createBranchInDevelopment = (projectName, branchName, ProjectURL) => {
 

  // cy.wait('@getBranches', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
   cy.contains('.env-header h4', 'Development').should('be.visible').click();

  cy.get(".environments-wrapper [style=''] select").select('main');
  cy.get(".environments-wrapper [style=''] select").find('option:selected').should('have.text', 'main');
  //.should("have.text","main")
  cy.get('.show input.form-control-lg').type(branchName).type('{enter}');
  cy.wait('@createBranch', { timeout: 20000 }).its('response.statusCode').should('eq', 201);
  NewUI_toastMessageValidation('Branch created!', 3000);

  // cy.wait('@getBranches', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
  cy.wait(3000)

  cy.get("body").then((body)=>{
    if(body.find(`.details-sidebar:contains("${branchName}")`).length > 0)
    {
      cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
      cy.contains('span', 'In Progress').should('be.visible');
    }
    else
    {    cy.visit(ProjectURL);
      cy.wait('@getProjects', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
      cy.contains('div', projectName).should('be.visible').click();
      cy.wait(2000)
    
      cy.get('body').then((body) => {
        if (body.find(`.details-sidebar:contains("${branchName}")`).length > 0)
           {
            
          cy.contains('div', 'Development').should('be.visible');
         // cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
         cy.contains(`[data-testid='${branchName}-17']`,branchName).click();
          cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
          cy.contains('span', 'In Progress').should('be.visible');
          
        } else {
         
          cy.contains('div', projectName).should('be.visible').click();
          cy.wait(2000)
          cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
       
          cy.contains(`.branch.cursor-pointer`, 'main').should('be.visible');
          cy.contains(`[data-testid='${branchName}-17']`,branchName).click();
          // cy.contains('.details-sidebar', branchName).click();
          cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
          cy.contains('span', 'In Progress').should('be.visible');
        }
      });
    }
  })

  // cy.contains('.details-sidebar', branchName).click();
  // cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
  // cy.contains('span', 'In Progress').should('be.visible');
};
export const NewUI_TabsValidationDevelopment = () => {
  const tabs = ['SHELL', 'EDITOR', 'BACKUPS'];
  tabs.forEach((tab) => {
    cy.get('div[style="font-weight: bold; color: lightgrey;"]').should('contain', tab);
    cy.log(`${tab} is Inactive`);
  });
};
export const NewUI_toastMessageValidation = (message, time) => {
  cy.contains("div[role='alert']", message,  { timeout: time }).should('be.visible');
};

export const NewUI_toastMessageValidationDual = (message1, message2, time) => {
  cy.get('div[role="alert"]', { timeout: time }).then(($alert) => {
    if ($alert.text().includes(message1)) {
      cy.contains('div[role="alert"]', message1).should('be.visible');

    } else if ($alert.text().includes(message2)) {
    
      cy.contains('div[role="alert"]', message2).should('be.visible');
      cy.log(`${message2} .. Failing the test.`)
      throw new Error(`${message2} ... QA stop the test`)
    } else {
     
      cy.log(`Neither message1 nor message2 appeared. Appeared message is: ${$alert.text()}`);
    }
  });
};

export const NewUI_deleteproject = (projectURL, projectName) => {
  cy.visit(`${projectURL}/`);
  cy.get('.project-grid-card')
    .contains(`${projectName}`) // Locate the card with the specific text
    .parents('.project-grid-card') // Ensure you have the correct card
    .within(() => {
      cy.get('.btn-only-icon[type="button"]').click(); 
    });
  cy.wait(1000);

    cy.get("button.btn-light.mt-2").click();

  cy.get(`.form-control[placeholder='type "${projectName}" in the box']`).type(`${projectName}`);
  cy.get(".btn-danger").click();
  cy.wait(3000)
  cy.get('body').then((body)=>{
    if(body.find("h5").length > 0)
    {
      cy.visit(`${projectURL}/`);
      cy.wait("@getProjects", { timeout : 20000 }).its("response.statusCode").should("eq",200);
      if(body.find(`.project-grid-card`).length > 0)
      {
        cy.get('.project-grid-card').contains(`${projectName}`).should("not.exist");
      }
      else
      {
          cy.log("No Project Found! All are  deleted ")
      }
      
    }
    else{
      cy.wait("@getProjects", { timeout : 20000 }).its("response.statusCode").should("eq",200);
      if(body.find(`.project-grid-card`).length > 0)
        {
          cy.get('.project-grid-card').contains(`${projectName}`).should("not.exist");
        }
        else
        {
            cy.log("No Project Found! All are  deleted ")
        }
    }
  })

 // cy.get('.btn-light-danger.c2d-btn.mt-2.w-100').click().wait(1000);
  // cy.wait("@getProjects", { timeout : 10000 }).its('response.statusCode').should('eq',200);
  // cy.get('.project-grid-card').contains(`${projectName}`).should('not.exist');
};

export const NewUI_OpenProject = (projectName, ProjectURL) => {
  cy.visit(ProjectURL);

  cy.wait('@getProjects', { timeout: 20000 }).its('response.statusCode').should('eq', 200);

  cy.contains('div', projectName).should('be.visible').click();
  cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.contains('div', 'Development').should('be.visible');
};

export const NewUI_CreateNewProjectUsingExistingRepo = (projectURL) => {
  const versions = [17]; //[15, 16, 17]
  const randomVersion = versions[Math.floor(Math.random() * versions.length)];
  let projectName = `Are31`;

  cy.visit(`${projectURL}/`);
  cy.wait(4000);
  cy.get("button[class='btn btn-primary btn-lg rounded-3 c2d-btn']").click();
  cy.get("input[type='radio'][value='existing']").click();
  cy.wait(4000);
  cy.wait('@ExistRepository', { timeout: 60 * 1000 })
    .its('response.statusCode')
    .should('eq', 200);
  cy.get("select.second-field[name='repository']").select(projectName);
  cy.get("select[name='version']").select(`${randomVersion}`);

  cy.contains("div[class='d-flex align-items-center justify-content-center'] span", 'Deploy').click();

  cy.wait('@getProjects', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  // cy.get(".Toastify__toast--close-on-click [aria-label='close'] [aria-hidden='true']",{ timeout:6000 }).should("be.visible").click();
  // NewUI_toastMessageValidation("Project created successfully.",2*10*1000);
  cy.get('#deploy-your-platform', { timeout: 10000 }).should('not.exist');
  cy.contains('div', projectName).should('be.visible').click();
  cy.contains('div', 'Development').should('be.visible');
  cy.log('Project Created');
  cy.contains("div[draggable='true']", 'main').should('be.visible').click();

  return projectName;
};

export const NewUI_DroppedButtonValidation = () => {
  let time = 10 * 60 * 1000;
  //toastMessageValidation('Build completed successfully', time);
  cy.reload();
  cy.wait(2000)
  cy.wait("@getProjectTracking", { timeout : 20000 }).its('response.statusCode').should('eq',200);
  // cy.contains('span', 'Dropped').should('be.visible');
  cy.contains('span', 'Dropped').should('exist');
  // cy.contains('span', 'Success').should('be.visible');
};

export const GoggarProjects = () => {
  cy.get('.logo').click();
  cy.get('button.btn-public').click();
  //cy.wait("@getProjects").its("response.statusCode").eq(200);
};

export const NewUI_Logs = (projectName,branchName) => {
  cy.get(`[href="/project/${projectName}/branches/${branchName}/logs"]`).click();
  cy.get('.logs-header select.form-select').select('app.log').should('have.value', 'app');
  cy.get('pre').should('contain.text', "Finished 'clean'");

  cy.get('.logs-header select.form-select').select('build.log').should('have.value', 'build');
  // cy.waitUntil(() => );
  cy.get('pre').should('be.visible').and('contain.text', 'Running on CodeBuild On-demand');

  cy.get('.logs-header select.form-select').select('odoo.log').should('have.value', 'odoo');
  cy.get('pre').should('contain.text', 'odoo: Using configuration file at /etc/odoo/odoo.conf ');
};
