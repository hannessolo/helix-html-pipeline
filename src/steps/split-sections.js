/*
 * Copyright 2018 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { selectAll } from 'unist-util-select';

// Compute the meta information for the section
function computeMeta(section) {
  return selectAll('yaml', section).reduce((prev, { payload }) => Object.assign(prev, payload), Object.create(null));
}

/**
 * Splits the sections in the mdast tree
 * @type PipelineStep
 * @param {PipelineState} state
 */
export default function split(state) {
  const { content: { mdast } } = state;

  // filter all children that are either yaml or break blocks
  const dividers = mdast.children.filter((node) => node.type === 'yaml' || node.type === 'thematicBreak')
    // then get their index in the list of children
    .map((node) => mdast.children.indexOf(node));

  // find pairwise permutations of spaces between blocks
  // include the very start and end of the document
  const starts = [0, ...dividers];
  const ends = [...dividers, mdast.children.length];

  // content.mdast.children = _.zip(starts, ends)
  mdast.children = starts.map((k, i) => [k, ends[i]])
    // but filter out empty section
    .filter(([start, end]) => start !== end)
    // then return all nodes that are in between
    .map(([start, end]) => {
      // skip 'thematicBreak' nodes
      const index = mdast.children[start].type === 'thematicBreak' ? start + 1 : start;
      const section = {
        type: 'section',
        children: mdast.children.slice(index, end),
      };
      section.meta = computeMeta(section);
      return section;
    });

  // unwrap sole section directly on the root
  if (mdast.children.length === 1 && mdast.children[0].type === 'section') {
    mdast.children = mdast.children[0].children;
  }
}
