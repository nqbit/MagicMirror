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
	current_idx2: 0,

	graph: {
		svgRoot: null,
		x_scale: 1,
		y_scale: 1,
		x_min_offset: 0,
		x_max_offset: 0,
		points: null,
		addPoint: function (self, sample) {
			var points = self.graph.points;
			var last_point = points[self.current_idx];

			self.current_idx = (self.current_idx + 1) % self.config.width;

			if (self.current_idx > points.length) {
				var svgroot = self.graph.svgRoot;
				var point = svgroot.createSVGPoint();
				point.x = self.current_idx;
				points.appendItem(point);
			}

			points[self.current_idx - 1].y = sample;
		}
	},

	graph2: {
		svgRoot: null,
		x_scale: 1,
		y_scale: 1,
		x_min_offset: 0,
		x_max_offset: 0,
		points: null,
		addPoint: function (self, sample) {
			var points = this.points;
			var last_point = points[self.current_idx2];

			self.current_idx2 = (self.current_idx2 + 1) % self.config.width;

			if (self.current_idx2 > points.length) {
				var svgroot = this.svgRoot;
				var point = svgroot.createSVGPoint();
				point.x = self.current_idx2;
				points.appendItem(point);
			}

			points[self.current_idx2 - 1].y = sample;
		}
	},

	// Start the weather module.
	// start: function () {
	// },

	updateGraph: function (self) {
		self.graph.addPoint(self, self.config.height / 2 + (self.foo - 0.5) * self.config.height);
		self.graph2.addPoint(self, self.config.height / 2 + (0.5 - self.foo) * 2 * self.config.height);
		self.foo = self.foo * (1 - self.config.factor) + Math.random() * self.config.factor;
	},

	updateDom: function (self) {
		var svgroot = document.getElementById("svgRoot");
		var points = document.getElementById("today").points;
		var points2 = document.getElementById("yesterday").points;
		self.graph.svgRoot = svgroot;
		self.graph.points = points;
		self.graph2.svgRoot = svgroot;
		self.graph2.points = points2;
		setInterval(self.updateGraph, 100, self);
	},

	getTemplate: function () {
		setTimeout(this.updateDom, 1000, this);
		return "graph.njk";
	},

	getTemplateData: function () {
		return this.config;
	}
});
