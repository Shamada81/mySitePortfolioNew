const checkToResize = (func) => {
	let triggerResize = (window.innerWidth >= 576) ? true: false;


	window.addEventListener("resize", () => {
			let currentSize = (window.innerWidth >= 576) ? true : false;

			if (triggerResize == currentSize) {
				return;
			}

			triggerResize = currentSize;
			func();
		});
}

export default checkToResize;