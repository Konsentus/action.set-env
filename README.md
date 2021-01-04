# Set Environment Variables Github Action

A Github action to read in a configuration file and set the environmental variables based on the values in it. If an variable is not present in the environment section, then the default value is used.

In addition it will set the following environmental variables:

- `APP_ENV` : The application environment detected
- `REPO_NAME` : The name of the `GITHUB_REPOSITORY` without the owners name
- `REPO_NAME_DASH` : The name of the `GITHUB_REPOSITORY` without the owners name, but with all dots replaced with dashes

## How to Use

With an `env.yaml` file in the `.github` folder of your repo:

```yml
default:
  default_value: a default value
  env_value: default value
sit:
  env_value: overridden value # this will be the name of the target
```

Which can then be read and output in the following workflow steps:

```yml
- name: Setup environment variables
  uses: konsentus/action.set-env@master

- name: Check variables have been set
  run: |
    echo $DEFAULT_VALUE
    echo $ENV_VALUE
```

The environment used is either passed using the `APP_ENV` environmental variable or if not present, defaults to the branch name within the `GITHUB_REF` environmental variable.

## Optional Environmental Variables

- `APP_ENV`: the environment to use when reading the configuration file

## Optional Arguments

- `config_file`: allows a configuration file other than `.github/env.yaml` to be read

## Outputs

The action doesn't have any action outputs, instead it outputs the configuration as environmental variables which can be used by subsequent steps.
