/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you are an app developer and requires the theme to re-render the mini-cart, you can trigger your own event. If
 * you are adding a product, you need to trigger the "product:added" event, and make sure that you pass the quantity
 * that was added so the theme can properly update the quantity:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('product:added', {
 *   bubbles: true,
 *   detail: {
 *     quantity: 1
 *   }
 * }));
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */
$(document).ready(function () {
  (function () {
    if ($(" .collection__filter-link ").attr("aria-expanded") == "true") {
      $(this).addClass("icon-plus");
    } else {
      $(this).addClass("icon-minus");
    }
  })();

  $(".collection-page__menu-link").click(function () {
    $(this).toggleClass("icon-minus icon-plus");
    $(".collection-page__menu-ul").toggleClass("hide");
  });

  $(".collection__filter-group-name").click(function () {
    if ($(this).attr("aria-expanded") == "true") {
      $(this).removeClass("icon-minus").addClass("icon-plus");
    } else {
      $(this).removeClass("icon-plus").addClass("icon-minus");
    }
  });

  $(".collection__filter-link ").click(function () {
    $(".collection__filter-link ")
      .not(".is-active")
      .filter(":button")
      .removeClass("icon-minus")
      .addClass("icon-plus");
    if ($(this).filter(":button").attr("aria-expanded") == "true") {
      $(this).removeClass("icon-minus").addClass("icon-plus");
    }
    if ($(this).filter(":button").attr("aria-expanded") == "false") {
      $(this).removeClass("icon-plus").addClass("icon-minus");
    }
  });

  document.addEventListener("recentlyViewedBlockIsLoaded", () => {
    window.dispatchEvent(new Event("resize"));
  });

  document.addEventListener("youMayAlsoLikeBlockIsLoaded", () => {
    window.dispatchEvent(new Event("resize"));
  });

	// ************************************************************************* Add ads to product list scripts
	function renderProductListAds(type, desktopCursor, mobileCursor) {
		console.log('renderProductListAds lunch');

		const isNative = type === 'Native';
		const adsType = isNative ? 'Native' : 'Inline';

		let ads = [];
		let cursor = 0;
		let count = 0;

		if (isDesktop()) {
			cursor = desktopCursor;

			for (let i = 1; i <= 4; i++) {
				ads[i] = document.querySelector(`#div-gpt-ad-Category-DT-${adsType}${i}`)?.cloneNode(true);
			}
		} else {
			cursor = mobileCursor;

			for (let i = 1; i <= 6; i++) {
				ads[i] = document.querySelector(`#div-gpt-ad-Category-MW-${adsType}${i}`)?.cloneNode(true);
			}
		}

		const products = document.querySelectorAll('.collection .product-list .product-item');

		if (products.length === 0) {
			return;
		}

		products.forEach((product) => {
			count++;

			switch(true) {
				case count === cursor:
					product.after(setAd(isNative, ads[1]));
					break;

				case count === cursor*2:
					product.after(setAd(isNative, ads[2]));
					break;

				case count === cursor*3:
					product.after(setAd(isNative, ads[3]));
					break;

				case count === cursor*4:
					product.after(setAd(isNative, ads[4]));
					break;

				case count === cursor*5:
					if (ads[5]) {
						product.after(setAd(isNative, ads[5]));
					}
					break;

				case count === cursor*6:
					if (ads[6]) {
						product.after(setAd(isNative, ads[5]));
					}
					break;

				default:
					break
			}
		});

		if (isNative) {
			renderProductListAds('Inline', 12, 4);
		}

		if (!isNative) {
			registerLazyLoad();
		}
	}

	function setAd(isNative, ads) {
		let el;

		if (isNative) {
			const fakeProductItem = createFakeProductItem();
			fakeProductItem.append(ads);

			el = fakeProductItem;
		} else {
			el = ads;
		}

		return el;
	}

	function createFakeProductItem() {
		const fakeProductItem = document.createElement('div');

		fakeProductItem.classList.add(
			'product-item',
			'product-item-count-',
			'product-item--vertical',
			'1/3--tablet-and-up',
			'1/4--desk'
		);

		return fakeProductItem;
	}

	function isDesktop() {
		return window.innerWidth > 768;
	}

	function registerLazyLoad() {
		googletag.cmd.push(function () {
			if (isDesktop()) {
				if (typeof(pubwise) != 'undefined' && pubwise.enabled === true) {
					pwpbjs.que.push(function () {
						console.log("registering lazy load");
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-DT-Inline1'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-DT-Inline2'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-DT-Inline3'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-DT-Inline4'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-DT-Native1'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-DT-Native2'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-DT-Native3'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-DT-Native4'],2, [10,0,10,0], 0, 800, 2);
					});
				}
			} else {
				if (typeof(pubwise) != 'undefined' && pubwise.enabled === true) {
					pwpbjs.que.push(function () {
						console.log("registering lazy load");
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-MW-Inline1'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-MW-Inline2'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-MW-Inline3'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-MW-Inline4'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-MW-Inline5'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-MW-Inline6'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-MW-Native1'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-MW-Native2'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-MW-Native3'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-MW-Native4'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-MW-Native5'],2, [10,0,10,0], 0, 800, 2);
						pwRegisterLazyLoad(gptadslots['div-gpt-ad-Category-MW-Native6'],2, [10,0,10,0], 0, 800, 2);
					});
				}
			}
		});
	}

	document.addEventListener('theme:loading:end', () => {
		renderProductListAds('Native', 12, 8);
	});
});

  ////////////////////////////////
