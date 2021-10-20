import { Config } from '@backstage/config';
import { createTemplateAction } from '@backstage/plugin-scaffolder-backend';
import { createTeamProject, initialize } from '@internal/plugin-status-report-backend';

export const CreateTeamProjectAction = (config:Config) => {
    return createTemplateAction<{ name: string, description: string, pat: string }>({
        id: 'mycompany:create-team-project',
        schema: {
            input: {
                required: ['name', 'description', 'pat'],
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        title: 'Nome do projeto',
                        description: 'Nome que será dado ao Team Project',
                    },
                    description: {
                        type: 'string',
                        title: 'Descrição do Projeto',
                        description: 'Descreva qual a finalidade do projeto',
                    },
                    pat: {
                        type: 'string',
                        title: 'PAT',
                        description: 'Personal Access Token'
                    }
                },
            },
        },
        async handler(ctx) {
            
            ctx.logStream.write(`Team Project Name: ${ctx.input.name}, Team Project Description: ${ctx.input.description}`);            
            
            process.env.AZURE_PERSONAL_ACCESS_TOKEN = ctx.input.pat;

            await initialize(config);

            await createTeamProject({
                Name: ctx.input.name,
                Description: ctx.input.description                
            });
        },
    });
}