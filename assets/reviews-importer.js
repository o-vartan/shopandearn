var SECOMAPP = SECOMAPP || {};
SECOMAPP.rv = SECOMAPP.rv || {};

!function(e){var n=!1;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var o=window.Cookies,t=window.Cookies=e();t.noConflict=function(){return window.Cookies=o,t}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var o=arguments[e];for(var t in o)n[t]=o[t]}return n}function n(o){function t(n,r,i){var c;if("undefined"!=typeof document){if(arguments.length>1){if(i=e({path:"/"},t.defaults,i),"number"==typeof i.expires){var a=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*i.expires),i.expires=a}try{c=JSON.stringify(r),/^[\{\[]/.test(c)&&(r=c)}catch(e){}return r=o.write?o.write(r,n):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)),n=n.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),n=n.replace(/[\(\)]/g,escape),document.cookie=[n,"=",r,i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}n||(c={});for(var p=document.cookie?document.cookie.split("; "):[],s=/(%[0-9A-Z]{2})+/g,d=0;d<p.length;d++){var f=p[d].split("="),u=f.slice(1).join("=");'"'===u.charAt(0)&&(u=u.slice(1,-1));try{var l=f[0].replace(s,decodeURIComponent);if(u=o.read?o.read(u,l):o(u,l)||u.replace(s,decodeURIComponent),this.json)try{u=JSON.parse(u)}catch(e){}if(n===l){c=u;break}n||(c[l]=u)}catch(e){}}return c}}return t.set=t,t.get=function(e){return t.call(t,e)},t.getJSON=function(){return t.apply({json:!0},[].slice.call(arguments))},t.defaults={},t.remove=function(n,o){t(n,"",e(o,{expires:-1}))},t.withConverter=n,t}return n(function(){})});if (typeof Cookies !== 'undefined') {
    SECOMAPP.rv.Cookies = Cookies.noConflict();
}

SECOMAPP.rv.Cookie = SECOMAPP.rv.Cookie || {
    name: 'scm_reviews_importer_app',
    count: 'scm_reviews_importer_count',
    setInstalled: function() {
        SECOMAPP.rv.Cookies.set(this.count, 0);
        SECOMAPP.rv.Cookies.set(this.name, "installed");
    },
    isInstalled: function() {
        var count = SECOMAPP.rv.Cookies.get(this.count);
        if (! count) count = 0;
        count++;
        SECOMAPP.rv.Cookies.set(this.count, count);

                    return SECOMAPP.rv.Cookies.get(this.name) === "installed" && count < 2;
            }
};

SECOMAPP.rv.performanceNow = SECOMAPP.rv.performanceNow || function() {
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        return Math.round(performance.now()) + ' ms ';
    } else {
        return '';
    }
};

    var scripts = document.head.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; ++i) {
        if(scripts[i].innerText.indexOf('asyncLoad') >= 0 && scripts[i].innerText.indexOf("reviews.smartifyapps.com\\/storage\\/scripts") >= 0) {
            console.log('already has scripttag, load RV');
            SECOMAPP.rv.installed = true;
        }
    }
    if (! SECOMAPP.rv.Cookie.isInstalled()) {
        SECOMAPP.rv.installed = false;
        console.log(SECOMAPP.rv.performanceNow() + 'preload skip');
    } else {
        SECOMAPP.rv.installed = true;
    }

SECOMAPP.rv.jqVersion = SECOMAPP.rv.jqVersion || function(jQuery) {
    return jQuery.fn.jquery.replace(/\.(\d)/g,".0$1").replace(/\.0(\d{2})/g,".$1");
};

if (SECOMAPP.rv.loadingApp !== true && SECOMAPP.rv.installed === true) {
    SECOMAPP.rv.loadingApp = true;

    SECOMAPP.rv.loadScript = SECOMAPP.rv.loadScript || function(url, callback){
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Others
            script.onreadystatechange = callback;
            script.onload = callback;
        }

        script.src = url;
        var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(script, x);
    };

    SECOMAPP.rv.loadStyle = SECOMAPP.rv.loadStyle || function(url){
        var head = document.getElementsByTagName("head")[0];
        var extension = '.css';
        var link = document.createElement("link");
        link.href = url;
        link.type = "text/css";
        link.rel = "stylesheet";
        head.appendChild(link);
    };
                    SECOMAPP.rv.scmReviewsRate = SECOMAPP.rv.scmReviewsRate || (function(){
    function loadCss(filename) {
      var cssNode = document.createElement("link");
      cssNode.setAttribute("rel", "stylesheet");
      cssNode.setAttribute("type", "text/css");
      cssNode.setAttribute("href", filename);
      document.getElementsByTagName("head")[0].appendChild(cssNode);
    }
    function getInfoShop(){
      var infoShop= document.getElementById("scm-reviews-shopSetting").getAttribute("data-shop");
      return parseJson(infoShop);
    }
    function addStyleOnHead(infoShopJson) {
      let styleStar= "";
      let widthContainer= infoShopJson.width ? infoShopJson.width : '1200px';
      switch (infoShopJson.starStyle) {
        case "heart":
          styleStar = "f004";
          break;
        case "like":
          styleStar = "f164";
          break;
        case "smile":
          styleStar = "f118";
          break;
        default:
          styleStar = "f005";
      }
      let styleConfig= `
            .scm-reviews-rate .fa-star:before {
                content: "\\${styleStar}";
            }
			.scm-reviews-rate i{
            	color: ${infoShopJson.starColor};
          	}
            .scm-container{
                max-width: ${widthContainer}
            }
        `;
      var linkElement = this.document.createElement('link');
      linkElement.setAttribute('rel', 'stylesheet');
      linkElement.setAttribute('type', 'text/css');
      linkElement.setAttribute('href', 'data:text/css;charset=UTF-8,' + encodeURIComponent(styleConfig));
      document.querySelector('head').appendChild(linkElement);
    }
    function getElement(){
      var x = document.getElementsByClassName("scm-reviews-rate");
      return  [].slice.call(x);
    }
    function actionCreateReviews(){
      let arrayListElement= getElement();
      arrayListElement.forEach(element => {
        let rate= element.getAttribute("data-rate");
        rate= parseJson(rate);
        if(rate && rate.average > 0){
          let blockStar= scmReviewsRate(rate.average);
          blockStar+=`<span> (${rate.total}) </span>`;
          element.innerHTML=blockStar;
        }
      });
    }
    function scmReviewsRate(value){
      let number= Math.floor( value + 0.5 );
      let blockStar='';
      for(let i=0; i < number; i++){
        blockStar= blockStar + `<i class="fas fa-star"></i>`;
      }
      for(let i=number; i < 5; i++){
        blockStar= blockStar + `<i class="far fa-star"></i>`;
      }
      return blockStar;
    }
    function parseJson(value) {
        if(value){
          let valueDecode64=atob(value);
          return JSON.parse(valueDecode64);
        }else{
            return value;
        }
    }
      function onWindowLoad(){
        actionCreateReviews();
      }
    function constructor(){
      let dataShopSetting = getInfoShop();
      addStyleOnHead(dataShopSetting);
      loadCss("https://d1bu6z2uxfnay3.cloudfront.net/css/fontawesome/css/all.min.css");
    }
    function init(){
      constructor();
      actionCreateReviews();
    }
    return {
      init,
      actionCreateReviews,
      onWindowLoad
    }
  })();

            SECOMAPP.rv.startReviewsImporter = SECOMAPP.rv.startReviewsImporter || function() {
        console.log(SECOMAPP.rv.performanceNow() + 'smart aliexpress reviews app starting...');
                    function startReviewImporter() {
  const remove = function (e) {
    e.stopPropagation();
    closePopup();
  };
window.onload = function(){
  document.querySelector('.scm-popup-before').onclick = function (e) {
    e.stopPropagation();
    closePopup();
  };
};

function closePopup() {
    var scmpopupContainer = document.getElementById("scm-review-importer-popup");
    scmpopupContainer.classList.remove('show-popup');
    document.getElementById('scm-review-importer-popup').style.display= "none";
  }

  function createPopup(data) {
    let htmlPopup= createPopupHtml(data.content,data.photos);
    var scmpopupContainer = document.getElementById("scm-review-importer-popup");
    scmpopupContainer.classList.add('show-popup');

    var iframeDocument = document.querySelector('#scm-review-importer-popup-iframe').contentWindow.document;
    document.getElementById('scm-review-importer-popup').style.display= "block";
    iframeDocument.open('text/html', 'replace');
    iframeDocument.write(htmlPopup);
    iframeDocument.close();
  }

  function changeHeightIframe(height) {
    const frame = document.getElementById("scm-reviews-importer-iframe");
    frame.height = height + "px";
    frame.parentNode.style.height = height + 'px';
  }

  function receiveMessage(event) {
    if (event.data.type === 'createPopup') {
      createPopup(event.data);
    } else if (event.data === 'removePopup') {
      closePopup();
    } else if (event.data.type === 'changeHeight') {
      changeHeightIframe(event.data.height);
    }
  }

    window.addEventListener('message', receiveMessage, false);
    const elRoot = document.querySelector('.custom #scm-reviews-importer');
    const root= elRoot ? elRoot : document.getElementById('scm-reviews-importer');
  if(root){
      var iframeDocument = document.querySelector('#scm-reviews-importer-iframe').contentWindow.document;
      iframeDocument.open('text/html', 'replace');
      iframeDocument.write(htmlIframe);
      iframeDocument.close();
  }
}

startReviewImporter();
                        SECOMAPP.rv.scmReviewsRate.init();
                window.onload = (event) => {
                    SECOMAPP.rv.scmReviewsRate.onWindowLoad();
                };
                    let rootFrame= document.querySelector(".scm-container");
            if(rootFrame){
                rootFrame.style.display= "";
            }
            }; // end of SECOMAPP.rv.startReviewsImporters

    console.log(SECOMAPP.rv.performanceNow() + 'smart aliexpress reviews script loaded');
    SECOMAPP.rv.startReviewsImporter();
} else {
    console.log(SECOMAPP.rv.performanceNow() + 'skip');
}
