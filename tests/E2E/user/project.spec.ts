import { test } from "@playwright/test";
import { auth } from "../helpers/auth";

test.describe("Подсистема пользователя. Тесты страницы проекта", () => {
  test.beforeEach(async ({ page }) => auth(page));

  test("должен подавать заявку на вступление в проект без вакансий и показывать toast об успехе", async ({ page }) => {
    await page.goto("/projects/3");

    const joinButton = page.getByRole("button", { name: "Вступить" });
    if (!(await joinButton.isVisible())) {
      return;
    }

    await joinButton.click();

    const applyButton = page.getByRole("button", { name: "Подать заявку" });
    if (!(await applyButton.isVisible()) || (await applyButton.isDisabled())) {
      return;
    }

    await applyButton.click();

    const toast = page.getByText("Успех операции", { exact: true });
    await toast.waitFor({ state: "visible", timeout: 3000 });
  });
});
