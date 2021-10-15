import { createRouter } from '@internal/plugin-status-report-backend';
import { PluginEnvironment } from '../types';

let envPlugin:PluginEnvironment;

export default async function createPlugin(env: PluginEnvironment) {
    // Here is where you will add all of the required initialization code that
    // your backend plugin needs to be able to start!
    envPlugin = env;
    
    // The env contains a lot of goodies, but our router currently only
    // needs a logger
    return await createRouter({
        logger: env.logger,        
    });        
}