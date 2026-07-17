import { test, expect } from '@playwright/test'

test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
    await page.goto('/')

    await page.getByPlaceholder('Escribe una nueva tarea').fill('Comprar pan')
    await page.getByRole('button', { name: 'Agregar Tarea' }).click()

    // Texto Correcto
    await expect(page.getByText('Comprar pan')).toBeVisible()

    // ! Provocando error
    // await expect(page.getByText('Comprar pan 🚫 texto incorrecto')).toBeVisible()
})
