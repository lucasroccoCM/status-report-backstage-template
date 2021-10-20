
// import * as azdev from "azure-devops-node-api";
// import { TeamProject } from "../interfaces/TeamProject";

// // your collection url
// const orgUrl = "https://dev.azure.com/cloudmotion-projetos";

// let projectId:string = '';

// async function setupConnection() {    

//     let token: string = process.env.AZURE_PERSONAL_ACCESS_TOKEN as string;

//     let authHandler = azdev.getPersonalAccessTokenHandler(token); 
    
//     let connection = new azdev.WebApi(orgUrl, authHandler);

//     return connection;
// }

// export async function createTeamProject(teamProject: TeamProject) {

//     const connection = setupConnection();

//     let coreApi = (await connection).getCoreApi(orgUrl);

//     (await coreApi).queueCreateProject({
//       name: teamProject.Name,
//       description: teamProject.Description,
//       capabilities: {versioncontrol: {sourceControlType: "Git"}, 
//         processTemplate: {templateTypeId: "119374d2-0caa-4eba-b47f-563f2a23d45d"}},
//     }).then(resp => {
//         return resp;
//     });        
// }

// export async function createWorkItemCreatedHook(projectName: string) {
    
//     const connection = setupConnection();

//     let coreApi = (await connection).getCoreApi(orgUrl);

//     const projects = (await coreApi).getProjects();
//     projectId = (await projects).filter((value) => {
//         value.name = projectName;
//     })[0].id as string;

//     let notificationApi = (await (connection)).getNotificationApi(orgUrl);

//     (await notificationApi).createSubscription()
    
//     //(await coreApi).http.post(`${(await coreApi).baseUrl}\`)

//     //(await coreApi).getProject(projectId).
// }