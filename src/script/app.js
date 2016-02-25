"use strict";

let RisingMan = require('./risingman');
let doc = document;
let canvas = doc.querySelector('canvas');
let ctx = canvas.getContext('2d');
let textArea = doc.querySelector('#js-val');
let btn = doc.querySelector('#js-btn');
let clean = doc.querySelector('#js-clean');

// 获取到 RisingMan 对象
RisingMan = RisingMan.RisingMan;

let risingMan = new RisingMan();

/**
 * 填充画布背景色
 * @param ctx 上下文环境
 * @param color 颜色关键字或者十六进制格式
 */
let paint = (ctx, color) => {
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/**
 * 清空画布
 */
let cleanFn = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	paint(ctx, '#FFFF99');

	textArea.value = '';
};

/**
 * 绘制小人
 */
let drawMan = () => {
	let str = textArea.value.split(/\n/);
	let p = [];

	if (textArea.value.length > 40) {
		return alert('输入内容字数不能超过40。');
	}

	cleanFn();

	str.forEach((item) => {
		for (let i = 0; i < item.length; i++) {
			p.push(risingMan.drawImage(item[i]));
		}
	});

	Promise.all(p)
		.then(function(images) {
			let len = 0;

			str.forEach((item, index) => {
				if (index) {
					len += str[index - 1].length;
				}

				for (let i = 0; i < item.length; i++) {
					ctx.drawImage(images[i + len], (i * 55) + 50, (index * 55) + i * 10);
				}
			});
		});
};

// 填充背景色
paint(ctx, '#FFFF99');

btn.addEventListener('click', drawMan, false);
clean.addEventListener('click', cleanFn, false);


