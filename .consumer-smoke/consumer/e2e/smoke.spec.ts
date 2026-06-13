test('home page', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/.*/)
})
