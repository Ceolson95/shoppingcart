import { expect } from "@playwright/test"

export class DeliveryDetailsPage {
    constructor(page) {
        this.page = page

        this.firstNameInput = page.getByPlaceholder("first name")
        this.firstNameSavedField = page.locator("p[data-qa='saved-address-firstName']")
        this.lastNameInput = page.getByPlaceholder("last name")
        this.lastNameSavedField = page.locator("p[data-qa='saved-address-lastName']")
        this.streetInput = page.getByPlaceholder("street")
        this.streetSavedField = page.locator("p[data-qa='saved-address-street']")
        this.postalCodeInput = page.getByPlaceholder("post code")
        this.postalCodeSavedField = page.locator("p[data-qa='saved-address-postcode']")
        this.cityInput = page.getByPlaceholder("city")
        this.citySavedField = page.locator("p[data-qa='saved-address-city']")
        this.countryDropdown = page.locator("select[data-qa='country-dropdown']")
        this.countrySavedField = page.locator("p[data-qa='saved-address-country']")
        this.saveDetailsButton = page.locator("button[data-qa='save-address-button']")
        this.savedDetailsContainer = page.locator("div[data-qa='saved-address-container']")
        this.continueToPaymentButton = page.locator("button[data-qa='continue-to-payment-button']")
    }

    fillDetails = async (deliveryDetails) => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(deliveryDetails.firstName)
        await this.lastNameInput.fill(deliveryDetails.lastName)
        await this.streetInput.fill(deliveryDetails.street)
        await this.postalCodeInput.fill(deliveryDetails.postalCode)
        await this.cityInput.fill(deliveryDetails.city)
        await this.countryDropdown.selectOption({value: deliveryDetails.country})
    }

    saveDetails = async () => {
        const addressContainerCountBefore = await this.savedDetailsContainer.count()
        await this.saveDetailsButton.waitFor()
        await this.saveDetailsButton.click()
        await this.savedDetailsContainer.waitFor()
        const addressContainerCountAfter = await this.savedDetailsContainer.count()
        expect(addressContainerCountAfter).toBeGreaterThan(addressContainerCountBefore)
        await expect(this.savedDetailsContainer).toBeVisible()
        await this.firstNameSavedField.first().waitFor()
        expect(await this.firstNameSavedField.first().innerText()).toEqual(await this.firstNameInput.inputValue())
        expect(await this.lastNameSavedField.first().innerText()).toEqual(await this.lastNameInput.inputValue())
        expect(await this.streetSavedField.first().innerText()).toEqual(await this.streetInput.inputValue())
        expect(await this.postalCodeSavedField.first().innerText()).toEqual(await this.postalCodeInput.inputValue())
        expect(await this.citySavedField.first().innerText()).toEqual(await this.cityInput.inputValue())
        expect(await this.countrySavedField.first().innerText()).toEqual(await this.countryDropdown.inputValue())
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, {timeout: 3000})
        expect(this.page).toHaveURL("/payment")
    }
}