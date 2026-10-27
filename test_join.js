const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch(); const pg=await b.newPage({viewport:{width:390,height:900}});
 const errs=[]; pg.on('pageerror',e=>errs.push(e.message));
 await pg.goto('file:///home/claude/work/lineout-site/index.html');
 await pg.fill('#join-email','bad'); await pg.click('#join-form button');
 console.log('1',await pg.textContent('#join-msg'));
 await pg.fill('#join-email','a@b.co'); await pg.click('#join-form button');
 console.log('2',await pg.textContent('#join-msg'));
 await pg.check('#join-age'); await pg.click('#join-form button');
 console.log('3',await pg.textContent('#join-msg'));
 const sw=await pg.evaluate(()=>document.documentElement.scrollWidth); console.log('scrollW',sw);
 await pg.locator('#join').scrollIntoViewIfNeeded(); await pg.screenshot({path:'/home/claude/work/join.png'});
 await pg.setViewportSize({width:1280,height:800}); await pg.locator('#join').scrollIntoViewIfNeeded(); await pg.locator('#join').screenshot({path:'/home/claude/work/join-d.png'});
 console.log('errors',errs.filter(e=>!/font/i.test(e)));
 await b.close();})();
