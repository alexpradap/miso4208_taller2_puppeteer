const timeout = 60000;
const firstName = 'First Name';
const lastName = 'Last Name';
const username = 'username';
const password = 'password';

describe(
  'Open Registration Page',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    test('Test registraion successful', async () => {
	  await page.goto('https://angular-6-registration-login-example.stackblitz.io/register');
	  await page.waitFor('#promptToRun');
	  await page.click('#promptToRun>div:nth-child(1)>button:nth-child(2)');
	  await page.waitFor('.jumbotron');
	  await page.type('div.form-group:nth-child(1)>input:nth-child(2)', firstName);
	  await page.type('div.form-group:nth-child(2)>input:nth-child(2)', lastName);
	  await page.type('div.form-group:nth-child(3)>input:nth-child(2)', username);
	  await page.type('div.form-group:nth-child(4)>input:nth-child(2)', password);
	  await page.click('button.btn.btn-primary');
	  await global.__BROWSER__.waitForTarget(target => target.url() === 'https://angular-6-registration-login-example.stackblitz.io/login');
    }, timeout)

	test('Test failed login', async () => {
	  await page.goto('https://angular-6-registration-login-example.stackblitz.io/login');
	  await page.waitFor('.jumbotron');
	  await page.type('div.form-group:nth-child(1)>input:nth-child(2)', username);
	  await page.type('div.form-group:nth-child(2)>input:nth-child(2)', 'wrong-password');
	  await page.click('button.btn.btn-primary');
	  await page.waitForSelector('.alert');
	  let element = await page.$('.alert');
	  let value = await page.evaluate(el => el.textContent, element);
	  expect(value).toBe('Username or password is incorrect');
    }, timeout)

	test('Test login successul', async () => {
	  await page.goto('https://angular-6-registration-login-example.stackblitz.io/login');
	  await page.waitFor('.jumbotron');
	  await page.type('div.form-group:nth-child(1)>input:nth-child(2)', username);
	  await page.type('div.form-group:nth-child(2)>input:nth-child(2)', password);
	  await page.click('button.btn.btn-primary');
	  await global.__BROWSER__.waitForTarget(target => target.url() === 'https://angular-6-registration-login-example.stackblitz.io/');
    }, timeout)

  },
  timeout
)
