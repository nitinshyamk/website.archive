function getTotalDaysDiff(e) {
	const yearDiff = e.date.getFullYear() - events[0].date.getFullYear();
	const monthDiff = e.date.getMonth() - events[0].date.getMonth();
	const dayDiff = e.date.getDate() - events[0].date.getDate();
	return yearDiff * 365 + monthDiff * 30 + dayDiff;
}

 function scroll(n, func){
    return new Waypoint({
        element: document.getElementById(n),
        handler: func,
        //start 75% from the top of the div
        offset: '50%'
      });
 };

function get_class_name_from_event(e, isActive) {
	return (e.eventType == EventType.HIDDEN 
				? "event hidden"
				: e.eventType === EventType.MINOR 
					? "event minor"
					: "event major") + (isActive ? " active" : "");
}

function setup_vis() {
	const eventdivs = d3.select('#event-feed')
		.style("height", events.length*30 + 500 + 20*getTotalDaysDiff(events[events.length -1]) + "px")
		.style("position", "relative")
		.style("z-index", 3)
		.selectAll("div")
		.data(events)
		.enter()
		.append("div")
		.attr("id", function(e, i) { 
			return "event-" + i;
		})
		.attr("class", function(e) { return get_class_name_from_event(e, false) })
		.style("top", function (e) { return (500+20*getTotalDaysDiff(e)) + "px";});

	eventdivs.append("span")
		.attr("class", 'date')
		.text(function(e) { 
			const format = d3.time.format("%b %d");
			return format(e.date);
		});
	events.forEach(function(e, i) {
		scroll(
		"event-"+i,
		function(direction) {
			d3.select('#event-'+ i)
				.transition().delay(0.5).ease('cubic')
				.attr("class", function(e) { return get_class_name_from_event(e, true); })
			d3.select('#event-'+(i-1))
				.transition().delay(0.5).ease('cubic')
				.attr("class", function(e) { return get_class_name_from_event(e, false); })
			d3.select('#event-'+(i+1))
				.transition().delay(0.5).ease('cubic')
				.attr("class", function(e) { return get_class_name_from_event(e, false); })
			prior_scroll_event = direction === 'down' && i > 0
				? events[i-1]
				: (direction === 'up' && i < events.length 
					? events[i+1]
					: undefined);
			if (prior_scroll_event && prior_scroll_event.markers) {
				prior_scroll_event.markers.forEach(function (m) { m.remove();});
			}
			if (e.markers) {
				e.markers.forEach(function (m) { m.addTo(map);});
			}
			if (e.description) {
				d3.select("#overall-description").style("visibility", "visible");
				d3.select("#overall-description").html(e.description);
			} else {
				d3.select("#overall-description").style("visibility", "hidden");
			}
			data = e.cameraView 
				? {
					center: e.cameraView.center,
					bearing: e.cameraView.bearing,
					pitch: e.cameraView.pitch,
					zoom: e.cameraView.zoom,
				}:{
					center: global_view.center,
					bearing: global_view.bearing,
					pitch: global_view.pitch,
					zoom: global_view.zoom
				};
			transition =  {
				duration: 4000,
				easing: 'cubic'
			}
			if (e.cameraView && (e.cameraView.shouldEaseToUp && direction === 'up' || e.cameraView.shouldEaseToDown && direction === 'down')) {
				map.easeTo(data, transition);
			} else {
				map.flyTo(data, transition);
			}
		})
	})
}

map.on('load', setup_vis);
