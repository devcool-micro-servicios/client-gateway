import 'dotenv/config';

import * as Joi from 'joi';

interface Envs {
  PORT: number;
  PRODUCTS_SERVICE_HOST: string;
  PRODUCTS_SERVICE_PORT: number;
}

const envsSchema = Joi.object<Envs>({
  PORT: Joi.number().required(),
  PRODUCTS_SERVICE_HOST: Joi.string().required(),
  PRODUCTS_SERVICE_PORT: Joi.number().required(),
}).unknown();

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envs: Envs = value;

export const envsVars = {
  port: envs.PORT,
  PRODUCTS_SERVICE_HOST: envs.PRODUCTS_SERVICE_HOST,
  PRODUCTS_SERVICE_PORT: envs.PRODUCTS_SERVICE_PORT,
};
