import { expect } from "@playwright/test"

export class CheckoutPage {
    constructor(page) {
        this.page = page
        this.basketCard = page.locator("div[data-qa='basket-card']")
        this.basketItemPrice = page.locator("div[data-qa='basket-item-price']")
        this.checkoutButton = page.locator("button[data-qa='continue-to-checkout']")
        this.removeFromBasketButton = page.locator("button[data-qa='basket-card-remove-item']")
    }

    continueToCheckout = async () => {
        await this.checkoutButton.waitFor()
        await this.checkoutButton.click()
        await this.page.waitForURL(/\/login/, {timeout: 3000})
    }

    removeCheapestItem = async () => {
        const basketItems = await this.page.locator("div[data-qa='basket-item-price']").allInnerTexts()
        const clean = basketItems.map((item) => {
            const withoutDollarSign = item.replace("$", "")
            return parseInt(withoutDollarSign, 10)
        })
        const smallestPrice = Math.min(...clean)
        const smallestPriceIndex = clean.indexOf(smallestPrice)
        await this.removeFromBasketButton.nth(smallestPriceIndex).click()
        const basketItemsAfter = await this.basketCard.count()
        expect(this.basketCard).toHaveCount(basketItemsAfter)
    }
}