import { test } from "@playwright/test";
import { auth } from "../helpers/auth";

test.describe("Подсистема администратора. Тесты страницы заявки", () => {
  test.beforeEach(async ({ page }) => auth(page));

  test("должен отправить заявку и показать toast об успехе", async ({
    page,
  }) => {
    await page.goto("/admin/applications/1");

    await page.getByLabel("Название задачи *").fill("Тестовая задача");
    await page
      .getByLabel("Описание задачи *")
      .fill("Это тестовая задача для проверки.");

    const complexitySelect = page.getByLabel("Сложность *");
    await complexitySelect.click();
    await page.keyboard.press("Enter");

    await page.getByLabel("Ограничение по числу участников *").fill("5");
    await page.getByLabel("Крайний срок *").fill("2025-12-31");
    await page.getByLabel("Заказчик *").fill("Тестовый заказчик");

    const submitButton = page.getByRole("button", { name: "Создать задачу" });
    await submitButton.click();

    const toast = page.getByText("Успех операции", {
      exact: true,
    });
    await toast.waitFor({ state: "visible", timeout: 3000 });
  });
});
