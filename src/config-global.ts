import packageJson from '../package.json';
import { isDev } from "./environment"

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
};
export interface IConfigCollection {
  baseUrl: string,
  apiBaseUrl: string,
}
// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'Dnt Admin',
  appVersion: packageJson.version,
};

const Dev: IConfigCollection = {
  baseUrl: "http://localhost:3039/",
  apiBaseUrl: "http://localhost:8099/api/v1/"
}

const Prod: IConfigCollection = {
  baseUrl: "http://localhost:3039/",
  apiBaseUrl: "http://localhost:8099/api/v1/"
}
const AppConfig = isDev ? Dev : Prod

export default AppConfig