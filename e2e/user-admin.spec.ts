import { test, expect } from '@playwright/test'

test('Admin users page shows the expected layout and meta content', async ({ page }) => {
  // @TECHNICAL-DEBT: review how to mockup playwright on server side to avoid test real backend data that can change
  // await page.route('https://jsonplaceholder.typicode.com/users', async route => {
  //   // await page.route('*/**/jsonplaceholder.typicode.com/users', async route => {
  //   const json = [
  //     { 'id': 1, 'name': 'Foo', 'email': 'foo@gmail.com', 'username': 'foo' },
  //     { 'id': 2, 'name': 'Bar', 'email': 'bar@gmail.com', 'username': 'bar' }
  //   ]
  //   await route.fulfill({
  //     status: 200,
  //     contentType: 'application/json',
  //     body: JSON.stringify(json)
  //   })
  // })

  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1, name: /Users/i })).toBeVisible()
  await expect(page).toHaveTitle(/Admin users/)
})

test('when admin change user input it updates the url with the correct input value', async ({ page }) => {
  await page.goto('/')

  expect(page).toHaveURL('/')
  await expect(page.getByRole('heading', { level: 1, name: /Users/i })).toBeVisible()
  await page.getByRole('textbox').fill('Les')
  
  await expect(page).toHaveURL('/?username=Les')
})

