import 'cypress-file-upload';
// import AdmZip from 'adm-zip';

const baseUrl = Cypress.env('CYPRESS_API_BASE_URL');
const projectUrl = Cypress.env('CYPRESS_PROJECT_URL');
const homeUrl = Cypress.env('CYPRESS_HOME_URL');
import axios from 'axios';
import { toastMessageValidation } from './utilities';

Cypress.Commands.add('loginC2dDev1_PROD', () => {
  cy.viewport(1526, 729);
  cy.intercept('GET', '/api/auth/session', {
    body: {
      user: {
        name: 'c2d-dev1',
        email: 'nomanjalaal+c2d-dev1@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/169385980?v=4',
        id: '169385980',
      },
      expires: '2024-07-27T09:22:36.236Z',
    },
  }).as('mockedSession');

  cy.setCookie(
    '__Host-next-auth.csrf-token',
    '4e0295120c1f4813595509d8e5913439b89500a7288383ebab285f6dc798011a|aa42e51375b173735a2c2a1c7de6ab4e437c187b00271ba7226bfa1a76aa4d9e',
    { secure: true, path: '/' },
  );
  cy.setCookie('__Secure-next-auth.callback-url', encodeURIComponent('https://click2deploy.com/project'), {
    secure: true,
    path: '/',
  });
  cy.setCookie(
    '__Secure-next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..GqMstHLR6BNd4Sh2.QRQ_X39SDCYliH73mQZQeVz1tWb2BOTkr-iPdEN-24CfFt5ThbvFWhuFTebGmnJrCuZNfcoyvXFV3uSQa7uEMIOPmiwAypMFK8tGXUtV5Ee6BXfcexviynF7dIlzP20HEcCDamtPmRhkAY2t6Xr-tqYObQZxivSKbF9i7HtgtaeBytpo4c8h8MiTTQIjfxs0HwSWF860vymtbiXjbBpMochoxyYQBfkd4patM5ItGsEPxeLvOxmhT0krztrSJ3FxEM-LzvkFgJrorMl07wQlGYmmsEjdECfepvn5xtI6e7QLP8lNtnqWN8vLzcycd9IKpcEo4pgw0aqyxgqaxd-LTrejpwdqvfCY2sWZuJI_ffNG0_D7S6c8RvnCMcH_mA44KmbJq09vY01Q.8DWGQcNAGmIWtFxm51FEuw',
    { secure: true, path: '/' },
  );

  const apiUrl = `https://api.click2deploy.com/api/v1/accounts/github/login/`;
  const requestBody = {
    email: 'nomanjalaal+c2d-dev1@gmail.com',
  };

  axios.post(apiUrl, requestBody).then((response) => {
    localStorage.setItem('backendToken', response.data.data.access);
  });
});

Cypress.Commands.add('loginC2dDev1_DEV', () => {
  cy.viewport(1526, 729);
  cy.intercept('GET', '/api/auth/session', {
    body: {
      user: {
        name: 'c2d-dev1',
        email: 'nomanjalaal+c2d-dev1@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/169385980?v=4',
        id: '169385980',
      },
      expires: '2024-08-11T06:18:21.867Z',
    },
  }).as('mockedSession');

  cy.setCookie(
    '__Host-next-auth.csrf-token',
    'dcb515b480271b6ed5ed016e2e84671d920c9440b8b42bebe3b99943a0deb20e|da575639339c8617e1c9c2d877722ae2609c9f5a11e144263e96f25b602e2764',
    { secure: true, path: '/' },
  );
  cy.setCookie('__Secure-next-auth.callback-url', encodeURIComponent(`${homeUrl}`), {
    secure: true,
    path: '/',
  });
  cy.setCookie(
    '__Secure-next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..M4SzkrPZ0-v8I1V-.FfCvfwsHpWGwpO9FAkinbpZolE4NQePxAg917yURSbscz7jpnUq4tjVWxzNF069byDAP-ZcxnM1enhO7yLPUYxpuIyFJXMIheqJ-iohkT6TbMjj5yV9aIGgjIRBVKQr_J_TOx_yid0NAKn11B064vsKHazDPQxA4u2kDMZNQQ3wfm0h4qI28pFqA0ocYAWC7PV58T1sZR1QpxGDuSg3H7ilYERGZUMssXESRgQndaiDFpNVALprpyXiIPIS2BCbVDbd3IcaD_kumlF1nn1cerNy0Wqq-xVQqLoAw0cbb3MTYQjOZvLWhBDuHpJUV8bLXQiPODf_eh9C4ss7-AWYNErC_Qd2LNA2EqoO-zuINazzl72tVQaLp6G5loscefE5kUo_kbdyHsM8f.77RR6XGQaEgCwqleWEI2sg',
    { secure: true, path: '/' },
  );

  const apiUrl = `${baseUrl}/accounts/github/login/`;
  const requestBody = {
    email: 'nomanjalaal+c2d-dev1@gmail.com',
  };

  axios.post(apiUrl, requestBody).then((response) => {
    localStorage.setItem('backendToken', response.data.data.access);
  });
});

Cypress.Commands.add('loginC2dDev2_PROD', () => {
  cy.viewport(1526, 729);
  cy.intercept('GET', '/api/auth/session', {
    body: {
      user: {
        name: 'c2d-dev2',
        email: 'nomanjalaal+c2d-dev2@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/169582764?v=4',
        id: '169582764',
      },
      expires: '2024-08-28T13:30:32.552Z',
    },
  }).as('mockedSession');

  cy.setCookie(
    '__Host-next-auth.csrf-token',
    '5c897479b27171a50c7789dd926abc151d324edb3a5ce4a4011d5db4cc439a2d%7C45becd4e25125c1fcf4240b56c09550f77ebfdffcc4f1fdb8e9738162221fc1b',
    { secure: true, path: '/' },
  );
  cy.setCookie('__Secure-next-auth.callback-url', encodeURIComponent('https://click2deploy.com/project'), {
    secure: true,
    path: '/',
  });
  cy.setCookie(
    '__Secure-next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..y486FrKbZ9adsXY7.g37gWj0_mLGBuuftEsJl0azPs-YU3RYBi3mQnbd4uLegBLuWRZP8a1167uG5q1Nquyt7zHPi0oP7uygSOLGIPglasXeG5loam_O-lsYu9tF8hOtVLuTWpInATH_6OVbEhUZYUSzVZQvp62JQjZIQ35Uwnby4BUcjmdPIksVhssXR5pAXcPshsIAOQz0hujsmNV2IvcfR3Cya7hQe_ptdS5KZNPezxCPmON5BbARqI1_EtzO7dhO2mhwEh3yjbbD_0HkDe3kOcib4VercqpMWNrrVc7eAEnri0r-NEc7riaCA-vddLxDATdMVN6dlV4P78_DnghMrgd_BWEmFXTEaFZqpsFtWiltRo6hkVQ13R2KG1QAsOVtSqSKTmSUez7Qr3OIiWXkXPsHP.u9Ul5A3Em7kmqU0Sm7v_KA',
    { secure: true, path: '/' },
  );

  const apiUrl = `https://api.click2deploy.com/api/v1/accounts/github/login/`;
  const requestBody = {
    email: 'nomanjalaal+c2d-dev2@gmail.com',
  };

  axios.post(apiUrl, requestBody).then((response) => {
    localStorage.setItem('backendToken', response.data.data.access);
  });
});

Cypress.Commands.add('loginC2dDev2_DEV', () => {
  cy.viewport(1526, 729);
  cy.intercept('GET', '/api/auth/session', {
    body: {
      user: {
        name: 'c2d-dev2',
        email: 'nomanjalaal+c2d-dev2@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/169582764?v=4',
        id: '169582764',
      },
      expires: '2024-08-10T09:54:13.731Z',
    },
  }).as('mockedSession');

  cy.setCookie(
    '__Host-next-auth.csrf-token',
    '5a5f327fad2d386951b98279aa41f9d7059a2f053a2e370adad924f43e5e6cb7%7C3df3b67dd7f217d12367f899f77e355416fa4776e3736e5974bd39546cf63f52',
    { secure: true, path: '/' },
  );
  cy.setCookie('__Secure-next-auth.callback-url', encodeURIComponent(`${homeUrl}`), {
    secure: true,
    path: '/',
  });
  cy.setCookie(
    '__Secure-next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..CfWQ1-zzGC3Fw5Ia.ok5AgWRyQxeIy5sIH1XmQPwrkMXF4R5izqSlVAv28vKbVy-eKNiADiMaraB4kVgfMZtT19wmhQXIn-2OhE8mForQTKgBE5WmVxdIpNGuTOigxyVKkKmUKl3ASlC-PIT1VV7Xjhz-6-szcNg6oSa5fWKnIWNfWQ5_DceB7CYSjYEXkuKTqJ2RMkCmDidy9gmGnBPe5m4gYORIJGDp049Zhckq9ag7PFYmKc7f54iSdf_PgyOS9JXDpcd1jkhufwIbbAi4-0_2hv_bXIqcIUdwVQoRmjPpiyEfwgs9-O0bvVYwT2RM98rfuazQAerNQ7ojF_9vFG3XC6QFZrDYqhsITQpmxUdmaW291nvDa2WjSbVaM1DP07tbPwn6D4bp7-Rn0eUuqkYXbiyB.-rfIS6nRwMw88sg5kprJ4g',
    { secure: true, path: '/' },
  );

  const apiUrl = `${baseUrl}/accounts/github/login/`;
  const requestBody = {
    email: 'nomanjalaal+c2d-dev2@gmail.com',
  };

  axios.post(apiUrl, requestBody).then((response) => {
    localStorage.setItem('backendToken', response.data.data.access);
  });
});

Cypress.Commands.add('loginC2dProd1', () => {
  cy.viewport(1526, 729);
  cy.intercept('GET', '/api/auth/session', {
    body: {
      user: {
        name: 'c2d-prod1',
        email: 'warriorx0091+c2d-prod1@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/169764548?v=4',
        id: '169764548',
      },
      expires: '2024-08-01T07:22:30.089Z',
    },
  }).as('mockedSession');

  cy.setCookie(
    '__Host-next-auth.csrf-token',
    '3ddbc9d831c24695e7bcaad002e7f2dd4d68cc39ff43c094438356f41099bb4d%7Cfbefc7f56fc2789011fcd2c1ed5a09ce41bfd5db16117278d36fc57614a3b138',
    { secure: true, path: '/' },
  );
  cy.setCookie('__Secure-next-auth.callback-url', encodeURIComponent('https://click2deploy.com/project'), {
    secure: true,
    path: '/',
  });
  cy.setCookie(
    '__Secure-next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..wSWoK94tCckKdCMY.jb_O6uqwxUYRQWWYquL7c9a_JR33qmBgGcqB4SQ4LpD6mOgJqf-mVw_ZKv9EKsvBmWwGJHKUdBL9NW3jya3xvV-JeefaXFcLqzliMgF_3vNgAYlGRdetTvVsYXJp790-1w_Y7UHkS3hkP6BjTuXrjbR7fMo9TKC-NmePnerISa49kzDs471dTo7zUzcI_VDxIBl1mWqf_0wtmGnUVP9NqLxsBNG4f2K3JvzfSsm7nrGUlJCzuiucFXk966eXItGnzMLARWT4Q9dOjk_WEKxHji1iMvy2HylBiErEB32s0RW3IscIh7bsvqRwZzlLdF9G2scIVV8f6xAav6s6G6r87NkxAX7E1NWPj8nv-uO2xDeYL1gt8ZVCEQYbQMgay1iZsH00qg_TYoUeQCdU.aFsLX4He6TB_PJRNrOT0Sw',
    { secure: true, path: '/' },
  );

  const apiUrl = `https://api.click2deploy.com/api/v1/accounts/github/login/`;
  const requestBody = {
    email: 'warriorx0091+c2d-prod1@gmail.com',
  };

  axios.post(apiUrl, requestBody).then((response) => {
    localStorage.setItem('backendToken', response.data.data.access);
  });
});

Cypress.Commands.add('loginWithDev', () => {
  cy.viewport(1726, 1000);
  cy.intercept('GET', '/api/auth/session', {
    body: {
      user: {
        name: 'pucar15',
        email: 'pucar15sahiwal@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/167426436?v=4',
        id: '167426436',
      },
      expires: '2024-08-22T04:35:33.337Z',
    },
  }).as('mockedSession');

  cy.setCookie(
    '__Host-next-auth.csrf-token',
    '1d4ff64d7d63fae1a9bfe7d495d58c8ddd0f81da4ca1a2b51578d7f5c6270a55%7C285e29849df29da97fac5fae05ad9946e2ed9aa1a9a0a7dd70dfd6018b06cab7',
    { secure: true, path: '/' },
  );
  cy.setCookie('__Secure-next-auth.callback-url', encodeURIComponent('https://click2deploy.com/project'), {
    secure: true,
    path: '/',
  });
  cy.setCookie(
    '__Secure-next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..6QvR7Qpbl9HV7mmP.MJinfl82yylE2g3rIFXjkCHYWjyO4AjeT3dzgpMZWT7tvl_Cgc9XgCNZnny2-BC87fqj0zTTIajFvP6FPnWqud-GAtznJvNI4kBkJ26PnMsyT4HaJjSbQohDfCMNqbrhX2vfPinTbAwWMDKe4Xs4lgKGWZGaNBTK7m3wLjF7g4SWJlucdSspD7Iu_n5nPNuPn-ikIaqoOgushDL-oMl4bnN81UcLTUQLQQwSDry_kn8jiPJCYYmu1w-5HvZ4FnQYM92F4ZwzNXHAFq5wUeamzKSLWezpNsoKKzIbKfGAlay_kA_PoS28Bh0rkq2G5bwkhavNr0RdH3COFIMoZnvzstY2pzcCbQpVRx6h0lS9uEyP8bdSWi9LifoGMM2to4pm8ag.GrpBiliC0pu_tTGXRNqulQ',
    { secure: true, path: '/' },
  );

  const apiUrl = `https://api.click2deploy.com/api/v1/accounts/github/login/`;
  const requestBody = {
    email: 'pucar15sahiwal@gmail.com',
  };

  axios.post(apiUrl, requestBody).then((response) => {
    localStorage.setItem('backendToken', response.data.data.access);
  });

  const url = 'https://click2deploy.com/project';
  return cy.wrap(url);
});

Cypress.Commands.add('loginWithDev_ZNavProd', () => {
  cy.viewport(1726, 1000);
  cy.intercept('GET', '/api/auth/session', {
    body: {
      user: {
        name: 'ZeeshanAliKharal2',
        email: 'zeeshanali@tcpaas.com',
        image: 'https://avatars.githubusercontent.com/u/144941438?v=4',
        id: '144941438',
      },
      expires: '2024-08-11T10:11:05.041Z',
    },
  }).as('mockedSession');

  cy.setCookie(
    '__Host-next-auth.csrf-token',
    '4812bf63e6fe888157332c90e2aeed8be9fa29382a57bead5615051806c006a8%7C01e20de4ea62838faf77e68ea3d7f027d0284f898cd440a56ddbc549875132b1',
    { secure: true, path: '/' },
  );
  cy.setCookie('__Secure-next-auth.callback-url', encodeURIComponent('https://dev.erp-deploy.com/project'), {
    secure: true,
    path: '/',
  });
  cy.setCookie(
    '__Secure-next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..iOUz6PpXEeHeUblo.Ml4FVAt-CZr80UaXVYVTF2jDOVnfyY9o9OohfXahA2xYNcZ5lttbQMXsg1LsXp9vV-zE7IZhCGzhYwMJO3TDzNS1rUxof8VOdfNLphI3KMxxQVN6uY4cF_Va9161Pnvzd3NSQrAk92qL3e1h_64MW_O_8KSpWcgkldf01snqW1A0Nh53z0mU8oHY3YzjVcpM-OCqwd-JU7Lxp-FCRhaEDtv3zZaMUXz-qjYJ1SgVSYT0PrSdfyFqQLcF5vLusQinjuh3RVQN-3t35YCt9qexehJHaTgB0zFYSFLkbhZk0ASjjEqRknZO6MiY03825OCGsJWMkqgFz8bWwwD41PQTfC9aX7sfe-RXN_p_LeDgf2og8vKhl1mg1kl0XrLJsWgcpA2H12QJ6T_Z.cvg4ghhwG0rxwhR_Iy_Qww',

    { secure: true, path: '/' },
  );

  const apiUrl = `https://api.click2deploy.com/api/v1/accounts/github/login/`;
  const requestBody = {
    email: 'zeeshanali@tcpaas.com',
  };

  axios.post(apiUrl, requestBody).then((response) => {
    localStorage.setItem('backendToken', response.data.data.access);
  });

  const url = 'https://click2deploy.com/project';
  return cy.wrap(url);
});

Cypress.Commands.add('loginWith_C2D_Dev', () => {
  cy.viewport(1726, 1000);
  cy.intercept('GET', '/api/auth/session', {
    body: {
      user: {
        name: 'pucar15',
        email: 'pucar15sahiwal@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/167426436?v=4',
        id: '167426436',
      },
      expires: '2024-08-22T04:15:59.303Z',
    },
  }).as('mockedSession');

  cy.setCookie(
    '__Host-next-auth.csrf-token',
    '1d4ff64d7d63fae1a9bfe7d495d58c8ddd0f81da4ca1a2b51578d7f5c6270a55%7C285e29849df29da97fac5fae05ad9946e2ed9aa1a9a0a7dd70dfd6018b06cab7',
    { secure: true, path: '/' },
  );
  cy.setCookie('__Secure-next-auth.callback-url', encodeURIComponent('https://dev.erp-deploy.com/project'), {
    secure: true,
    path: '/',
  });
  cy.setCookie(
    '__Secure-next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..1MYaFkrhzEW0JdFz.Jiv31nb-qiiFzzjvf6pj5AJNRtX-ETYwac8wMG1STx8_yw5uLPinRgIjCksD4QV_IaOx7q22dSQs8JCyFRdNdg9dUkshf5s4ZsXwpHwOldqBUqP1t-2v_n1acMSj1Z6C2xGiJ8MDCn5Yaas5p0flLpMTQiDDVOODhHozY5_u6-ulY0f8SLnR8SrqobCFjJW98-DX-SV-KexOo1zQBUJIqYK6FwvtUO6S4Z7co9aaunkuAwqzsXN0B8vXWvZt93qi0XfSs9UUWwf8bpojITRuA9HVhEvAgao6dkGuv5aabyZWL6LHYef8N9DtfMVkEp4G0YBA5ae3iHe3D71lp2el1MaItWgJLfi-Jy918XL6-OXHMI7rp3MhqAai7D43MlZF-l0.U-lb6nEhs10AB74inj80og',
    { secure: true, path: '/' },
  );

  const apiUrl = `https://dev-api.erp-deploy.com/api/v1/accounts/github/login/`;
  const requestBody = {
    email: 'pucar15sahiwal@gmail.com',
  };

  axios.post(apiUrl, requestBody).then((response) => {
    localStorage.setItem('backendToken', response.data.data.access);
  });

  const url = 'https://dev.erp-deploy.com/project';
  return cy.wrap(url);
});

Cypress.Commands.add('loginWith_C2D_Dev_ZNavDev', () => {
  cy.viewport(1726, 1000);
  cy.intercept('GET', '/api/auth/session', {
    body: {
      user: {
        name: 'ZeeshanAliKharal2',
        email: 'zeeshanali@tcpaas.com',
        image: 'https://avatars.githubusercontent.com/u/144941438?v=4',
        id: '144941438',
      },
      expires: '2024-08-11T10:11:05.041Z',
    },
  }).as('mockedSession');

  cy.setCookie(
    '__Host-next-auth.csrf-token',
    '4812bf63e6fe888157332c90e2aeed8be9fa29382a57bead5615051806c006a8%7C01e20de4ea62838faf77e68ea3d7f027d0284f898cd440a56ddbc549875132b1',
    { secure: true, path: '/' },
  );
  cy.setCookie('__Secure-next-auth.callback-url', encodeURIComponent('https://dev.erp-deploy.com/project'), {
    secure: true,
    path: '/',
  });
  cy.setCookie(
    '__Secure-next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..iOUz6PpXEeHeUblo.Ml4FVAt-CZr80UaXVYVTF2jDOVnfyY9o9OohfXahA2xYNcZ5lttbQMXsg1LsXp9vV-zE7IZhCGzhYwMJO3TDzNS1rUxof8VOdfNLphI3KMxxQVN6uY4cF_Va9161Pnvzd3NSQrAk92qL3e1h_64MW_O_8KSpWcgkldf01snqW1A0Nh53z0mU8oHY3YzjVcpM-OCqwd-JU7Lxp-FCRhaEDtv3zZaMUXz-qjYJ1SgVSYT0PrSdfyFqQLcF5vLusQinjuh3RVQN-3t35YCt9qexehJHaTgB0zFYSFLkbhZk0ASjjEqRknZO6MiY03825OCGsJWMkqgFz8bWwwD41PQTfC9aX7sfe-RXN_p_LeDgf2og8vKhl1mg1kl0XrLJsWgcpA2H12QJ6T_Z.cvg4ghhwG0rxwhR_Iy_Qww',

    { secure: true, path: '/' },
  );

  const apiUrl = `https://dev-api.erp-deploy.com/api/v1/accounts/github/login/`;
  const requestBody = {
    email: 'zeeshanali@tcpaas.com',
  };

  axios.post(apiUrl, requestBody).then((response) => {
    localStorage.setItem('backendToken', response.data.data.access);
  });

  const url = 'https://dev.erp-deploy.com/project';
  return cy.wrap(url);
});

Cypress.Commands.add('loginC2dProd2_PROD', () => {
  cy.viewport(1726, 1000);
  cy.intercept('GET', '/api/auth/session', {
    body: {
      user: {
        name: 'c2d-prod2',
        email: 'warriorx0091+c2d-prod2@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/172238831?v=4',
        id: '172238831',
      },
      expires: '2024-08-09T11:45:07.164Z',
    },
  }).as('mockedSession');

  cy.setCookie(
    '__Host-next-auth.csrf-token',
    'c88f28b117290d80712246d321d1bbb24b1c9647816949ac191f7f4b3e92127b%7C8ad6cf1f6b0b1ac845651331399b82bb497749f2162b3b4e60cc5b254ef68a93',
    { secure: true, path: '/' },
  );
  cy.setCookie('__Secure-next-auth.callback-url', encodeURIComponent('https://click2deploy.com/project'), {
    secure: true,
    path: '/',
  });
  cy.setCookie(
    '__Secure-next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..E43JgTKzYLbf8OQA.Rq0YSTH4Rbp3fRbh26WXjni5D8Qr3MwLbMXL9dNUDdkJwKVkD3AvsdhGAJa2c_uJ_SabW7pemqhXdIgHyj2XKHhQerLOShlD2u-nydXSf_zwPJpeoynybYlEdMdkpVlCAXlDLzAmqk0ks5aQ9jXlVrjGbsn3pBWrNVGaHYt30ac7E1IX0NmcffI0T-YxBfUoGxII0GVMwxm0WMkWlRgDrXn0KkDRQyFtpAjal58ALfgoKx_gU2mryXGw4XhfSDGazUJftdlzK7_rNSC5o5nibzx_hMoFjgzNJ0Etz8SPjCsYVik5aPo8sZ3ilO9EMHPr_d1Q0GMtTZU_U0TlhXR4NmpBLs7IIZpWsKDTdetNOknmOGekvv4PlV0rFNdjjExcVySds4wvTnUMN_iG._7jPvKyucOW1D05ICG-Scw',
    { secure: true, path: '/' },
  );

  const apiUrl = `https://api.click2deploy.com/api/v1/accounts/github/login/`;
  const requestBody = {
    email: 'warriorx0091+c2d-prod2@gmail.com',
  };

  axios.post(apiUrl, requestBody).then((response) => {
    localStorage.setItem('backendToken', response.data.data.access);
  });
});

Cypress.Commands.add('loginC2dProd2_DEV', () => {
  cy.viewport(1726, 1000);
  cy.intercept('GET', '/api/auth/session', {
    body: {
      user: {
        name: 'c2d-prod2',
        email: 'warriorx0091+c2d-prod2@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/172238831?v=4',
        id: '172238831',
      },
      expires: '2024-08-28T13:39:50.472Z',
    },
  }).as('mockedSession');

  cy.setCookie(
    '__Host-next-auth.csrf-token',
    '7e5b37e91277ab100d8349af5a21cc6b77a873b8e23eaee0c00a0ad8b1bd56ec%7C39791acd112d89fbef335b3d1002351ae15b3825323b6c93190bd44f0a9d3ce3',
    { secure: true, path: '/' },
  );
  cy.setCookie('__Secure-next-auth.callback-url', encodeURIComponent('https://dev.erp-deploy.com/project'), {
    secure: true,
    path: '/',
  });
  cy.setCookie(
    '__Secure-next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..u0XkMd0jb3ZWjzcs.q24GD8wq3VpaN4LfBQy_q9hpsYOGSEOeGFuh66GTgnR-PPFDjGVTQYIWdvRvU0AF2T-5-kn0CGNCXiJTEnuE4zU3r2cIC36MEYkdnQ-1Xnga85KF1pIa8cRhFJGq3HxQ_Ajb5GFaZnJOOdDK03JEPSJwgfFvYzB2-ggxiO7XSeY9_UruwlyD6SpiIgtbyHY13hRFMxMlWox6M4FixYo7fNV2O2IFEZEUMmj1p3AQ-69HeDSno7uaoeJRb7fvqcVOgH0vhA_e1c7CBBj7P-Z4QpGo2uJ70zJi-ptHPFvLnrS5jyoAGGDjOr7fNnVoo8EMP0mStxtMWG_CgM5GIGcvqcNlhwfFFnDRzXOPi7Ay7rHSjaeN37uWIk6RTPWvaFLQipKxYiCgMo1UWq8f.CcAv6547OyaB8-lZcQh1xg',
    { secure: true, path: '/' },
  );

  const apiUrl = `https://api.click2deploy.com/api/v1/accounts/github/login/`;
  const requestBody = {
    email: 'warriorx0091+c2d-prod2@gmail.com',
  };

  axios.post(apiUrl, requestBody).then((response) => {
    localStorage.setItem('backendToken', response.data.data.access);
  });
});

Cypress.Commands.add('loginC2dDev03_DEV', () => {
  cy.viewport(1726, 1000);
  cy.intercept('GET', '/api/auth/session', {
    body: {
      user: {
        name: 'c2d-dev03',
        email: 'warriorx0091+c2d-dev3@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/173448388?v=4',
        id: '173448388',
      },
      expires: '2024-07-21T08:17:28.195Z',
    },
  }).as('mockedSession');

  cy.setCookie(
    '__Host-next-auth.csrf-token',
    'e3773900fef7b4938ae75190dc0958f9cab4ff63e3cf7dcbe71454c38ee4cfe4%7Cff5d5ebe80096dd4d18f0571e743060ebb07aff1ab8a029a51ed3a1fd6e53c2f',
    { secure: true, path: '/' },
  );
  cy.setCookie('__Secure-next-auth.callback-url', encodeURIComponent('https://dev.erp-deploy.com/project'), {
    secure: true,
    path: '/',
  });
  cy.setCookie(
    '__Secure-next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..BvBDlprQMfioKGhS.a7B58La9rmsxMyZZnQ_yhpJfx8tMEWzh6PV_ZdBzHiGBnlT9E-cUaYXe6af5xEQH91mF8otKjBHi_3Xex0qt1fsO5m6dtAxgWKLt3tC_zD5OmZciOD3v7Syyd3mZWVd3lcJpmz-MiO-6ysaM46AkDfo_s9VlajHkEnDvD5YWApFDbUEXK8MOW2etPlLMISp0KFsCbg5dzACTP3NrOr70DRMNkVoBV2GZyzsaHsNIHpwvInxPqbhjNPYKJCaV5essEEq7jpMnjc8eSzbcbLJvpAL2e_h_oFHK9v4zqSh2ydG-4rOT6p9D6HYnECNIG5V2Gdoo-hJv237MGeAYvQC_rVJrIId3AeOPw7DVtOnqN2C-j1ia1mbTAEBoP7EarEFGU0_IigBOIK8Tz-Y.udLg2IMuQzroPK2uxvMNsg',
    { secure: true, path: '/' },
  );

  const apiUrl = `https://dev-api.erp-deploy.com/api/v1/accounts/github/login/`;
  const requestBody = {
    email: 'warriorx0091+c2d-dev3@gmail.com',
  };

  axios.post(apiUrl, requestBody).then((response) => {
    localStorage.setItem('backendToken', response.data.data.access);
  });
});

Cypress.Commands.add('loginC2dDev03_PROD', () => {
  cy.viewport(1726, 1000);
  cy.intercept('GET', '/api/auth/session', {
    body: {
      user: {
        name: 'c2d-dev03',
        email: 'warriorx0091+c2d-dev3@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/173448388?v=4',
        id: '173448388',
      },
      expires: '2024-07-21T12:07:31.876Z',
    },
  }).as('mockedSession');

  cy.setCookie(
    '__Host-next-auth.csrf-token',
    'be2ab84dddf634d00d5c994792b5503b3cd88f6be847b252c9edd803f393b79d%7Cbe89e80d2191c4147e9c33a4b1e7f0665335162c5562221d8eab7ea9b557b964',
    { secure: true, path: '/' },
  );
  cy.setCookie('__Secure-next-auth.callback-url', encodeURIComponent('https://click2deploy.com/project'), {
    secure: true,
    path: '/',
  });
  cy.setCookie(
    '__Secure-next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..gq3c5ut-sP02Cr51.5GtZVYNdvTZqaLlWCOrxKbfMfhOuxtKzhRAGTw_seDeXcIjj6XgTiiv-SMe4Xm9wXhpK5liMceiQX-4YEjk7QOSBIYzFSyjziFp3ibMDyMflt7Lw2M4fY3wgjyBJAW40lN50otrNuotot0475YTfYIikLWeg4Ew0dJZtCepVjpVQzso2CR_-sN9GkO83cQ8cdI5O3bPZ9uZKYAp8xFFAJuBYD6lqwrgnjl3pbaYFtF-WPD2haudGF0NMtA5Z3ewoQQLSeUEJ4maP4g6bsIIhsJqoI4yCT7aBFDje4jf0wWv-_97HcJdMF9UF0h16KqZtyk9YR2aZ_HMFDwloKfGI04a5mrnUrErP4YMgu5Rzr64sE4mtkkm9vCXF1zrEiWrSVtUmRvrsaOt3dbc.LDrNpkibGoc6zDWN-R2FVg',
    { secure: true, path: '/' },
  );

  const apiUrl = `https://api.click2deploy.com/api/v1/accounts/github/login/`;
  const requestBody = {
    email: 'warriorx0091+c2d-dev3@gmail.com',
  };

  axios.post(apiUrl, requestBody).then((response) => {
    localStorage.setItem('backendToken', response.data.data.access);
  });
});

Cypress.Commands.add('dragTo', { prevSubject: 'element' }, (subject, targetEl) => {
  cy.wrap(subject).trigger('dragstart');
  cy.get(targetEl).trigger('drop');
});

Cypress.Commands.add('findTextInDiv', (text) => {
  cy.get("div[class='card-body px-3']").within(() => {
    cy.contains('div', text).should('exist');
  });
});

Cypress.Commands.add('visitWithTimeout', (url, timeout) => {
  return cy.window().then((win) => {
    return cy
      .visit(url, {
        timeout: timeout,
        failOnStatusCode: false,
        onBeforeLoad: (win) => {
          cy.stub(win, 'open').callsFake((newUrl) => {
            win.location.href = newUrl;
          });
        },
      })
      .catch((err) => {
        // Assert that the error is a timeout error
        expect(err.message).to.include(`Timed out after waiting ${timeout}ms for your remote page to load`);
        // Return the error for further assertions if needed
        return err;
      });
  });
});

Cypress.Commands.add('getLatestFile', (downloadsFolder) => {
  cy.task('getLatestFile', downloadsFolder).then((latestFile) => {
    cy.wrap(latestFile).as('latestFile');
  });
});

// Cypress.Commands.add('verifyFolderInZip', (filePath, folderName) => {
//   cy.readFile(filePath, 'binary').then((fileContent) => {
//     const zip = new AdmZip(Buffer.from(fileContent, 'binary'));
//     const zipEntries = zip.getEntries();

//     // Check if any entry name contains the folder name as a parent directory
//     const folderExists = zipEntries.some((entry) => entry.entryName && entry.entryName.startsWith(folderName + '/'));

//     expect(folderExists).to.be.true;
//   });
// });

// Cypress.Commands.add('verifyZipContents', (filePath, expectedFiles) => {
//   cy.readFile(filePath, 'binary').then((fileContent) => {
//     const zip = new AdmZip(Buffer.from(fileContent, 'binary'));
//     const zipEntries = zip.getEntries();
//     const filesInZip = zipEntries.map((entry) => entry.entryName);

//     expectedFiles.forEach((expectedFile) => {
//       expect(filesInZip).to.include(expectedFile);
//     });
//   });
// });

Cypress.Commands.add('clearDownloadedZipFiles', () => {
  cy.exec('del /Q cypress\\downloads\\*.zip');
});

Cypress.Commands.add('retryIfFailed', (fn, retries = 3, delay = 2000) => {
  const attempt = (retryCount) => {
    cy.log(`Attempt ${retryCount + 1} of ${retries}`);
    cy.wrap(null)
      .then(fn)
      .then(
        () => {
          // Success case, resolve and stop retrying
          return;
        },
        (err) => {
          if (retryCount < retries) {
            cy.log(`Retrying after ${delay} ms...`);
            return cy.wait(delay).then(() => attempt(retryCount + 1));
          }
          // If out of retries, throw the error to fail the test
          throw err;
        },
      );
  };
  attempt(0);
});

Cypress.Commands.add('sendBashCommand', (command) => {
  cy.get('body').type(`${command}{enter}`);
});

Cypress.Commands.add('ForZDevEnvironment', () => {
  let apiUrl = 'https://dev-api.erp-deploy.com/api/v1/user/project';

  cy.intercept('POST', `${apiUrl}`).as('deployRequest');
  cy.intercept('GET', `${apiUrl}`).as('getProjects');
  cy.intercept('GET', `${apiUrl}/*/branches/`).as('getBranches');
  cy.intercept('GET', `${apiUrl}/*/branches/*/tracking/`).as('getProjectTracking');
  cy.intercept('POST', `**/user/project/*/branches/`).as('createBranch');
  cy.intercept('GET', `${apiUrl}/*/branches/*/backups/`).as('getBackups');
  cy.intercept('GET', `${apiUrl}/*/branches/*/meta/`).as('getMeta');
  cy.intercept('POST', `${apiUrl}/*/branches/*/backups/`).as('postBackup');
  cy.intercept('POST', `${apiUrl}/*/branches/*/backups/*/download/`).as('downloadZip');
  cy.intercept('GET', 'https://dev-api.erp-deploy.com/api/v1/builds/build-logs/*').as('LogsFetch');
  cy.intercept('GET', 'https://dev-api.erp-deploy.com/api/v1/builds/build-logs/*').as('BuildsLog');

  cy.loginWith_C2D_Dev_ZNavDev();

  const url = 'https://dev.erp-deploy.com/project';
  return cy.wrap(url);
});
Cypress.Commands.add('ForDevEnvironment', () => {
  let apiUrl = 'https://dev-api.erp-deploy.com/api/v1/user/project';

  cy.intercept('POST', `${apiUrl}`).as('deployRequest');
  cy.intercept('GET', `${apiUrl}`).as('getProjects');
  cy.intercept('GET', `${apiUrl}/*/branches/`).as('getBranches');
  cy.intercept('GET', `${apiUrl}/*/branches/*/tracking/`).as('getProjectTracking');
  cy.intercept('POST', `**/user/project/*/branches/`).as('createBranch');
  cy.intercept('GET', `${apiUrl}/*/branches/*/backups/`).as('getBackups');
  cy.intercept('GET', `${apiUrl}/*/branches/*/meta/`).as('getMeta');
  cy.intercept('POST', `${apiUrl}/*/branches/*/backups/`).as('postBackup');
  cy.intercept('POST', `${apiUrl}/*/branches/*/backups/*/download/`).as('downloadZip');
  cy.intercept('GET', 'https://dev-api.erp-deploy.com/api/v1/builds/app-logs/*').as('LogsFetch');

  cy.loginWith_C2D_Dev();

  const url = 'https://dev.erp-deploy.com/project';
  return cy.wrap(url);
});

Cypress.Commands.add('ForProdEnvironment', () => {
  let apiUrl = 'https://api.click2deploy.com/api/v1/user/project';

  cy.intercept('POST', `${apiUrl}`).as('deployRequest');
  cy.intercept('GET', `${apiUrl}`).as('getProjects');
  cy.intercept('GET', `${apiUrl}/*/branches/`).as('getBranches');
  cy.intercept('GET', `${apiUrl}/*/branches/*/tracking/`).as('getProjectTracking');
  cy.intercept('POST', `**/user/project/*/branches/`).as('createBranch');
  cy.intercept('GET', `${apiUrl}/*/branches/*/backups/`).as('getBackups');
  cy.intercept('GET', `${apiUrl}/*/branches/*/meta/`).as('getMeta');
  cy.intercept('POST', `${apiUrl}/*/branches/*/backups/`).as('postBackup');
  cy.intercept('POST', `${apiUrl}/*/branches/*/backups/*/download/`).as('downloadZip');

  cy.loginWithDev();

  const url = 'https://click2deploy.com/project/';
  return cy.wrap(url);
});

// --------------------------------NEW UI -----------------------------------------------//
// --------------------------------NEW UI -----------------------------------------------//
// --------------------------------NEW UI -----------------------------------------------//
// --------------------------------NEW UI -----------------------------------------------//

// for Production
let projectURL = 'https://click2deploy.com/';
let projectLink = 'https://click2deploy.com/project';
let ApiURL = 'https://api.click2deploy.com/api/v1';

// For Dev.
// let projectURL=    "https://dev.erp-deploy.com/";
// let projectLink=    "https://dev.erp-deploy.com/project";
// let ApiURL=         "https://dev-api.erp-deploy.com/api/v1" ;

Cypress.Commands.add('NewUI_LoginToProd', () => {
  cy.viewport(1726, 1000);
  cy.intercept('GET', '/api/auth/session', {
    body: {
      user: {
        name: 'pucar15',
        email: 'pucar15sahiwal@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/167426436?v=4',
        id: '167426436',
      },
      expires: '2024-09-23T05:39:16.261Z',
    },
  }).as('mockedSession');

  cy.setCookie(
    '__Host-next-auth.csrf-token',
    '859af33f2e8ac5892dc20a18f84e36352ee9aa46c1f87bfab8ae0de21b0434d3%7Ce409b4fa76866fa2ba535f5f0658fbc277924d2ddf9ee3ca7427c6acb960a243',
    { secure: true, path: '/' },
  );
  cy.setCookie(
    '__Secure-next-auth.callback-url',
    encodeURIComponent(`${projectURL}`),
    // encodeURIComponent(`https://developer.erp-deploy.com/`),
    { secure: true, path: '/' },
  );
  cy.setCookie(
    '__Secure-next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..MY3KgKBdVjekqTUs.TpJt2OqmeedEpYEptvYTEvB8oZY0XJ_fRB2lnoyxeut9ZwQqRuwCeR76QgMCIdz0RwonQ9Sw2VXmH7f6aGr9LRSpoJQOI73w-CSC-fd69x4a_0MMs_5k-OzCdWfXRRrzL00RE7DW6YpAwdnfY6mvvGU1v-q7b12twi6U1U8MlCjs9lwlRTSu3bOKKxytgwN6yzjFPJRFRGezYNV04IB2rgw9I7cnGrzzc3c7fAVjwAKGzZuVdRwcN2pSEdf5sjgPRZiWmixQDMEd5QMjBg7tV5Yv6jS-G0ebGLjRDW29_Tfli0u0d8phbKCc4ysSGVgBu6XxRozFnPgQXmvuD50V8TsjwTaAVFAkgAjh6G-zlZ1OJWpT8moAqU2W-RgbPNY3VKo.x9IxevBnMYa9wZhd8CnMng',
    { secure: true, path: '/' },
  );

  const apiUrl = `${ApiURL}/accounts/github/login/`;
  // const apiUrl = `https://dev-api.erp-deploy.com/api/v1/accounts/github/login/`;
  const requestBody = {
    email: 'pucar15sahiwal@gmail.com',
  };

  axios.post(apiUrl, requestBody).then((response) => {
    localStorage.setItem('backendToken', response.data.data.access);
  });

  const url = `${projectLink}`;
  // const url = `https://developer.erp-deploy.com/project/`;
  return cy.wrap(url);
});

Cypress.Commands.add('NewUI_LoginToDev', () => {
  cy.viewport(1726, 1000);
  cy.intercept('GET', '/api/auth/session', {
    body: {
      user: {
        name: 'pucar15',
        email: 'pucar15sahiwal@gmail.com',
        image: 'https://avatars.githubusercontent.com/u/167426436?v=4',
        id: '167426436',
      },
      expires: '2024-09-26T05:22:31.129Z',
    },
  }).as('mockedSession');

  cy.setCookie(
    '__Host-next-auth.csrf-token',
    '520a947a74e28c4368710255c7484e0623858d2466a85158e3678c3e3649bb7a%7C59a7804c367efab9233ac9c8047261b3b9f3d9f7e4ae4589aa248ce935743d2e',
    { secure: true, path: '/' },
  );
  cy.setCookie(
    '__Secure-next-auth.callback-url',
    encodeURIComponent(`${projectURL}`),
    // encodeURIComponent(`https://developer.erp-deploy.com/`),
    { secure: true, path: '/' },
  );
  cy.setCookie(
    '__Secure-next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..MwkspBkRJV8NabNf.kb9Png-D_OprtASGxtbx-G89cNL1V7ug1inwzkaza9OXuB7RI_ej9v1epDRj819Eo8q3yD1cI1UuP-idPDPvPDwOnOltwHY3t8V8iATcLF8NgdhpPcR3hkCBRpWX104qyVECPCoR7gZ8pwkqwvjhi_N1MnjxxQp0StXLjjjxv9_ffDO--sKwSjpvHD5MdPs9050OS-xpoo7-xi0-xPzxA6cC6xvA3A9SoAI8141C2J-84SZ8yKWF-tiHjHIXZ1GKm9M1aHTiTMgI9ERHirsapS9mnurixvndQ48su79zouKAU8iJEdTXVn7xDo8kmio3R04GP4e9mQdwdElxHs2FuvaTGYH1cuLBdTxnVpVkekyfvwaj-_NlzV9hpc71nU3qnKc.qICFZonwZBZpXiLDg2m_hA',
    { secure: true, path: '/' },
  );

  const apiUrl = `${ApiURL}/accounts/github/login/`;
  // const apiUrl = `https://dev-api.erp-deploy.com/api/v1/accounts/github/login/`;
  const requestBody = {
    email: 'pucar15sahiwal@gmail.com',
  };

  axios.post(apiUrl, requestBody).then((response) => {
    localStorage.setItem('backendToken', response.data.data.access);
  });

  const url = `${projectLink}`;
  // const url = `https://developer.erp-deploy.com/project/`;
  return cy.wrap(url);
});

Cypress.Commands.add('NewUI_ForProdEnvironment', () => {
  let apiUrl = `${ApiURL}`;
  // let apiUrl = `https://dev-api.erp-deploy.com/api/v1`;

  cy.intercept('POST', `${apiUrl}/user/project/`).as('deployRequest');
  cy.intercept('GET', `${apiUrl}/user/project/`).as('getProjects');
  cy.intercept('GET', `${apiUrl}/user/project/*/branches/`).as('getBranches');
  cy.intercept('GET', `${apiUrl}/user/project/*/branches/*/tracking/`).as('getProjectTracking');
  cy.intercept('POST', `${apiUrl}/user/project/*/branches/`).as('createBranch');
  cy.intercept('GET', `${apiUrl}/user/project/*/branches/*/backups/`).as('getBackups');
  cy.intercept('GET', `${apiUrl}/user/project/*/branches/*/meta/`).as('getMeta');
  cy.intercept('POST', `${apiUrl}/user/project/*/branches/*/backups/`).as('postBackup');
  cy.intercept('POST', `${apiUrl}/user/project/*/branches/*/backups/*/download/`).as('downloadZip');
  cy.intercept('GET', `${apiUrl}/user/repository/`).as('ExistRepository');

  if (projectLink === 'https://click2deploy.com/project') {
    cy.NewUI_LoginToProd();
  } else {
    cy.NewUI_LoginToDev();
  }

  const url = `${projectLink}`;
  // const url = `https://developer.erp-deploy.com/project`;
  return cy.wrap(url);
});
