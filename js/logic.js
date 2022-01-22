const UserCart = new Cart()

if (document.addEventListener) {
	document.addEventListener("click", handleAddAlbum, false);
}

function handleAddAlbum(event) {
	let element = event.target;


	while (element) {
		if (element.nodeName === "BUTTON" && /cta-btn/.test(element.className)) {
			addAlbumToCart(element);
			break;
		} else if (element.nodeName === "BUTTON" && /changeQuantity/.test(element.className)) {
			if (element.getAttribute('data-action') === 'add') {
				addAlbumToCart(element)
			} else if (element.getAttribute('data-action') === 'remove') {
				removeAlbumFromCart(element)
			}
		} else if (element.nodeName === "BUTTON" && /clearCart/.test(element.className)) {
			clearCart()
		}

		element = element.parentNode;
	}
}

function addAlbumToCart(button) {
	const author = button.getAttribute('data-author')
	const title = button.getAttribute('data-title')
	const price = button.getAttribute('data-price')
	const image = button.getAttribute('data-image')

	if (title) {
		UserCart.addItem(author, title, price, image)
	} else {
		console.error("Brakuje danych, żeby dodać płytę do koszyka.")
	}
}

function removeAlbumFromCart(element) {
	const title = element.getAttribute('data-title')

	if (title) {
		UserCart.removeItem(title)
	} else {
		console.error("Niepoprawny tytuł albumu.")
	}
}

function clearCart() {
	const ok = confirm("Na pewno?")
	if (ok) {
		UserCart.clearCart()
	}
}
