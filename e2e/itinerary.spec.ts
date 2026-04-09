import { test, expect } from '@playwright/test'

const hasAuthCredentials = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.E2E_TEST_EMAIL &&
  process.env.E2E_TEST_PASSWORD
)

test.describe('Itinerary flow', () => {
  test.beforeAll(() => {
    test.skip(!hasAuthCredentials, 'E2E_TEST_EMAIL / E2E_TEST_PASSWORD not set')
  })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await expect(page).not.toHaveURL(/\/login/)
  })

  test('shows empty state for authenticated user with no trips', async ({ page }) => {
    await expect(page.getByText('旅程を作成しましょう')).toBeVisible()
    await expect(page.getByText('旅行の予定を立てるために、まず旅程を作成してください。')).toBeVisible()
  })

  test('shows 旅程を作成 button in empty state', async ({ page }) => {
    await expect(page.getByRole('button', { name: '旅程を作成' })).toBeVisible()
  })

  test('opens TripListDrawer when 旅程を作成 is clicked', async ({ page }) => {
    await page.getByRole('button', { name: '旅程を作成' }).click()
    await expect(page.getByTestId('trip-list-drawer')).toBeVisible()
  })

  test('can create a new trip', async ({ page }) => {
    // Mock the GraphQL mutation to avoid needing a real DB record
    await page.route('**/graphql', async (route) => {
      const request = route.request()
      const body = request.postDataJSON()

      if (body?.query?.includes('insertIntotripsCollection')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              insertIntotripsCollection: {
                records: [{ id: 'test-trip-id', name: 'E2Eテスト旅程', created_at: new Date().toISOString() }],
              },
            },
          }),
        })
      } else {
        await route.continue()
      }
    })

    await page.getByRole('button', { name: '旅程を作成' }).click()

    // Click 旅程を作成 in the drawer
    const drawerAddButton = page.getByRole('button', { name: '旅程を作成' })
    await drawerAddButton.click()

    // BottomDrawer form should open
    await expect(page.getByRole('textbox').first()).toBeVisible()
  })
})

test.describe('Itinerary detail flow', () => {
  test.beforeEach(async ({ page }) => {
    test.skip(!hasAuthCredentials, 'E2E_TEST_EMAIL / E2E_TEST_PASSWORD not set')

    // Mock trips data for consistent test state
    await page.route('**/graphql', async (route) => {
      const body = route.request().postDataJSON()

      if (body?.query?.includes('tripsCollection')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              tripsCollection: {
                edges: [{ node: { id: 'trip-1', name: 'E2Eテスト旅程', created_at: '2025-01-01' } }],
              },
            },
          }),
        })
      } else if (body?.query?.includes('ryoteiCollection')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: { ryoteiCollection: { edges: [] } },
          }),
        })
      } else {
        await route.continue()
      }
    })

    await page.goto('/')
    await expect(page).not.toHaveURL(/\/login/)
  })

  test('shows account menu icon', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'account menu' })).toBeVisible()
  })

  test('shows SpeedDial action buttons', async ({ page }) => {
    const speedDial = page.getByLabel('SpeedDial: 予定を追加, 旅程をシェア')
    await expect(speedDial).toBeVisible()
  })

  test('opens account menu with logout option', async ({ page }) => {
    await page.getByRole('button', { name: 'account menu' }).click()
    await expect(page.getByRole('menuitem', { name: 'ログアウト' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: '退会' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: '利用規約・プライバシーポリシー' })).toBeVisible()
  })
})
