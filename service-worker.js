/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "2c188b51008a23993a841c8fc9352d88"
  },
  {
    "url": "assets/css/0.styles.16f51adc.css",
    "revision": "81920a36e23e3216621731cc7e250b7c"
  },
  {
    "url": "assets/img/createUser.e4d1bf52.png",
    "revision": "e4d1bf52721e2adaa327048fae344cd6"
  },
  {
    "url": "assets/img/createUserdb.eb0cd6d5.png",
    "revision": "eb0cd6d5c32d6fcd776cab6347af8a0d"
  },
  {
    "url": "assets/img/createUserEmailExists.c83a0937.png",
    "revision": "c83a0937c1062b3585e16877b0d8c5e0"
  },
  {
    "url": "assets/img/createUserNoData.6cb8fe41.png",
    "revision": "6cb8fe41abc6cdf514e78bbfcc1dfe89"
  },
  {
    "url": "assets/img/deleteUser.5f3e4743.png",
    "revision": "5f3e474351a98303950ee5e390ea769c"
  },
  {
    "url": "assets/img/deleteUserdb.04e6c11e.png",
    "revision": "04e6c11eabf32b2c4f29019c5f74ed51"
  },
  {
    "url": "assets/img/deleteUserNotFound.d7f9d7fd.png",
    "revision": "d7f9d7fdc5d83660f38f7958d37ed444"
  },
  {
    "url": "assets/img/getAllUsers.dfe1e04a.png",
    "revision": "dfe1e04aff4165cc04380fa95ed6f61f"
  },
  {
    "url": "assets/img/getUserById.02f02e73.png",
    "revision": "02f02e7368eca16df07099f098158d27"
  },
  {
    "url": "assets/img/getUserNotFound.ce55b867.png",
    "revision": "ce55b867a89b35a7de71bde80a12ef7a"
  },
  {
    "url": "assets/img/relational_schema.2cab3001.png",
    "revision": "2cab300127018e6fe2156e8067ada13d"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/updateUser.245f29ec.png",
    "revision": "245f29ecf03b57847e4c546ae929d6fc"
  },
  {
    "url": "assets/img/updateUserdb.df7c3f6e.png",
    "revision": "df7c3f6e3e05367bd1f5d808cdb039be"
  },
  {
    "url": "assets/img/updateUserNoData.4081f561.png",
    "revision": "4081f5612a3166e258027a4dcbdfce08"
  },
  {
    "url": "assets/img/updateUserNotFound.cd06670d.png",
    "revision": "cd06670dc64d71d8955e224dc9da7b4a"
  },
  {
    "url": "assets/js/1.e9583ba9.js",
    "revision": "148e5db4567b35a878344bccdd415674"
  },
  {
    "url": "assets/js/10.7da98261.js",
    "revision": "431fe072fa8f230ebf055b1e075b34e1"
  },
  {
    "url": "assets/js/13.3bf32abe.js",
    "revision": "b0f95b3adf12325e5266c2f7cab42e50"
  },
  {
    "url": "assets/js/14.6cffc8f7.js",
    "revision": "b8d14bbfa8f9a5559226fc28b991383f"
  },
  {
    "url": "assets/js/15.e5e1adbb.js",
    "revision": "6123643ffd0a6fabd520015ba628e803"
  },
  {
    "url": "assets/js/16.fa9911cb.js",
    "revision": "70a1684d8f8f34b3570ec4311b2e76a9"
  },
  {
    "url": "assets/js/17.78bb7fb5.js",
    "revision": "aa11d49f7832f65391571b04cf5dd982"
  },
  {
    "url": "assets/js/18.01b7f1cd.js",
    "revision": "38f3943c46e272108a3bdd31ced2f7a2"
  },
  {
    "url": "assets/js/19.8e1e2e0c.js",
    "revision": "014eab988e126661f3fa85bdf7e36d92"
  },
  {
    "url": "assets/js/2.a36ece3a.js",
    "revision": "3e068630808814cbdeaabe592fd51493"
  },
  {
    "url": "assets/js/20.b4ec0df3.js",
    "revision": "219a656ae40ff70ff5ef285cfcd17311"
  },
  {
    "url": "assets/js/21.dcd52526.js",
    "revision": "6124f5d5c25e0d68795a2900a2f3031d"
  },
  {
    "url": "assets/js/22.3dee3b42.js",
    "revision": "85c6559c1e596edb1bfbfc8986323fc1"
  },
  {
    "url": "assets/js/23.d9143854.js",
    "revision": "5b4e6bb0239c80325d086d636e60a8b5"
  },
  {
    "url": "assets/js/24.afb841f3.js",
    "revision": "fae4114a09134d920a03753576062afa"
  },
  {
    "url": "assets/js/25.42aa669f.js",
    "revision": "88443bdb5f75c09b7f6684ab91184572"
  },
  {
    "url": "assets/js/26.c2dfe0a0.js",
    "revision": "969575831a0d4db55223ce4ae0b57467"
  },
  {
    "url": "assets/js/27.95728f51.js",
    "revision": "747cc033a156bdd0e201637971836451"
  },
  {
    "url": "assets/js/28.dc3de27e.js",
    "revision": "6cf418f6dec94e0a7b76db53d01e51fa"
  },
  {
    "url": "assets/js/29.041844e3.js",
    "revision": "d1062d89f10006a1738711530349f1bf"
  },
  {
    "url": "assets/js/3.96e19f31.js",
    "revision": "1d6128bb93559c4a77ac4cb1dd08dada"
  },
  {
    "url": "assets/js/30.b590e5f3.js",
    "revision": "d0142591ee1d55fe56d5fd7c22ed5efe"
  },
  {
    "url": "assets/js/31.95b94c12.js",
    "revision": "ada4d00a82f30e53b03ae8e27ea0c9f6"
  },
  {
    "url": "assets/js/32.066c855c.js",
    "revision": "2eadeb099754b443b04fdbb18b1543a2"
  },
  {
    "url": "assets/js/33.b9de2bd7.js",
    "revision": "412dc9726560f0fdcff5e95952711e7b"
  },
  {
    "url": "assets/js/34.d9ef09eb.js",
    "revision": "873ba23710818b0031e418eb820a2292"
  },
  {
    "url": "assets/js/35.afa98862.js",
    "revision": "573a74e617b90e9db2403c0c0178492d"
  },
  {
    "url": "assets/js/36.f38cc318.js",
    "revision": "6377fcd4a31b8d5cb90e4bd00fdfd0b8"
  },
  {
    "url": "assets/js/37.21059287.js",
    "revision": "7223048eb42c9d30d9e2ce0c2e72aff5"
  },
  {
    "url": "assets/js/38.73b99e05.js",
    "revision": "0645a6fbcdc9c9f53166473f75856fb7"
  },
  {
    "url": "assets/js/39.a240258e.js",
    "revision": "1242d367f4dfea0dfba3ffd0d7d33387"
  },
  {
    "url": "assets/js/4.7b4fdb49.js",
    "revision": "702193cbbb6f9d6300d6bb215916ef58"
  },
  {
    "url": "assets/js/41.9e50feb6.js",
    "revision": "203ee78ecaf7745ba99d836b03501d7d"
  },
  {
    "url": "assets/js/5.1397084e.js",
    "revision": "f253bb2dc114e47d5b99cd2a726b6b9b"
  },
  {
    "url": "assets/js/6.f5fa539a.js",
    "revision": "bcb341467f28470bf736f0ace5f9065c"
  },
  {
    "url": "assets/js/7.ada3086c.js",
    "revision": "2a92d1818141b2f8eb43e78650e6e4bb"
  },
  {
    "url": "assets/js/8.9e6ca792.js",
    "revision": "71bc13a5808baf107118d417aa9666e1"
  },
  {
    "url": "assets/js/9.74ef6a0b.js",
    "revision": "da9f3b53e2c4898679f90f72514fb8e9"
  },
  {
    "url": "assets/js/app.2b7e7923.js",
    "revision": "f924e88729d1565e679d633e8fe51a08"
  },
  {
    "url": "assets/js/vendors~docsearch.ef647f76.js",
    "revision": "bc16e7ddf52ef9baed4b3d3a23d7fbac"
  },
  {
    "url": "conclusion/index.html",
    "revision": "ef35f33c7c8e0cc475b4db08056cd027"
  },
  {
    "url": "design/index.html",
    "revision": "c746e8fce878724f3034dcd41e990cb0"
  },
  {
    "url": "index.html",
    "revision": "a5ca833f0638247815b599329b25a710"
  },
  {
    "url": "intro/index.html",
    "revision": "babd36c6540c3da0527710c06b8efb9e"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "c2d96964f19d30bd5f303c29324f2c5a"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "00f2e18ff28e37e38145ab6c66d11ee8"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "45a511cce294e9f5288de5f4f839da4e"
  },
  {
    "url": "software/index.html",
    "revision": "bf25df1f94810a3663442c401b5f09b9"
  },
  {
    "url": "test/index.html",
    "revision": "0d8ec96614f3e236bb8d8defc3c53668"
  },
  {
    "url": "use cases/index.html",
    "revision": "8dc17ab34c0e016fc5901985666303d7"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
