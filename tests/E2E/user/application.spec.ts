import test from "@playwright/test";

test.describe("Подсистема пользователя. Тесты страницы заявки", () => {
  test("должен отправлять форму с валидными данными и показывать toast об успехе", async ({
    page,
  }) => {
    await page.goto("/application");

    await page.getByLabel("Название задачи *").fill("Тестовая задача");
    await page
      .getByLabel("Описание задачи *")
      .fill("Это тестовое описание задачи");
    await page.getByLabel("Заказчик *").fill("Тестовый заказчик");
    await page.getByLabel("Email *").fill("test@example.com");
    await page.getByLabel("Телефон").fill("+79991234567");

    await page.getByRole("button", { name: "Оставить заявку" }).click();

    const toast = page.getByText("Успех операции", { exact: true });
    await toast.waitFor({ state: "visible", timeout: 3000 });
  });
});
