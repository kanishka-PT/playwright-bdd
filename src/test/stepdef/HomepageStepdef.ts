import {Given,  When, Then } from "@cucumber/cucumber";
import{chromium, Page, Browser ,expect, BrowserContext} from "@playwright/test";




let browser: Browser;
let context: BrowserContext; 
let page: Page;



Given('user launch {string} in local', { timeout: 20000 },async function (storeUrl: string) {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext(); 
  page = await context.newPage();
  await page.goto(storeUrl);
console.log("LAUNCHED STORE");
    
});


When('User hover over Canvas category in Top Navigation', async function () {
 try {
    const canvasCategory = page.locator(
      "//div[@class='bottom-sub-header-right-items flex content-center']//span[@class='cstore-category-name'][normalize-space()='Canvas']"
    );

    await canvasCategory.waitFor({ state: 'visible', timeout: 10000 });
    await canvasCategory.hover();
    console.log('Successfully Hovered over Canvas in Top Nav');
  } catch (error: any) {
    console.error('Failed to hover over Canvas category:', error.message);
    throw new Error('Hover action failed: ' + error.message);
  }
});

Then('User clicks on Canvas Prints Sub-Category under Canvas Prints category',{ timeout: 15000 }, async function () {
try {
    const canvasPrintsSubCategory = page.locator(
      "//div[@class='bottom-sub-header-right-items flex content-center']//span[@class='grid-item-text button--caret-pink'][normalize-space()='Canvas Prints']"
    );
    await canvasPrintsSubCategory.waitFor({ state: 'visible', timeout: 10000 });
    await canvasPrintsSubCategory.click();
    
    console.log('Clicked on Canvas Prints subcategory under Canvas Prints ');
  } catch (error: any) {
    console.error('Failed to click on Canvas Prints subcategory:', error.message);
    throw new Error('Click failed: ' + error.message);
  }
});

Then('user selects {string} from the Pricing Grid', async function (size: string) {
  try {
    await page.waitForTimeout(3000);

    let sizeLocator;

    switch (size) {
      case 'Size 8x8':
        sizeLocator = page.locator("//a[contains(text(), '8\" x 8\"')]");
        break;
      case 'Size 11x14':
        sizeLocator = page.locator("//a[contains(text(), '11\" x 14\"')]");
        break;
      default:
        console.error('Invalid size selection: ${size}');
        throw new Error('Unexpected size value: ${size}');
    }

    await sizeLocator.waitFor({ state: 'visible', timeout: 8000 });
    await sizeLocator.click();
    console.log('Clicked on ${size} in pricing grid');
    
  } catch (e: any) {
    console.error( "Error while selecting size from pricing grid: ${e.message}");
    throw new Error('Failed to select size: ${e.message}');
  }
});

Then('User lands on ECP CDex Page', { timeout: 15000 },async function () {
 try {
    const uploadImageButton = page.locator("//button[normalize-space()='UPLOAD IMAGE']");
    await uploadImageButton.waitFor({ state: 'visible', timeout: 80000 });
    const isVisible = await uploadImageButton.isVisible();

    if (!isVisible) {
      throw new Error("UPLOAD IMAGE button not visible.");
    }

    console.log("User landed on Canvas Designer Page.");

  } catch (error: any) {
    console.error("Test failed: " + error.message);
    throw new Error("Test failed on ECP CDex Page: " + error.message);
  }
});