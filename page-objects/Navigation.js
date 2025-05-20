export class Navigation {
    constructor(page) {
        this.page = page
        this.basketCounter = page.locator("div[data-qa='header-basket-count']")
        this.checkoutTab = page.getByRole('link', { name: 'Checkout' })
    }

    goToCheckout = async (expect) => {
        await this.checkoutTab.click()
        expect(this.page).toHaveURL("/basket")
    }
    
    getBasketCount = async () => {
        const basketCount = await this.basketCounter.innerText()
        return parseInt(basketCount, 10)
    }
}