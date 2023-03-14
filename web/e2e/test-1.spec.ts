import { test } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('button', { name: 'Search' }).click()
  await page.locator('div:nth-child(3) > .button').first().click()
  await page.locator('input[name="firstName"]').fill('Matteo')
  await page.locator('input[name="lastName"]').fill('Paoli')
  await page.getByPlaceholder('Email Address').fill('matteo_paoli@outlook.com')
  await page.getByPlaceholder('Email Address').press('Tab')
  await page.getByRole('combobox').nth(1).selectOption('1998')
  await page.getByRole('option', { name: 'Choose Wednesday, March 11th, 1998' }).click()
  await page.getByPlaceholder('Passport Number').fill('ABC1234567')
  await page.getByText('I want to create an account').click()
  await page.getByPlaceholder('Password', { exact: true }).fill('Secret12')
  await page.getByPlaceholder('Repeat Password').fill('Secret12')
  await page.getByRole('button', { name: 'Submit' }).click()
})