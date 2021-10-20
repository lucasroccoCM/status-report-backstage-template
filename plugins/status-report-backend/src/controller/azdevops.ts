
import { Config } from "@backstage/config";
import { TeamProject } from "../interfaces/TeamProject";

// your collection url
const orgUrl = "https://dev.azure.com/cloudmotion-projetos";
const createProjectApiUrl = `${orgUrl}/_apis/projects?api-version=6.1-preview.4`;
const createSubscriptionApiUrl = `${orgUrl}/_apis/hooks/subscriptions?api-version=6.1-preview.1`;

let logicAppUrl: string;

function getToken() {
    return `Basic ${process.env.AZURE_PERSONAL_ACCESS_TOKEN}`;
}

export async function initialize(config: Config) {
    logicAppUrl = config.getConfig('backend').getString('logicAppUrl');
}

export async function createTeamProject(teamProject: TeamProject) {

    const data = {
        "name": teamProject.Name,
        "description": teamProject.Description,
        "capabilities": {
            "versioncontrol": {
                "sourceControlType": "Git"
            },
            "processTemplate": {
                "templateTypeId": "119374d2-0caa-4eba-b47f-563f2a23d45d"
            }
        }
    };

    await callAzDevOpsApi(createProjectApiUrl, MethodType.Post, data);    

    setTimeout(() => {
        createWorkItemUpdatedHook(teamProject.Name);
    }, 5000);
}

export async function createWorkItemUpdatedHook(projectName: string) {

    await callAzDevOpsApi(createProjectApiUrl, MethodType.Get)
        .then(resp => {

            const projects = resp.value as Array<any>;
            const projectToHook = projects.filter((value) => {
                return value.name == projectName;
            });

            const data = {
                "publisherId": "tfs",
                "eventType": "workitem.updated",
                "resourceVersion": "1.0-preview.1",
                "consumerId": "webHooks",
                "consumerActionId": "httpRequest",
                "publisherInputs": {
                    "areaPath": "[Any]",
                    "workItemType": "Status Report",
                    "projectId": projectToHook[0].id,
                },
                "consumerInputs": {
                    "url": logicAppUrl
                }
            };
            
            callAzDevOpsApi(createSubscriptionApiUrl, MethodType.Post, data);

        });
}

enum MethodType {
    Post = 'POST',
    Get = 'GET',
    Put = 'PUT'
}

async function callAzDevOpsApi(apiUrl: string, methodType: MethodType, data?: any): Promise<any> {

    const token = getToken();

    const fetch = require("node-fetch");

    return await fetch(apiUrl, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        method: methodType,
        body: JSON.stringify(data)
    })
        .then(resp => {
            return resp.json();
        })
        .catch(err => {
            return err;
        })
}