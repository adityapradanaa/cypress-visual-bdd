class InventoryPage {
    // Elements
    private inventoryList = '.inventory_list';

    // Assertions
    verifyPageLoaded() {
        cy.url().should('include', '/inventory.html');
        cy.get(this.inventoryList).should('be.visible');
    }

    takeInventoryScreenshot() {
        cy.wait(1000); // delay for 1 second
        cy.takeScreenshot('inventory-page');
    }
}

export default new InventoryPage(); 