// env.js
function parseEnvFile(content) {
  const env = {};
  const lines = content.split("\n");

  for (let line of lines) {
    const [key, value] = line.split("=");
    env[key] = value;
  }

  return env;
}

const envContent =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_ENV
    : process.env.REACT_APP_DEVELOPMENT_ENV;

const parsedEnv = parseEnvFile(envContent);
export default parsedEnv;
