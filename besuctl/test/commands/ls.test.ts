import { expect, test } from '@oclif/test';

describe('sir', () => {
  test
    .stdout()
    .command(['sir'])
    .it('runs sir', ctx => {
      expect(ctx.stdout).to.contain('sir world')
    })

  test
    .stdout()
    .command(['sir', '--name', 'posix me harder!'])
    .it('runs sir --name posix me harder!', ctx => {
      expect(ctx.stdout).to.contain('sir posix me harder!')
    })
})
