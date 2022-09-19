/*
 * Copyright (c) 2022, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import got from 'got';
import { SfCommand } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.load('plugin-simple-hack', 'zen.generate', ['summary', 'description', 'examples']);

export type ZenGenerateResult = {
  quote: string;
  author: string;
};

type ApiResponse = [
  {
    q: string;
    a: string;
    h: string;
  }
];

export default class ZenGenerate extends SfCommand<ZenGenerateResult> {
  public static summary = messages.getMessage('summary');
  public static description = messages.getMessage('description');
  public static examples = messages.getMessages('examples');

  public async run(): Promise<ZenGenerateResult> {
    const result = await got<ApiResponse>('https://zenquotes.io/api/random').json<ApiResponse>();

    const { q: quote, a: author } = result[0];

    this.log(`${quote}\n-- ${author}`);

    return { quote, author };
  }
}
