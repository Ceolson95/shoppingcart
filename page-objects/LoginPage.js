import { expect } from "@playwright/test"

export class LoginPage {
    constructor(page) {
        this.page = page

        this.registerButton = page.locator("button[data-qa='go-to-signup-button']")

    }

    goToSignUp = async () => {
        await this.registerButton.waitFor()
        await this.registerButton.click()
        await this.page.waitForURL(/\/signup/, {timeout: 3000})
        expect(this.page).toHaveURL(/\/signup/, {timeout: 3000})
    }
}