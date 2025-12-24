import { test, expect } from '@playwright/test'

test('users page loads', async ({ page }) => {
  await page.route('**/ahead/users', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@doe.com'
        }
      ])
    })
  )

  await page.goto('http://localhost:5173')

  await expect(
    page.getByRole('heading', { name: 'Users' })
  ).toBeVisible()
})