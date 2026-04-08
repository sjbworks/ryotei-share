import { test, expect } from '@playwright/test'

test.describe('Share page', () => {
  // Use a valid UUID format that does not exist in the database
  const NONEXISTENT_SHARE_ID = '00000000-0000-0000-0000-000000000000'

  test('shows error message for non-existent share ID', async ({ page }) => {
    await page.goto(`/${NONEXISTENT_SHARE_ID}`)
    await expect(page.getByText('旅程が見つかりませんでした')).toBeVisible()
    await expect(page.getByText('旅程が削除されたか、非公開になっています。')).toBeVisible()
  })

  test('share page does not redirect to login', async ({ page }) => {
    await page.goto(`/${NONEXISTENT_SHARE_ID}`)
    await expect(page).not.toHaveURL(/\/login/)
  })
})
