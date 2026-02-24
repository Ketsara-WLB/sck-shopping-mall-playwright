import { test, expect } from '@playwright/test';

test("ค้นหาและซื้อสินค้า เลือกวิธีจัดส่งเป็น Thai Post และชำระเงินด้วยบัตรเครดิต Visa สำเร็จ", async({ request, }) => {
  let accessToken;
  
  await test.step("ดำเนินการเข้าสู่ระบบ ด้วย username และ password", async() => {
    const responseLogin = await request.post(
      "http://139.59.225.96/api/v1/login", {
      data: {
        "username": "user_10",
        "password": "P@ssw0rd",
      },
      }
    );
    expect(responseLogin.ok()).toBeTruthy(); //200
    expect((await responseLogin.json()).access_token).toBeTruthy();

    test.info().attach("[POST] /login response", {
        body: JSON.stringify(await responseLogin.json()),
    });
  });
  

 
  
});