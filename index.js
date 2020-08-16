const core = require('@actions/core');
const github = require('@actions/github');
const yaml = require('js-yaml');
const fs = require('fs');

/**
 * Reads a yaml file into a JS object.
 *
 * @param {str} configFileLocation - The location of the yaml config file.
 * @returns {Object}
 */
const readYamlFile = configFileName => {
  try {
    return yaml.safeLoad(fs.readFileSync(`/github/workspace/${configFileName}`, 'utf8'));
  } catch (e) {
    core.setFailed(`File ${configFileName} cannot be read: ${e}`);
  }
};

const run = async () => {
  core.info('Starting action.set-env');
  try {
    const configFileName = process.env.INPUT_CONFIG_FILE;
    const env = process.env.APP_ENV || github.context.ref.replace('refs/heads/', '').split('/')[0];
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];

    core.info(`configFileName: ${configFileName}`);
    core.info(`env: ${env}`);
    core.info(`repoName: ${repoName}`);

    core.exportVariable('REPO_NAME', repoName);
    core.exportVariable('REPO_NAME_DASH', repoName.replace('.', '-'));

    const config = readYamlFile(configFileName);

    if (!config['default']) {
      core.setFailed('Default configuration cannot be found, aborting...');
    }

    if (!config[env]) {
      core.warning(`No config explicitly defined for environment ${env}, using default`);
    }

    completeConfig = { ...config['default'], ...config[env] };

    Object.entries(completeConfig).forEach(([key, value]) => {
      core.exportVariable(key, value);
    });
    core.info('Completed action.set-env');
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
