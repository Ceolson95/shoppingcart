import {test, expect} from "@playwright/test";
import { v4 as uuidv4 } from "uuid";

import { ProductPage } from "../page-objects/ProductPage";
import { CheckoutPage } from "../page-objects/CheckoutPage";
import { Navigation } from "../page-objects/Navigation";
import { LoginPage } from "../page-objects/LoginPage";
import { RegisterPage } from "../page-objects/RegisterPage";
import { DeliveryDetailsPage } from "../page-objects/DeliverDetailsPage";
import { deliveryDetails } from "../data/deliveryDetails";
import { PaymentPage } from "../page-objects/PaymentPage";


test.describe("Product Page Tests", () => {
    
    test("Should be able to add an item to the basket", async ({page}) => {
        const productPage = new ProductPage(page)
        const navigation = new Navigation(page)
        const checkout = new CheckoutPage(page)
        const loginPage = new LoginPage(page)
        const registerPage = new RegisterPage(page)
        const deliveryDetailsPage = new DeliveryDetailsPage(page)
        const paymentPage = new PaymentPage(page)
        const email = uuidv4()
        await productPage.visit()
        await productPage.sortByCheapest()
        await productPage.addItemToBasket(0, expect)
        await productPage.addItemToBasket(1, expect)
        await productPage.addItemToBasket(2, expect)
        await navigation.goToCheckout(expect)
        await checkout.removeCheapestItem()
        await checkout.continueToCheckout()
        await loginPage.goToSignUp()
        await registerPage.signUpNewUser(email, "password")
        await deliveryDetailsPage.fillDetails(deliveryDetails)
        await deliveryDetailsPage.saveDetails()
        await deliveryDetailsPage.continueToPayment()
        await paymentPage.applyDiscountCode()
        await page.pause()
    });


});