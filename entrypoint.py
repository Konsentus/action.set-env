#!/usr/bin/env python3

import yaml
import os
from pathlib import Path

config_file = os.getenv("INPUT_CONFIG_FILE", "config.yaml")

with open(f"/github/workspace/{config_file}", "r") as stream:
    config = yaml.safe_load(stream)

env = os.environ["APP_ENV"]

defaultConfig = config.get("default", {})
envConfig = config.get(env)

if not isinstance(defaultConfig, dict):
    raise Exception("Default config is not an instance of dictionary")

if not envConfig or not isinstance(envConfig, dict):
    raise Exception(f"No config defined for environment {env}")

mergedConfig = {**defaultConfig, **envConfig}

for k, v in mergedConfig.items():
    print(f"::set-env name={k.upper()}::{v}")
