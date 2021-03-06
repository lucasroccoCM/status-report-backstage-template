/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import { response } from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';

import * as azdevops from '../controller/azdevops';

export interface RouterOptions {
  logger: Logger  
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;

  const router = Router();
  router.use(express.json());

  router.use('/createteamproject', async (request, response) => {

    const createProjectResponse = await azdevops.createTeamProject({
      Name: request.body.name,
      Description: request.body.description      
    });

    logger.info(`Team Project Name: ${request.body.name}, Team Project Description: ${request.body.description}`);
    
    response.send(createProjectResponse);

  });  

  router.use(errorHandler());
  return router;
}