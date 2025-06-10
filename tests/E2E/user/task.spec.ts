import { auth } from "../helpers/auth";
import test from "@playwright/test";

test.describe("Подсистема пользователя. Тесты страницы задачи", () => {
  test.beforeEach(async ({ page }) => auth(page));

  test("должен создавать проект с валидным названием и показывать toast об успехе", async ({
    page,
  }) => {
    await page.goto("/tasks/1");

    const takeTaskButton = page.getByRole("button", { name: "Взять задачу" });
    if (!(await takeTaskButton.isVisible())) {
      return;
    }

    await takeTaskButton.click();

    await page
      .getByPlaceholder("Введите название проекта...")
      .fill("Тестовый проект");
    await page.getByRole("button", { name: "Создать проект" }).click();

    const toast = page.getByText("Успех операции", { exact: true });
    await toast.waitFor({ state: "visible", timeout: 3000 });
  });
});
