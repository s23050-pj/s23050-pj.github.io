class Cart {
	constructor() {
		this.sum = 0
		this.items = []
	}

	addItem(author, title, price, image) {
		const CD = {
			author,
			title,
			price,
			image,
			quantity: 1,
		}

		const existing = this.items.find(item => item.title === CD.title)
		if (existing) {
			existing.quantity += 1
		} else {
			this.items.push(CD)
		}

		this.saveLocalStorage()
		this.getSum()
	}

	removeItem(title) {
		const album = this.items.find(item => item.title === title)

		if (album) {
			if (album.quantity === 1) {
				this.items = this.items.filter(item => item.title !== title)
			} else {
				album.quantity -= 1;
			}
		}

		this.saveLocalStorage()
		this.getSum()
	}

	clearCart() {
		this.items = []

		this.saveLocalStorage()
		this.getSum()
	}

	getSum() {
		let sum = 0;
		for (const cd of this.items) {
			sum += +cd.price * cd.quantity
		}
		this.sum = sum;
		this.updateDisplayedPrice()
		this.renderCart()
	}

	updateDisplayedPrice() {
		document.getElementById('sum').innerText = `${this.sum} zł`
	}

	readLocalStorage() {
		this.items = JSON.parse(localStorage.getItem("cart")) || [];
		this.getSum()
		this.updateDisplayedPrice();
	}

	saveLocalStorage() {
		localStorage.setItem("cart", JSON.stringify(this.items))
	}

	renderCart() {
		try {
			const cartEl = document.getElementById('cart')
			let html = '';

			if (this.items.length) {
				document.getElementById('order').style.display = 'block'

				for (let item of this.items) {
					html +=
						'<div class="item-entry">' +
						'<div class="item-image">' +
						`<img alt="${item.author} - ${item.title}" src="${item.image}"/>` +
						'</div>' +
						`<div class="item-title">${item.title}</div>` +
						`<div class="item-quantity">${item.quantity} szt. - ${item.price * item.quantity} zł</div>` +
						`<div class="item-actions"></div>` +
						`<button title="Dodaj sztukę" class="changeQuantity" data-title="${item.title}" data-action="add">+</button>` +
						`<button title="Usuń sztukę" class="changeQuantity" data-title="${item.title}" data-action="remove">-</button>` +
						'</div>' +
						'</div>'
				}
			} else {
				html = '<h3>Brak produktów w koszyku.</h3>'
				document.getElementById('order').style.display = 'none'
			}
			cartEl.innerHTML = html


		} catch (e) {
			//
		}
	}
}
