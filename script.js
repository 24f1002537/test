// script.js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (let i = 1; i <= 10; i++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${i}`;
    await page.goto(url);
    const tables = await page.$$eval("table", tables => {
      return tables.map(tbl => {
        const nums = [];
        for (let row of tbl.rows) {
          for (let cell of row.cells) {
            const val = parseFloat(cell.innerText);
            if (!isNaN(val)) nums.push(val);
          }
        }
        return nums;
      }).flat();
    });

    totalSum += tables.reduce((a, b) => a + b, 0);
  }

  console.log("✅ Total sum across all tables:", totalSum);
  await browser.close();
})();
