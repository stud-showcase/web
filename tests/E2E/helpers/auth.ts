import { Page } from "@playwright/test";

export async function auth(page: Page) {
  await page.goto("/");
  await page.getByRole("link", { name: "Войти" }).click();

  await page
    .getByRole("textbox", { name: "username" })
    .fill(process.env.AUTH_USERNAME);
  await page.getByRole("textbox", { name: "password" }).fill(process.env.AUTH_PASSWORD);

  await page.locator("#kc-login").click();
}
