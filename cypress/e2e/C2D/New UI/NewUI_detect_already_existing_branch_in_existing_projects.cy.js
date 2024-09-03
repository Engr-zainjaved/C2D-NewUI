// apiBaseUrl = Cypress.env('New_UI_CYPRESS_API_BASE_URL');
//     projectUrl = Cypress.env('New_UI_CYPRESS_PROJECT_URL');
//     homeUrl = Cypress.env('New_UI_CYPRESS_HOME_URL');

import {
  NewUI_CreateNewProject,
  NewUI_HistoryValidation,
  NewUI_OpenProjectbranch,
  OpenProjectbranch,
} from '../../../support/utilities';

let projectURL;
let projectName = 'dndmerge1';
let branchName = 'main';

describe('detect_already_existing_branch_in_existing_projects', () => {
  beforeEach(() => {
    cy.NewUI_ForProdEnvironment().then((url) => {
      projectURL = url;
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it('detect_already_existing_branch_in_existing_projects', () => {
    NewUI_OpenProjectbranch(projectName, branchName, projectURL);
    // cy.get('[data-testid="staggingBranch-15"]').click();
    // cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
    // cy.wait(3000);
    NewUI_HistoryValidation();
  });
});
