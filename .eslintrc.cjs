/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  root: true,
  extends: '@adobe/helix',
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  rules: {
    'import/extensions': [2, 'ignorePackages'],
    'import/prefer-default-export': 0,
    'no-param-reassign': ['error', { props: false }],
  },
  globals: {
    __rootdir: true,
    __testdir: true,
  },
};
