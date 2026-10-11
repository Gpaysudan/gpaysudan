(() => {
 const root=document.documentElement, body=document.body;
 const themeButton=document.getElementById('themeToggle'), langButton=document.getElementById('langToggle');
 const menuButton=document.getElementById('menuToggle'), nav=document.getElementById('navLinks');
 const installButton=document.getElementById('installBtn');
 const savedTheme=localStorage.getItem('gpay-theme');
 const systemDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
 function setTheme(theme){root.dataset.theme=theme;localStorage.setItem('gpay-theme',theme);themeButton.innerHTML=theme==='dark'?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';themeButton.setAttribute('aria-label',theme==='dark'?'Switch to light mode':'Switch to dark mode');}
 setTheme(savedTheme||(systemDark?'dark':'light'));
 themeButton.addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark'));
 function setLanguage(lang){
   root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';body.classList.toggle('lang-en',lang==='en');
   document.querySelectorAll('[data-ar][data-en]').forEach(el=>{el.innerHTML=el.dataset[lang];});
   langButton.textContent=lang==='ar'?'EN':'عربي';
   langButton.setAttribute('aria-label',lang==='ar'?'Switch to English':'التبديل إلى العربية');
   document.title=lang==='ar'?'GPay Sudan | ابدأ رحلتك الرقمية':'GPay Sudan | Start your digital journey';
   localStorage.setItem('gpay-language',lang);
 }
 setLanguage(localStorage.getItem('gpay-language')||'ar');
 langButton.addEventListener('click',()=>setLanguage(root.lang==='ar'?'en':'ar'));
 menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';menuButton.setAttribute('aria-expanded',String(open));});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.innerHTML='<i class="fa-solid fa-bars"></i>';menuButton.setAttribute('aria-expanded','false');}));
 const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const revealEls=document.querySelectorAll('.screen-item,.pay-card,.test-card,.stat-item,.intro-item');
 if('IntersectionObserver' in window&&!reduceMotion){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});revealEls.forEach(el=>{el.classList.add('js-reveal');observer.observe(el);});}else revealEls.forEach(el=>el.classList.add('is-visible'));
 let installPrompt=null;
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;installButton.hidden=false;});
 installButton.addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installButton.hidden=true;});
 window.addEventListener('appinstalled',()=>{installButton.hidden=true;installPrompt=null;});
 if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost')){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(err=>console.warn('PWA service worker registration failed',err)));}
})();