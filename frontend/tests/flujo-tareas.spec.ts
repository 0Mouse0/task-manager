import { test, expect } from '@playwright/test'

test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
    await page.goto('/')

    await page.getByPlaceholder('Escribe una nueva tarea').fill('Comprar pan')
    await page.getByRole('button', { name: 'Agregar Tarea' }).click()

    await expect(page.getByText('Comprar pan')).toBeVisible()
})