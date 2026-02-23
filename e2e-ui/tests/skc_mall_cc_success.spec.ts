import { test, expect } from '@playwright/test';

test('เข้าสู่ระบบ ค้นหาสินค้า และสั่งซื้อสินค้า Balance Training Bicycle 3 ชิ้น สำเร็จ', async ({ page }) => {
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
    // await expect(page.locator('#product-detail-stock')).toHaveText("Stock 90 items");
    await page.locator('#product-detail-quantity-input').fill('3');
    await page.locator('#product-detail-add-to-cart-btn').click();
  });

  await test.step("ตรวจจำนวน badge ในตระกร้าเท่ากับ 1 และคลิกตะกร้า พบชื่อสินค้า Balance Training Bicycle จำนวน 3 ชิ้น ราคา ฿12,943.80 จำนวนแต้ม 129 แต้ม สต็อค 90 ชิ้น และยอดรวมราคา ฿12,943.80", async ({ }) => {
    await expect(page.locator('#header-menu-cart-badge')).toHaveText('1');
    await page.locator('#header-menu-cart-btn').click();
    await expect(page.locator('#product-1-name')).toHaveText("Balance Training Bicycle");
    await expect(page.locator('#product-1-price')).toHaveText("฿12,943.80");
    await expect(page.locator('#product-1-point')).toHaveText("129 Points");
    await expect(page.locator('#product-1-quantity-input')).toHaveValue('3');
    // await expect(page.locator('#shopping-cart-subtotal-price')).toHaveText('฿12,943.80');
  });

  await test.step('กด Checkout กรอกที่อยู่จัดส่ง โดยมีรายละเอียดดังนี้ ชื่อ เกษรา นามสกุล ปิยะชนกวงศ์ รายละเอียดที่อยู่ 1112 ม.3 ซ.ด่านสำโรง33/3 ถ.สุขุมวิท113 ตำบล สำโรงเหนือ อำเภอ เมืองสมุทรปราการ จังหวัด สมุทรปราการ รหัสไปรษณีย์ 10270 เบอร์โทร 0802101111',async ()=> {
    await page.locator('#shopping-cart-checkout-btn').click();
    await page.locator('#shipping-form-first-name-input').fill('เกษรา');
    await page.locator('#shipping-form-last-name-input').fill('ปิยะชนกวงศ์');
    await page.locator('#shipping-form-address-input').fill('1112 ม.3 ซ.ด่านสำโรง33/3 ถ.สุขุมวิท113');
    await page.locator('#shipping-form-province-select').selectOption('สมุทรปราการ');
    await page.locator('#shipping-form-district-select').selectOption('เมืองสมุทรปราการ');
    await page.locator('#shipping-form-sub-district-select').selectOption('สำโรงเหนือ');
    await page.locator('#shipping-form-mobile-input').fill('0802101111');

    await expect(page.locator('#shipping-form-zipcode-input')).toHaveValue('10270');
  });

  await test.step('เลือกขนส่ง Kerry ค่าส่ง 50.00 บาท',async ()=> {
    await page.locator('#shipping-method-2-card').click();

    await expect(page.locator('#shipping-method-2-fee')).toHaveText('฿50.00');
    await expect(page.locator('#order-summary-shipping-fee-price')).toHaveText('฿50.00');
  });
  
  await test.step('เลือกวิธีชำระเงินด้วยบัตรเครดิต',async ()=> {
    await page.locator('#payment-credit-input').click();
    await page.locator('#payment-credit-form-fullname-input').fill('เกษรา ปิยะชนกวงศ์');
    await page.locator('#payment-credit-form-card-number-input').fill('8372 4737 6437 4212');
    await page.locator('#payment-credit-form-expiry-input').fill('0728');
    await page.locator('#payment-credit-form-cvv-input').fill('737');
  });

  await test.step('ตรวจสอบรายละเอียดสินค้าชื่อสินค้า จำนวนสินค้าในตะกร้า จำนวนสินค้าในคลัง ราคาสินค้า แต้มที่จะได้รับ ยอดเงินที่ต้องชำระ และกดสั่งซื้อ',async ()=> {
    await expect(page.locator('#product-1-name')).toHaveText("Balance Training Bicycle");
    await expect(page.locator('#product-1-price')).toHaveText("฿12,943.80");
    await expect(page.locator('#product-1-point')).toHaveText("129 Points");
    await expect(page.locator('#product-1-quantity-input')).toHaveValue('3');
    // await expect(page.locator('#product-1-stock')).toHaveText("Stock 90 items");

    await expect(page.locator('#order-summary-subtotal-price')).toHaveText("฿12,943.80");
    await expect(page.locator('#order-summary-receive-point-price')).toHaveText("129 Points");
    await expect(page.locator('#order-summary-shipping-fee-price')).toHaveText("฿50.00");
    await expect(page.locator('#order-summary-total-payment-price')).toHaveText("฿12,943.80");
    await page.locator('#payment-now-btn').click();
  });


});