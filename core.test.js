const assert = require('assert');
const Tool = require('./core');

(async function () {
  const html = Tool.convert('# Hi\n\n**bold**\n\n- one');
  assert.ok(html.includes('<h1>Hi</h1>') && html.includes('<strong>bold</strong>') && html.includes('<li>one</li>'));
  assert.ok(Tool.convert('<script>alert(1)</script>').includes('&lt;script&gt;'));
  console.log('ok, tool assertions passed');
})().catch(function (error) {
  console.error(error);
  process.exitCode = 1;
});
