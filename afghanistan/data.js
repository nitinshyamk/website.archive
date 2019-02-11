
mapboxgl.accessToken = 'pk.eyJ1Ijoibml0aW5zaHlhbWsiLCJhIjoiY2pwMHFqM2k3MGxseTNrbzlyZXAycnU5cSJ9.8CSYjgKVFhJ2vUZSZmX5rQ';

var EventType = {
	HIDDEN: 0,
	MINOR: 1,
	MAJOR: 2,
}

class CameraView {
	constructor(bearing, pitch, zoom, center, shouldEaseToUp, shouldEaseToDown) {
		this.bearing = bearing;
		this.pitch = pitch;
		this.zoom = zoom;
		this.center = center;
		this.shouldEaseToUp = shouldEaseToUp;
		this.shouldEaseToDown = shouldEaseToDown;
	}
}

class Event {
	constructor(date, eventType, cameraView, markers, description) {
		if (
			// cameraView === null || cameraView === undefined
			 date === undefined || date === null
			|| eventType === null || eventType === undefined) {
			throw "Camera view, date, and event type must be defined";
		}
		// if ((markers === null || markers === undefined) && (description === null || description === undefined)) {
		// 	throw "At least one of markers and description must be specified";
		// }
		this.date = date;
		this.eventType = eventType;
		this.cameraView = cameraView;
		this.markers = markers;
		this.description = description;
	}
}

const create_marker_point = function(lng, lat) {
	const el = document.createElement('div');
	el.className = 'marker';
	el.innerHTML = `<i class="fa fa-circle marker-flash"></i>`;
	el.style.width = "50px";
	el.style.height= "50px";
	return new mapboxgl.Marker(el)
		.setLngLat([lng, lat])
}

const create_marker_description = function(lng, lat, text) {
	const el = document.createElement('div');
	el.className = 'marker-descriptive';
	return new mapboxgl.Marker(el)
		.setLngLat([lng, lat]);
}

const global_view = new CameraView(0, 0, 2.3, [-15.540574, 20]);
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/nitinshyamk/cjrfsfwmr07te2tq9t3thnbrf',
  center: global_view.center,
  zoom: global_view.zoom,
  pitch: global_view.pitch,
  bearing: global_view.bearing,
  interactive: false,
  trackResize: true,
});

const camera_views = {
	us_attacks: new CameraView(0, 0, 6.83, [-76.4273074, 40.1859621]),
	oval_office: new CameraView(0, 0, 17.6, [-77.0364222, 38.8974233]),
	indian_ocean: new CameraView(0, 0, 3, [68.4385447,23.2456051], true, false),
	kabul_city: new CameraView(0, 0, 10, [69.191572, 34.645868]),
	congress_capitol: new CameraView(0, 0, 14, [-77.021046, 38.895604], true, true),
	default_afghanistan_view: new CameraView(0, 0, 5.7, [65.542038, 33.595965]),
	khyber_pass: new CameraView(0, 0, 11, [71.0932692, 34.1155331], true, false),
	panjshir_valley_high_view: new CameraView(30, 60, 9, [69.763384, 35.459346]),
	panjshir_valley_closeup: new CameraView(30, 50, 11, [69.763384, 35.459346]),
	oda_555_insertion_view: new CameraView(40, 60, 10, [69.291847, 35.153755]),
	oda_595_insertion_view: new CameraView(330, 60, 10, [67.2491574, 35.9499982]),
	objective_rhino_large: new CameraView(150, 50, 9, [64.525556, 30.486667]),
	mullah_omar_kandahar_assault: new CameraView(150, 60, 8, [65.734773, 31.663464]),
	oda_555_bagram_assault: new CameraView(40, 60, 9, [69.286703, 34.945860]),
	oda_595_bishqab_assault: new CameraView(350, 30, 8, [67.229444, 36.025]),
	oda_595_cobaki_assault: new CameraView(350, 30, 8, [67.1855602,35.9936474]),
	oda_534_covert_insertion: new CameraView(0, 30, 7, [66.952362, 34.738765]),
	oda_553_covert_insertion: new CameraView(0, 30, 7, [66.8946815, 34.6946849]),
	koh_i_almortak_ridgeline: new CameraView(20, 20, 10, [67.034541, 36.330572]),
	oda_586_kunduz_insertion: new CameraView(0, 0, 10, [69.694350, 36.824623]),
	oda_594_panjshir_insertion: new create_marker_point(69.288589, 35.182730),
	oda_teams_seize_mazar_sharif: new CameraView(35, 60, 11, [67.209608, 36.707209])
}


const markers = {
	us_pentagon: new create_marker_point(-77.0562669, 38.8718568), 
	us_wtc_twin_towers: new create_marker_point(-74.013115, 40.711112),
	us_flight93_crashsite: new create_marker_point(-78.9082804,40.0544348),
	oval_office: new create_marker_point(-77.037328, 38.897387),
	uss_carl_vinson: new create_marker_point(77.605083, 6.310642),
	uss_enterprise: new create_marker_point(59.058656, 13.004840),
	kabul_exit_1: new create_marker_point(69.080035, 34.649426),
	kabul_exit_2: new create_marker_point(69.388348, 34.566705),
	kabul_exit_3: new create_marker_point(69.179084, 34.418240),
	kabul_airport: new create_marker_point(69.214888, 34.565500),
	congress_capitol_building: new create_marker_point(-77.009287, 38.889705),
	khyber_pass: new create_marker_point(71.0932692, 34.1155331),
	khawak_pass: new create_marker_point(69.778446, 35.6633499),
	anjoman_pass: new create_marker_point(70.3911015, 35.9505538),
	cia_jawbreaker_insertion: new create_marker_point(69.763384, 35.459346),
	oda_555_insertion: new create_marker_point(69.291847, 35.153755),
	oda_595_insertion: new create_marker_point(67.2491574, 35.9499982),
	objective_rhino: new create_marker_point(64.525556, 30.486667),
	mullah_omar_kandahar_assault: new create_marker_point(65.734773, 31.663464),
	oda_555_bagram_assault: new create_marker_point(69.286703, 34.945860),
	oda_595_bishqab_assault: new create_marker_point(67.229444, 36.025),
	oda_595_cobaki_assault: new create_marker_point(67.1855602,35.9936474),
	oda_534_covert_insertion: new create_marker_point(66.952362, 34.738765),
	oda_553_covert_insertion: new create_marker_point(66.8946815,34.6946849),
	koh_i_almortak_ridgeline1: new create_marker_point(66.907961, 36.053885),
	koh_i_almortak_ridgeline2: new create_marker_point(66.916544, 36.052567),
	koh_i_almortak_ridgeline3: new create_marker_point(66.952621, 36.039535),
	koh_i_almortak_ridgeline4: new create_marker_point(66.896908, 36.060515),
	oda_586_kunduz_insertion: new create_marker_point(69.694350, 36.824623),
	oda_594_panjshir_insertion: new create_marker_point(69.288589, 35.182730),
	mazar_e_sharif_airport: new create_marker_point(67.209608, 36.707209),
	mazar_e_sharif: new create_marker_point(67.117688, 36.708927),
	mazar_e_sharif_southern_entrance: new create_marker_point(67.119831, 36.647812),
};
const nine_eleven_attacks_markers = [markers.us_pentagon, markers.us_wtc_twin_towers, markers.us_flight93_crashsite];
const persian_gulf_ships = [markers.uss_carl_vinson, markers.uss_enterprise];
const kabul_markers = [markers.kabul_exit_1, markers.kabul_exit_2, markers.kabul_exit_3];
const mazar_e_sharif_markers = [markers.mazar_e_sharif, markers.mazar_e_sharif_airport, markers.mazar_e_sharif_southern_entrance];
const koh_i_almortak_ridgeline_markers = [markers.koh_i_almortak_ridgeline1, markers.koh_i_almortak_ridgeline2, markers.koh_i_almortak_ridgeline3, markers.koh_i_almortak_ridgeline4];


const nine11attackdescription = `On the morning of September 11, 2001, fifteen al-Qaeda affiliates hijack three airlines, flying them as suicide attacks into the twin towers of the World Trade Center and the Pentagon. Passengers on a fourth airline thwart a similar hijacking attempt, crashing the plane into a rural Pennsylvania field. 
When the smoke clears, nearly 3000 civilians and rescue workers have perished.`;

const bush_response = `<p>In the Oval Office just a few miles away from the attack on the Pentagon, President George W. Bush addresses a nation hours after the attacks:</p>
<p> “Today, our nation saw evil -- the very worst of human nature - and we responded with the best of America. With the daring of our rescue workers, with the caring for strangers and neighbors who came to give blood and help in any way they could.” </p>
<p> And in a signal portending the long struggle ahead, Bush announces a “war on terrorism”:   </p>
<p> “America and our friends and allies join with all those who want peace and security in the world, and we stand together to win the war against terrorism.” </p>
`;

const persian_gulf_response = `<p>Suspicion quickly falls on al-Qaeda, a radical Islamist group that received safe harbor from the Taliban led government in Afghanistan. Days before any formal declaration of war, elements of the U.S. Navy are already gearing for war.</p>
<p> In the Arabian Sea, the USS Carl Vinson, flagship of Carrier Strike Group One, turns around near the southern tip of India and heads head to the North Arabian Sea. </p>
<p> The USS Enterprise, en route to Norfolk Naval Station turns back as well, leaving its escort ships behind to speed towards the North Arabian Sea. </p>`;

const kabul_evacuation_description1 = `Anticipating U.S. military strikes, Muslim militant and civilians are reported to be fleeing Kabul. Others choose to remain in place and build trenches around the city in preparation.`;
const kabul_evacuation_description2 = `In anticipation of upcoming US strikes, United Nations representatives and foreign aid organizations begin a withdrawal from Afghanistan.`;
const senate_join_res_23 = `Congress passes Senate Joint Resolution 23, the Authorization for Use of Military Force Against Terrorists (AUMF). The act grants President Bush the right to use all “necessary and appropriate force” against those involved in the September 11 attacks including planning or aiding 
Some reports suggest that the AUMF been used to allow military action in the Phillipines, Georgia, Yemen, Djibouti, Kenya, Ethiopia, Eritrea and Somalia. 
`;

const khbyer_pass_description = `<p>High in the Spin Ghar mountains on the Pakistan border lies Khyber Pass, a mountain pass that for centuries has held strategic value to locals and distant nations alike. In older times, the Roman Empire launched countless campaigns to secure this pass and others for important trading routes.</p>
<p>Now, more than a thousand years later, the Islamic Emirate of Afghanistan sees the pass as vital, mobilizing between 20,000 and 25,000 soldiers just across the border according to reports from the Pakistan army. The Taliban additionally deploys Russian made Scud missiles nearby. In the coming years, the pass will prove critical to U.S. logistics and supply missions into Afghanistan.</p>`;

const panjshir_valley_description = `<p>To the north of Kabul by a hundred miles lies Panjshir Valley, or Valley of the Five Lions. According to local legend, five Wali (highly spiritual brothers) lived in the valley and built an ancient dam that today serves as the foundations for a modern reservoir.</p>
<p>An important highway to the northern provinces, the Panjshir Valley leads to two passes in the Hindu Kush, the Khawak Pass leading to the northern plains, and the Anjoman Pass, leading to the Badakshan province, home to rugged mountains and one of the few provinces free of Taliban control.</p>`;
const jawbreaker_operation_begins = `<p>Just fifteen days after the attacks on American soil, a seven-member team of CIA Special Activities Division officers consisting of former special forces, communications and linguistics experts inserts into Afghanistan by helicopter somewhere in the Panjshir Valley. They form the Northern Afghanistan Liaison Team, callsign “Jawbreaker” with a broad goal: assist General Abdul Rashid Dostum of the Northern Alliance in unconventional warfare to undermine the Taliban.</p>
<p>Their goals are to coordinate with local allies for the introduction of Army Special Forces, buy support with some of the $3 million in cash they’ve brought in, send intelligence reports to Langley and coordinate ground support for bombing campaigns.</p>`;
const special_forces_overview = `<p>The CIA Jawbreaker teams covert insertion is a sign of the war to come: </p>
<p>In the coming months, American special forces will coordinate unconventional warfare operations by working alongside members of the Northern Alliance. Wary of deploying a large conventional force, senior military leaders opt to deploy special operations units throughout the country. The failure of Soviet conventional ground troops in Afghanistan is still fresh in leader’s minds, and American military leaders are wary of alienating the Afghani population by deploying a large foreign occupying force.</p>`;
const oda_first_insertion = `Departing from a special operations base in Uzbekistan, Operational Detachment Alpha (ODA) teams 555 and 595 of the 5th Special Forces Group (Army) covertly insert into Afghanistan via Chinook helicopters in near zero visibility conditions. They link up with members of the Northern Alliance, a group of warlords hostile to the Taliban government.`;
const oda_555_insertion = `At 2 a.m., ODA 555 inserts into the Panjshir River Valley just 20 miles north of Kabul linking up with warlord Fahim Khan and his Northern Alliance Forces.`;
const oda_595_insertion = `A few hundred miles north at roughly the same time, a MH-47E Chinook helicopter touches down in the remote town of Dehi in the Dari-a-Souf Valley. ODA 595 exits the helicopter, linking up with members of Jawbreaker and the Northern Alliance. The team is 120 miles south of their key objective: Mazar-i-Sharif. ODA 595 links up with General Dostum to assist with the town’s capture.`;
const objective_rhino_assault_description = `<p>For four days, US Navy SEALs have observed a site for a potential forward operating base in the Rigestan Desert, an arid plateau in the Helmand and Kandahar provinces. </p>
<p>At nighttime on the same day that the ODA teams insert into Northern Afghanistan, 200 Army Rangers of the 3rd Ranger Battalion airdrop into the target drop zone supported by AC-130 gunships. Mostly empty, the objective is quickly seized with minimal casualties. </p>`;
 
const mullah_omar_kandahar_assault = `<p>Task Force Sword is a black special operations group (off grid and reports directly to Joint Special Operations Command) consisting of operattors from Navy’s DEVGRU (SEAL Team 6), Army Delta Force, supported by Ranger elements, 160th SOAR, and the British Special Boat Service. </p>
<p>Delta Force operatives supported by Rangers from Task Force Sword conducted operations at Mullah Omar’s suspected summer retreat in the hills north of Kandahar. AC 130s and MH-60L direct action penetrators target the area.</p>`;

const oda_555_bagram_assault = `Using General Khan’s men, ODA 555 covertly surveils Taliban and al-Qaeda positions from high ground. Near Bagram Air Base, they secure a location which affords them an excellent vantage point for hundreds of potential Taliban targets that were camouflaged for aerial protection. Over the next few hours, the Air Force Combat Controller attached to their unit coordinates devastating air strikes that neutralize more targets than the Northern Alliance has managed to eliminate in years. And over the next month, the ODA team continues to rain down heavy munitions, devastating Taliban forces.`;
const oda_595_bishqab_assault = `ODA 595 and General Dostum push onward, seizing the town at Bishqab. Despite facing superior Taliban armament, including multiple Soviet T-55 tanks, armored personnel carriers, and several ZSU-23 anti aircraft artillery, coalition forces, relying on superior American air capabilities manage to decimate Taliban vehicles and heavy weapons. But as American aircraft depart for refueling, coalition forces are forced to retreat.`;
const oda_595_cobaki_assault = `Facing a larger force than the one at Bishqab, Dostum and the men of ODA 595 manage to route Taliban forces at Cobaki which include heavy tanks and artillery. ODA 595’s Captain Nelson reports: 
“I am advising a man on how to employ light infantry and horse cavalry in the attack against T-55s, mortars, artillery, personnel carriers, and machine guns – a tactic which I think became outdated with the invention of the Gatling gun… I think [the mujahideen] are doing very well with what they have. They all speak of their hopes for a better Afghanistan once the Taliban are gone.”`;
const oda_534_covert_insertion = `Delayed by several days due to poor weather, ODA 534 along with inserts into the Dari-a-Souf valley, just south of ODA 595, in Yakawlang. Balkh Valley in support of General Mohammad Atta Nur. In the coming days, they will push further north to help General Dostum’s forces seize Mazar-e-Sharif.`;
const oda_553_covert_insertion = `ODA 553 inserts to support General Karim Khalili in their objective of flushing out Taliban forces from Northern cities.`;
const oda_koh_i_almortak_assault = `The Northern Alliance breaks through Taliban defenses in the Dari-a-Souf valley and continue on to Mazar-e-Sharif. ODA teams continue to deliver significant tactical support, calling in air strikes from observational posts along the Koh-i-Almortak ridgeline nearly two to three miles away.`;
const oda_586_kunduz_insertion = `ODA 586 deploys to Kunduz with the forces of General Daoud Khan`;
const oda_594_panjshir_insertion = `ODA 594 deploys into Panjshir to assist the men of ODA 555`;
const oda_teams_seize_mazar_sharif = `Members of multiple ODA teams along with General Dostum’s forces converge on the city and begin their assault by foot, horseback, pickup trucks, and seized armored personnel carriers. After a 90 minute battle at the Southern entrance, Northern Alliance forces sweep across the city, seizing its main military base, and the Mazar-e-Sharif International Airport.`;
const american_bombing_campaign = `Throughout October and continuing into November, devastating bombing campaigns wreak havoc on Taliban forces across Afghanistan On this particular day, British and other countries’ ground special forces deliver targeting information enabling B-52 Bombers to deliver devastating strikes around Kabul, the Taliban stronghold of Kandahar, and Bagram Air Base to the north of Kabul.`;
const american_bombing_campaign_casualties = `<p>But while the bombing campaigns cripple Taliban forces, over the next few months they also kill hundreds if not thousands of Afghani civilians. Reparations are sparse at best.</p>
<p>Senior commander Gul Amir Jan, who worked directly with Special Forces, said, "The most the villagers got was a few truckloads of food from the Americans. But the Americans didn't even apologize. They never do."</p>`;
const american_bombing_showkar_kariz = `At the desert oasis Showkar Kariz 30 miles northeast of Kandahar, U.S. bombs killed 45 men, women, and children.`;
const american_bombing_pachir_aw_agam = `Nine workers of a local council in Pachir Aw Agam are killed on December 2 near Tora Bora.`;
const american_bombing_jalalabad = `Twenty two miles southwest of Jalalabad, American bombs and missiles flatten 13 homes, killing 12 Kochi nomads. Near shredded clothing and the bones of dead livestock, Mohammed Shah Khan, laments, "Our houses were bombed; our cattle were killed. Innocent women and children die. Someone should come and dry our tears." `;
const oda_554_covert_insertion = `ODA 554 lands to support General Ismail Khan in retaking Herat. Khan returns from a long stay abroad in Iran, following his forced retreat from Herat where he held the governorship before Taliban forces took over.`;
const oda_586_seizes_taloqan = `ODA 586 and General Daoud Khan outside the city of Taloqan call in preparatory airstrikes in anticipation of a Taliban assault. They quickly seize the city, facing minimal resistance. Having lifted the Taliban rule, the Northern Alliance sets its sights on Kunduz to the west.`;
const oda_555_seizes_kabul = `Amidst reports that Taliban forces fled Kabul the previous night under cover of darkness, Northern alliance forces supported by ODA 555 enter Kabul and neutralize straggling Taliban forces in the city’s park. With this final conflict resolved, coalition forces now control Kabul.`;
const dostum_assault_kunduz = `General Dostum and Special Forces advisers move to besiege Kunduz, but encounter heavy resistance. Over the next eleven days, American aircraft heavily bombard Taliban positions at the city destroying multiple bunkers, supply dumps, and heavy weapons.`;

const prior_to_invasion_timeline = [
	new Event(new Date(2001, 8, 11), EventType.MAJOR, camera_views.us_attacks, nine_eleven_attacks_markers, nine11attackdescription),
	new Event(new Date(2001, 8, 11), EventType.HIDDEN, camera_views.oval_office, [markers.oval_office], bush_response),
	new Event(new Date(2001, 8, 12), EventType.MINOR, camera_views.indian_ocean, persian_gulf_ships, persian_gulf_response),
	new Event(new Date(2001, 8, 13), EventType.MINOR, camera_views.kabul_city, kabul_markers, kabul_evacuation_description1),
	new Event(new Date(2001, 8, 13), EventType.HIDDEN, camera_views.kabul_city, [markers.kabul_airport], kabul_evacuation_description2),
	new Event(new Date(2001, 8, 14), EventType.MAJOR, camera_views.congress_capitol, [markers.congress_capitol_building], senate_join_res_23),
	new Event(new Date(2001, 8, 18), EventType.MINOR, camera_views.khyber_pass, [markers.khyber_pass], khbyer_pass_description),
	new Event(new Date(2001, 8, 26), EventType.HIDDEN, camera_views.panjshir_valley_high_view, [markers.khawak_pass, markers.anjoman_pass], panjshir_valley_description),
	new Event(new Date(2001,8, 26), EventType.MAJOR, camera_views.panjshir_valley_closeup, [markers.cia_jawbreaker_insertion], jawbreaker_operation_begins),
	new Event(new Date(2001, 9, 19), EventType.MAJOR, camera_views.default_afghanistan_view, undefined, oda_first_insertion),
	new Event(new Date(2001, 9, 19), EventType.HIDDEN, camera_views.oda_555_insertion_view, [markers.oda_555_insertion], oda_555_insertion),
	new Event(new Date(2001, 9, 19), EventType.HIDDEN, camera_views.oda_595_insertion_view, [markers.oda_595_insertion], oda_595_insertion),
	new Event(new Date(2001, 9, 19), EventType.MINOR, camera_views.objective_rhino_large, [markers.objective_rhino], objective_rhino_assault_description),
	new Event(new Date(2001, 9, 19), EventType.HIDDEN, camera_views.mullah_omar_kandahar_assault, [markers.mullah_omar_kandahar_assault], mullah_omar_kandahar_assault),
	new Event(new Date(2001, 9, 21), EventType.MINOR, camera_views.oda_555_bagram_assault, [markers.oda_555_bagram_assault], oda_555_bagram_assault),
	new Event(new Date(2001, 9, 21), EventType.HIDDEN, camera_views.oda_595_bishqab_assault, [markers.oda_595_bishqab_assault], oda_595_bishqab_assault),
	new Event(new Date(2001, 9, 22), EventType.MINOR, camera_views.oda_595_cobaki_assault, [markers.oda_595_cobaki_assault], oda_595_cobaki_assault),
	new Event(new Date(2001, 10, 2), EventType.MINOR, camera_views.oda_534_covert_insertion, [markers.oda_534_covert_insertion], oda_534_covert_insertion),
	new Event(new Date(2001, 10, 3), EventType.MINOR, camera_views.oda_553_covert_insertion, [markers.oda_553_covert_insertion], oda_553_covert_insertion),
	new Event(new Date(2001, 10, 6), EventType.MINOR, camera_views.koh_i_almortak_ridgeline, koh_i_almortak_ridgeline_markers, oda_koh_i_almortak_assault),
	new Event(new Date(2001, 10, 8), EventType.MINOR, camera_views.oda_586_kunduz_insertion, [markers.oda_586_kunduz_insertion], oda_586_kunduz_insertion),
	new Event(new Date(2001, 10, 8), EventType.HIDDEN, camera_views.oda_594_panjshir_insertion, [markers.oda_594_panjshir_insertion], oda_594_panjshir_insertion),
	new Event(new Date(2001, 10, 9), EventType.MINOR, camera_views.oda_teams_seize_mazar_sharif, mazar_e_sharif_markers, oda_teams_seize_mazar_sharif),

];


const rest_of_events = [
	new Event(new Date(2001, 10, 27), EventType.MAJOR),
	new Event(new Date(2001, 11, 3), EventType.MINOR),
	new Event(new Date(2001, 11, 4), EventType.MINOR),
	new Event(new Date(2001, 11, 5), EventType.MAJOR),
	new Event(new Date(2001, 11, 18), EventType.MAJOR),
	new Event(new Date(2001, 11, 23), EventType.MINOR),
	new Event(new Date(2002, 0, 2), EventType.MINOR),
	new Event(new Date(2002, 0, 3), EventType.MAJOR),
	new Event(new Date(2002, 0, 7), EventType.MAJOR),
	new Event(new Date(2002, 0, 21), EventType.MINOR),
	new Event(new Date(2002, 1, 7), EventType.MINOR),
	new Event(new Date(2002, 1, 9), EventType.MAJOR),
	new Event(new Date(2002, 1, 11), EventType.MAJOR),
	new Event(new Date(2002, 1, 12), EventType.MINOR),
	new Event(new Date(2002, 2, 2), EventType.MINOR),
	new Event(new Date(2002, 2, 3), EventType.MAJOR),
	new Event(new Date(2002, 2, 21), EventType.MAJOR)
];

const events = prior_to_invasion_timeline.concat(rest_of_events);
