"use strict";

export class RisingMan {
	constructor(json) {
		this.width = 76;
		this.height = 150;
		this.images = [];

		for (let i = 1; i <= 10; i++) {
			this.images.push('dist/img/' + i + '.png');
		}
	}

	drawText(ctx, text) {
		let reg = /^[a-z]+$/i;

		ctx.save();
		ctx.rotate(Math.PI / 4.1);
		ctx.translate(42, 0);

		ctx.textAlign = "center";
		ctx.font = "Bold 25px Helvetica";
		ctx.fillStyle = "#40210f";

		if (reg.test(text)) {
			text = text.toLocaleUpperCase();
		}

		ctx.fillText(text.slice(0, 1), 0, 0);
		ctx.restore();
	}

	drawImage(text) {
		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');
		let image = new Image();
		let url = this.images[this.getRandomInt(0, 9)];

		image.src = url;

		canvas.width = this.width;
		canvas.height = this.height;

		return new Promise((resolve) => {
			image.addEventListener('load', () => {
				this.load(ctx, image, text);

				resolve(canvas);
			}, false);
		});
	}

	load(ctx, image, text) {
		ctx.drawImage(image, 0, 0);
		this.drawText(ctx, text);
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}