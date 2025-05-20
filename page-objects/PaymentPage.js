import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
        this.page = page

        this.discountPercent = page.frameLocator("iframe[data-qa='active-discount-container']").locator("p").first()
        this.discountCode = page.frameLocator("iframe[data-qa='active-discount-container']").locator("p[data-qa='discount-code']")
        this.discountCodeInput = page.locator("input[data-qa='discount-code-input']")
        this.discountButton = page.locator("button[data-qa='submit-discount-button']")
    }

    applyDiscountCode = async () => {
        await this.discountCode.waitFor()
        const discount = await this.discountCode.innerText()
        await this.discountCodeInput.fill(discount)
        await expect(this.discountCodeInput).toHaveValue(discount)
        await this.discountButton.click()
        const paragraphPercent = await this.discountPercent.innerText() 
        const match = paragraphPercent.match(/(\d+)%/);
        const percentage = match ? parseInt(match[1], 10) : null;
        console.log(percentage)
    }
}