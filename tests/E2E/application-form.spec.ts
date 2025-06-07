import test from "@playwright/test";

test.describe("Тесты формы заявки", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/application");
  });

  test("должен отправлять форму с валидными данными и показывать toast об успехе", async ({ page }) => {
    // Заполняем поля формы
    await page.getByLabel("Название задачи *").fill("Тестовая задача");
    await page.getByLabel("Описание задачи *").fill("Это тестовое описание задачи");
    await page.getByLabel("Заказчик *").fill("Тестовый заказчик");
    await page.getByLabel("Email *").fill("test@example.com");
    await page.getByLabel("Телефон").fill("+79991234567");

    // Нажимаем кнопку отправки
    await page.getByRole("button", { name: "Оставить заявку" }).click();

    // Ожидаем появление toast-уведомления
    const toast = page.getByText("Успех операции", { exact: true });
    await toast.waitFor({ state: "visible", timeout: 15000 });
  });
});

// import test from "@playwright/test";

// test.describe("Полный сценарий работы с заявкой", () => {
//   const applicationName = `Тестовая задача ${Date.now()}`;

//   test("Пользователь создает заявку → Админ обрабатывает", async ({ browser }) => {
//     const userContext = await browser.newContext();
//     const userPage = await userContext.newPage();

//     await test.step("1. Пользователь заполняет и отправляет заявку", async () => {
//       await userPage.goto("/application");
//       await userPage.getByLabel("Название задачи *").fill(applicationName);
//       await userPage.getByLabel("Описание задачи *").fill("Полное описание тестовой задачи");
//       await userPage.getByLabel("Заказчик *").fill("Тестовый заказчик");
//       await userPage.getByLabel("Email *").fill("user@example.com");
//       await userPage.getByRole("button", { name: "Оставить заявку" }).click();
//       const toast = userPage.getByText("Успех операции", { exact: true });
//       await toast.waitFor({ state: "visible", timeout: 15000 });
//     });

//     await userContext.close();

//     const adminContext = await browser.newContext();
//     const adminPage = await adminContext.newPage();

//     await test.step("2. Админ находит заявку через поиск", async () => {
//       await adminPage.goto("/admin/applications");
//       adminPage.getByPlaceholder("Поиск...").fill(applicationName);
//     });

//     await adminContext.close();
//   });
// });
