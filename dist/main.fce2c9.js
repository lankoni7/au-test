(()=>{"use strict";var t={873:t=>{t.exports=JSON.parse('[{"city":"Артёмовск","population":"1688"},{"city":"Ачинск","population":"105259"},{"city":"Боготол","population":"19819"},{"city":"Бородино","population":"16061"},{"city":"Дивногорск","population":"29195"},{"city":"Дудинка","population":"21015"},{"city":"Енисейск","population":"17805"},{"city":"Железногорск","population":"83857"},{"city":"Заозёрный","population":"10286"},{"city":"Зеленогорск","population":"61915"},{"city":"Игарка","population":"4417"},{"city":"Иланский","population":"14967"},{"city":"Канск","population":"89111"},{"city":"Кодинск","population":"15911"},{"city":"Красноярск","population":"1095286"},{"city":"Лесосибирск","population":"59525"},{"city":"Минусинск","population":"68007"},{"city":"Назарово","population":"49825"},{"city":"Норильск","population":"179554"},{"city":"Сосновоборск","population":"40614"},{"city":"Ужур","population":"15563"},{"city":"Уяр","population":"11981"},{"city":"Шарыпово","population":"37136"}]')}},e={};function n(o){var i=e[o];if(void 0!==i)return i.exports;var s=e[o]={exports:{}};return t[o](s,s.exports,n),s.exports}(()=>{const t=n(873),e=document.getElementById("form"),o=document.getElementById("sendButton"),i=document.getElementById("statusButton"),s=document.getElementById("city"),l=document.getElementById("university"),a=document.getElementById("setStatus"),c=document.getElementById("showStatus"),r=document.getElementById("set-status"),u={year:"numeric",month:"long",day:"numeric",timezone:"UTC"};function p(t){if(t.checkValidity()&&m(t))return t.classList.remove("form__input_error"),t.nextElementSibling&&t.nextElementSibling.classList.contains("form__error")&&t.nextElementSibling.remove(),!0;{let e=m(t)?"":"The passwords do not match";t.setCustomValidity(e),t.classList.add("form__input_error");const n=document.createElement("div");return n.classList.add("form__error"),n.textContent=t.validationMessage,t.nextElementSibling&&t.nextElementSibling.classList.contains("form__error")?t.nextElementSibling.textContent=t.validationMessage:t.insertAdjacentElement("afterend",n),t.setCustomValidity(""),!1}}function m(t){return document.getElementById("password").value===document.getElementById("confirmPassword").value||"password"!==t.type}o.addEventListener("click",(t=>{if(t.preventDefault(),function(t){let e=!0;return p(t.elements.city)||(e=!1),p(t.elements.university)||(e=!1),p(t.elements.email)||(e=!1),p(t.elements.password)||(e=!1),p(t.elements.confirmPassword)||(e=!1),e}(e)){const t=new Date,n=`последние изменения ${t.toLocaleString("ru",u)} в ${t.toLocaleTimeString()}`;o.nextElementSibling.textContent=n,localStorage.setItem("fullDate",n);const i={city:e.elements.city.value,university:e.elements.university.value,password:e.elements.password.value,confirmPassword:e.elements.confirmPassword.value,email:e.elements.email.value,checkbox:e.elements.agreement.checked};console.log(JSON.stringify(i))}})),t.sort(((t,e)=>e.population-t.population));const d=t.splice(0,1),y=t.filter((t=>t.population>=5e4)).sort(((t,e)=>t.city.localeCompare(e.city)));y.splice(0,0,...d),y.forEach((t=>{const e=document.createElement("option");e.textContent=t.city,s.append(e)})),async function(t){let e=await fetch("http://universities.hipolabs.com/search?country=United+Kingdom");(await e.json()).forEach((t=>{const e=document.createElement("option");e.textContent=t.name,l.append(e)}))}(),a.addEventListener("click",(function(){r.querySelector(".set-status__input").value=c.textContent,r.classList.toggle("set-status_active")})),i.addEventListener("click",(function(){const t=r.querySelector(".set-status__input").value;localStorage.setItem("status",t),c.textContent=t,r.classList.toggle("set-status_active")})),c.textContent=localStorage.getItem("status"),o.nextElementSibling.textContent=localStorage.getItem("fullDate")})()})();