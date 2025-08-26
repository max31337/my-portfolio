document.addEventListener('DOMContentLoaded',function(){
  var root=document.documentElement;
  // Theme toggle
  var themeBtn=document.getElementById('theme-toggle');
  var iconSun=document.getElementById('icon-sun');
  var iconMoon=document.getElementById('icon-moon');
  function updateThemeIcons(){var isDark=root.classList.contains('dark');root.dataset.theme=isDark?'dark':'light';if(iconSun)iconSun.classList.toggle('hidden',!isDark);if(iconMoon)iconMoon.classList.toggle('hidden',isDark);}updateThemeIcons();
  if(themeBtn)themeBtn.addEventListener('click',function(){root.classList.toggle('dark');localStorage.setItem('theme',root.classList.contains('dark')?'dark':'light');updateThemeIcons();});
  // Mobile nav
  var menuBtn=document.getElementById('menu-toggle');
  var mobileNav=document.getElementById('mobile-nav');
  var iconMenu=document.getElementById('icon-menu');
  var iconClose=document.getElementById('icon-close');
  if(menuBtn)menuBtn.addEventListener('click',function(){var isOpen=!mobileNav.classList.contains('hidden');mobileNav.classList.toggle('hidden',isOpen);if(iconMenu)iconMenu.classList.toggle('hidden',!isOpen);if(iconClose)iconClose.classList.toggle('hidden',isOpen);menuBtn.setAttribute('aria-expanded',String(!isOpen));});
  // Code block enhancements
  document.querySelectorAll('pre>code').forEach(function(code){var pre=code.parentElement;if(!pre||pre.dataset.enhanced)return;pre.dataset.enhanced='true';var cls=code.className||'';var match=cls.match(/language-([a-z0-9+#-]+)/i);var lang=match?match[1].toUpperCase():'';if(lang){var badge=document.createElement('span');badge.className='code-lang-badge';badge.textContent=lang;pre.appendChild(badge);}var btn=document.createElement('button');btn.type='button';btn.className='code-copy-btn';btn.textContent='Copy';btn.addEventListener('click',function(){navigator.clipboard.writeText(code.innerText).then(function(){var prev=btn.textContent;btn.textContent='Copied';setTimeout(function(){btn.textContent=prev},1200);}).catch(function(e){console.error('Copy failed',e);});});pre.appendChild(btn);});
  // Image modal
  var modal=document.getElementById('img-modal');
  var modalImg=document.getElementById('img-modal-img');
  var closeBtn=document.getElementById('img-modal-close');
  function openModal(src,alt){if(!modal||!modalImg)return;modalImg.src=src;modalImg.alt=alt||'Project screenshot';modal.style.display='flex';modal.focus();}
  function closeModal(){if(!modal||!modalImg)return;modal.style.display='none';modalImg.src='';}
  document.querySelectorAll('.project-img-btn').forEach(function(btn){btn.addEventListener('click',function(e){e.preventDefault();openModal(btn.getAttribute('data-img'),btn.querySelector('img')?.getAttribute('alt'));});});
  if(closeBtn)closeBtn.addEventListener('click',closeModal);
  if(modal)modal.addEventListener('click',function(e){if(e.target===modal)closeModal();});
  document.addEventListener('keydown',function(e){if(modal&&modal.style.display==='flex'&&(e.key==='Escape'||e.key==='Esc'))closeModal();});
  // Service worker registration (compute base path dynamically to avoid hardcoded Liquid tokens)
  if('serviceWorker' in navigator){
    try{
      var scriptEl=document.querySelector('script[src*="/assets/js/site.js"]');
      var base='';
      if(scriptEl){
        var src=scriptEl.getAttribute('src');
        base=src.split('/assets/js/site.js')[0]; // e.g. /my-portfolio
      }
      if(!base){
        var parts=location.pathname.split('/').filter(Boolean);
        if(parts.length>0) base='/' + parts[0];
      }
      var swUrl=(base||'') + '/sw.js';
      navigator.serviceWorker.register(swUrl).catch(function(e){console.warn('SW register failed',e);});
    }catch(e){console.warn('SW register error',e);}
  }
});
