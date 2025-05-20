import {Navigation} from "./Navigation"
import {expect} from "@playwright/test"

export class ProductPage {
    constructor(page) {
        this.page = page
        this.addToBasketItem = page.locator("button[data-qa='product-button']")
        this.dropdownMenu = page.locator("select[data-qa='sort-dropdown']")
        this.productTitles = page.locator("div[data-qa='product-title']")
    }

    visit = async () => {
        await this.page.goto("/")
    }

    addItemToBasket = async (index, expect) => {
        const navigation = new Navigation(this.page)
        const item = this.addToBasketItem.nth(index)
        const countBefore = await navigation.getBasketCount()
        await expect(item).toHaveText("Add to Basket")
        await item.click()
        const countAfter = await navigation.getBasketCount()
        await expect(item).toHaveText("Remove from Basket")
        expect(countAfter).toBeGreaterThan(countBefore)
    }

    sortByCheapest = async () => {
        await this.dropdownMenu.waitFor()
        const titlesBeforeSort = await this.productTitles.allInnerTexts()
        console.log(titlesBeforeSort)
        await this.dropdownMenu.selectOption({value: "price-asc"})
        const titlesAfterSort = await this.productTitles.allInnerTexts()
        console.log(titlesAfterSort)
        expect(titlesBeforeSort).toEqual(expect.arrayContaining(titlesAfterSort))
        expect(titlesBeforeSort).not.toEqual(titlesAfterSort)
    }

}