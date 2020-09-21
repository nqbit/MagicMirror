/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("graph", {
	// Default module config.
	defaults: {
		text: "Hello World!",
		width: 200,
		height: 100,
		factor: 0.1
	},

	foo: 0.5,
	current_idx: 0,

	// Start the weather module.
	start: function () {
		setInterval(this.updateGraph, 100, this);
	},

	updateGraph: function (self) {
		var points = document.getElementById("today").points;
		var last_point = points[self.current_idx];

		self.current_idx = (self.current_idx + 1) % self.config.width;

		if (self.current_idx > points.length) {
			var svgroot = document.getElementById("svgRoot");
			var point = svgroot.createSVGPoint();
			point.x = self.current_idx;
			points.appendItem(point);
		}

		points[self.current_idx - 1].y = self.config.height / 2 + (self.foo - 0.5) * self.config.height * 2;
		self.foo = self.foo * (1 - self.config.factor) + Math.random() * self.config.factor;
	},

	getTemplate: function () {
		return "graph.njk";
	},

	getTemplateData: function () {
		return this.config;
	}
});
