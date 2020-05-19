# Set Environment Github Action

A Github action to read in a configuration file and set the environmental variables based on the values in it.

## How to Use

With a config.yaml file in the root of your repo:

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
