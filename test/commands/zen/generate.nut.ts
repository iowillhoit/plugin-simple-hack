/*
 * Copyright (c) 2022, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import * as path from 'path';
import { execCmd, TestSession } from '@salesforce/cli-plugins-testkit';
import { env } from '@salesforce/kit';
import { expect } from 'chai';

describe('zen generate NUTs', () => {
  let session: TestSession;

  before(async () => {
    env.setString('TESTKIT_EXECUTABLE_PATH', path.join(process.cwd(), 'bin', 'dev'));
    session = await TestSession.create({});
  });

  after(async () => {
    await session?.clean();
  });

  it('should display quote', () => {
    const command = 'zen generate';
    const output = execCmd(command, { ensureExitCode: 0, cli: 'sf' }).shellOutput.stdout;
    expect(output).to.contain('--');
  });
});
