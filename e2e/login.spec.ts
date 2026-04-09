import { test, expect } from '@playwright/test'

test.describe('Login page', () => {
  test('renders title and description', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByText('Ryotei Share')).toBeVisible()
    await expect(page.getByText('旅程を作って')).toBeVisible()
    await expect(page.getByText('シェアしよう')).toBeVisible()
  })

  test('shows Google and GitHub login buttons', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('button', { name: 'Googleでログイン' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Githubでログイン' })).toBeVisible()
  })

  test('redirects to /login when accessing / without auth', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/login/)
  })
})
