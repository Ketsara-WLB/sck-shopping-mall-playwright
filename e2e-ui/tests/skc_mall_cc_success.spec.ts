import { test, expect } from '@playwright/test';

test('เข้าสู่ระบบ', async ({ page }) => {
  await test.step("เข้าสู่ระบบ",async ()=> {
    await page.goto('http://139.59.225.96/auth/login');

    await page.locator('#login-username-input').fill('user_10');
    await page.locator('#login-password-input').fill('P@ssw0rd');
    await page.locator('#login-btn').click();
  });


  await test.step("ใส่คำค้นหา คำว่า bicycle พบชื่อสินค้า Balance Training Bicycle ราคา ฿4,314.60", async ({ }) => {
    await page.locator('#search-product-input').fill('bicycle');
    await page.keyboard.press('Enter');
    await expect(page.locator('#product-card-name-1')).toHaveText("Balance Training Bicycle");
    await expect(page.locator('#product-card-price-1')).toHaveText("฿4,314.60");
  });

  await test.step("เลือก Balance Training Bicycle พบ ชื่อสินค้า Balance Training Bicycle ราคา ฿4,314.60 จำนวนแต้ม 43 แต้ม สต็อค 90 ชิ้น และเพิ่มสินค้าลงตะกร้า 3 ชิ้น ", async ({ }) => {
    await page.locator('#product-card-1').click();
    await expect(page.locator('#product-detail-product-name')).toHaveText("Balance Training Bicycle");
    await expect(page.locator('#product-detail-price-thb')).toHaveText("฿4,314.60");
    await expect(page.locator('#product-detail-point')).toHaveText("43 Points");
    await expect(page.locator('#product-detail-stock')).toHaveText("Stock 87 items");
    await page.locator('#product-detail-quantity-input').fill('3');
    await page.locator('#product-detail-add-to-cart-btn').click();
  });

  await test.step("ตรวจจำนวน badge ในตระกร้าเท่ากับ 1 และคลิกตะกร้า พบชื่อสินค้า Balance Training Bicycle จำนวน 3 ชิ้น ราคา ฿12,943.80 จำนวนแต้ม 129 แต้ม สต็อค 90 ชิ้น และยอดรวมราคา ฿12,943.80", async ({ }) => {
    await expect(page.locator('#header-menu-cart-badge')).toHaveText('1');
    await page.locator('#header-menu-cart-btn').click();
    
  });



    // คลิกเลือก "43 Piece dinner Set"

    // ชื่อ ราคา จำนวนแต้ม และสต็อค
    // เพิ่มสินค้า 3 ชิ้น add to cart
    //ตรวจ ไอค่อนตะกร้า เลข 1

});
