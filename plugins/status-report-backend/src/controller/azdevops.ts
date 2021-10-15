
import * as azdev from "azure-devops-node-api";
import { TeamProject } from "../interfaces/TeamProject";

// your collection url
const orgUrl = "https://dev.azure.com/cloudmotion-projetos";

export async function createTeamProject(teamProject: TeamProject) {

    process.env.AZURE_PERSONAL_ACCESS_TOKEN = teamProject.Pat;

    let token: string = process.env.AZURE_PERSONAL_ACCESS_TOKEN as string;

    let authHandler = azdev.getPersonalAccessTokenHandler(token); 
    
    let connection = new azdev.WebApi(orgUrl, authHandler);

    let coreApi = connection.getCoreApi(orgUrl);

    (await coreApi).queueCreateProject({
      name: teamProject.Name,
      description: teamProject.Description,
      capabilities: {versioncontrol: {sourceControlType: "Git"}, 
        processTemplate: {templateTypeId: "119374d2-0caa-4eba-b47f-563f2a23d45d"}},
    }).then(resp => {
        return resp;
    });        
}