var crosshairsSize=19;
var map1;
var map2;
var geocoder1;
geocoder1=new GClientGeocoder();
var geocoder2;
geocoder2=new GClientGeocoder();
var Icon=new GIcon(G_DEFAULT_ICON);
Icon.image="http://www.freemaptools.com/images/markers/freemaptools.png";
Icon.shadow="http://www.freemaptools.com/images/markers/shadow.png";
Icon.iconSize=new GSize(20,34);
Icon.shadowSize=new GSize(37,34);
Icon.iconAnchor=new GLatLng(9,34);
Icon.infoWindowAnchor=new GLatLng(9,2);
Icon.infoShadowAnchor=new GLatLng(18,25);
GMap2.prototype.addCrosshairs=function(){
	var container=this.getContainer();
	if(this.crosshairs)this.removeCrosshairs();
	var crosshairs=document.createElement("img");
	crosshairs.src='http://www.freemaptools.com/images/crosshairs.gif';
	crosshairs.style.width=crosshairsSize+'px';
	crosshairs.style.height=crosshairsSize+'px';
	crosshairs.style.border='0';
	crosshairs.style.position='relative';
	crosshairs.style.top=((container.clientHeight-crosshairsSize)/2)+'px';
	crosshairs.style.left="0px";crosshairs.style.zIndex='500';
	container.appendChild(crosshairs);
	this.crosshairs=crosshairs;
	return crosshairs};
function Gload(){
	map1=new GMap2(document.getElementById("map1"));
	map1.addControl(new GSmallMapControl());
	map1.addMapType(G_PHYSICAL_MAP);
	map1.addControl(new GMenuMapTypeControl());
	map1.setCenter(new GLatLng(0,0),2);
	map1.addCrosshairs();
	map2=new GMap2(document.getElementById("map2"));
	map2.addControl(new GSmallMapControl());
	map2.addMapType(G_PHYSICAL_MAP);
	map2.addControl(new GMenuMapTypeControl());
	map2.setCenter(new GLatLng(0,-180),2);
	map2.addCrosshairs();
	GEvent.addListener(map1,"zoomend",function(){
		var zoom=map1.getZoom();
		if(document.getElementById("cb_unlinkzoom").checked==false){
			map2.setZoom(zoom)}});
	GEvent.addListener(map2,"zoomend",function(){
		var zoom=map2.getZoom();
		if(document.getElementById("cb_unlinkzoom").checked==false){
			map1.setZoom(zoom)}});GEvent.addListener(
				map1,"dragend",function(){
					var center=map1.getCenter();
					var zoom=map1.getZoom();
					lng=center.lng();
					lat=center.lat();
					newlng=(lng+180);
					if(newlng>180){
						newlng=newlng-360
						}
					newlat=-lat;
					map2.setCenter(new GLatLng(newlat,newlng));
					if(document.getElementById("cb_unlinkzoom").checked==false){
						map2.setZoom(zoom)}
					document.getElementById("map1coords").innerHTML=map1.getCenter().lat()+","+map1.getCenter().lng();
					document.getElementById("map2coords").innerHTML=map2.getCenter().lat()+","+map2.getCenter().lng();
					showLocationfp1(map1.getCenter());showLocationfp2(map2.getCenter())});
					GEvent.addListener(map2,"dragend",function(){
						var center=map2.getCenter();
						var zoom=map2.getZoom();
						lng=center.lng();
						lat=center.lat();
						newlng=(lng+180);
						if(newlng>180){
							newlng=newlng-360}
						newlat=-lat;
						map1.setCenter(new GLatLng(newlat,newlng));
						if(document.getElementById("cb_unlinkzoom").checked==false){map1.setZoom(zoom)}
						document.getElementById("map1coords").innerHTML=map1.getCenter().lat()+","+map1.getCenter().lng();
						document.getElementById("map2coords").innerHTML=map2.getCenter().lat()+","+map2.getCenter().lng();
						showLocationfp1(map1.getCenter());
						showLocationfp2(map2.getCenter())})}
function isset(varname){
	return(typeof(window[varname])!='undefined')
	}
countries=[["AF","Afghanistan"],["AX","land Islands"],["AL","Albania"],["DZ","Algeria"],["AS","American Samoa"],["AD","Andorra"],["AO","Angola"],["AI","Anguilla"],["AQ","Antarctica"],["AG","Antigua and Barbuda"],["AR","Argentina"],["AM","Armenia"],["AW","Aruba"],["AU","Australia"],["AT","Austria"],["AZ","Azerbaijan"],["BS","Bahamas"],["BH","Bahrain"],["BD","Bangladesh"],["BB","Barbados"],["BY","Belarus"],["BE","Belgium"],["BZ","Belize"],["BJ","Benin"],["BM","Bermuda"],["BT","Bhutan"],["BO","Bolivia"],["BA","Bosnia and Herzegovina"],["BW","Botswana"],["BV","Bouvet Island"],["BR","Brazil"],["IO","British Indian Ocean Territory"],["BN","Brunei Darussalam"],["BG","Bulgaria"],["BF","Burkina Faso"],["BI","Burundi"],["KH","Cambodia"],["CM","Cameroon"],["CA","Canada"],["CV","Cape Verde"],["KY","Cayman Islands"],["CF","Central African Republic"],["TD","Chad"],["CL","Chile"],["CN","China"],["CX","Christmas Island"],["CC","Cocos (Keeling) Islands"],["CO","Colombia"],["KM","Comoros"],["CG","Congo"],["CD","Congo, The Democratic Republic of the"],["CK","Cook Islands"],["CR","Costa Rica"],["CI","C�te d'Ivoire"],["HR","Croatia"],["CU","Cuba"],["CY","Cyprus"],["CZ","Czech Republic"],["DK","Denmark"],["DJ","Djibouti"],["DM","Dominica"],["DO","Dominican Republic"],["EC","Ecuador"],["EG","Egypt"],["SV","El Salvador"],["GQ","Equatorial Guinea"],["ER","Eritrea"],["EE","Estonia"],["ET","Ethiopia"],["FK","Falkland Islands (Malvinas)"],["FO","Faroe Islands"],["FJ","Fiji"],["FI","Finland"],["FR","France"],["GF","French Guiana"],["PF","French Polynesia"],["TF","French Southern Territories"],["GA","Gabon"],["GM","Gambia"],["GE","Georgia"],["DE","Germany"],["GH","Ghana"],["GI","Gibraltar"],["GR","Greece"],["GL","Greenland"],["GD","Grenada"],["GP","Guadeloupe"],["GU","Guam"],["GT","Guatemala"],["GG","Guernsey"],["GN","Guinea"],["GW","Guinea-Bissau"],["GY","Guyana"],["HT","Haiti"],["HM","Heard Island and McDonald Islands"],["VA","Holy See (Vatican City State)"],["HN","Honduras"],["HK","Hong Kong"],["HU","Hungary"],["IS","Iceland"],["IN","India"],["ID","Indonesia"],["IR","Iran, Islamic Republic of"],["IQ","Iraq"],["IE","Ireland"],["IM","Isle of Man"],["IL","Israel"],["IT","Italy"],["JM","Jamaica"],["JP","Japan"],["JE","Jersey"],["JO","Jordan"],["KZ","Kazakhstan"],["KE","Kenya"],["KI","Kiribati"],["KP","Korea, Democratic People's Republic of"],["KR","Korea, Republic of"],["KW","Kuwait"],["KG","Kyrgyzstan"],["LA","Lao People's Democratic Republic"],["LV","Latvia"],["LB","Lebanon"],["LS","Lesotho"],["LR","Liberia"],["LY","Libyan Arab Jamahiriya"],["LI","Liechtenstein"],["LT","Lithuania"],["LU","Luxembourg"],["MO","Macao"],["MK","Macedonia, The Former Yugoslav Republic of"],["MG","Madagascar"],["MW","Malawi"],["MY","Malaysia"],["MV","Maldives"],["ML","Mali"],["MT","Malta"],["MH","Marshall Islands"],["MQ","Martinique"],["MR","Mauritania"],["MU","Mauritius"],["YT","Mayotte"],["MX","Mexico"],["FM","Micronesia, Federated States of"],["MD","Moldova"],["MC","Monaco"],["MN","Mongolia"],["ME","Montenegro"],["MS","Montserrat"],["MA","Morocco"],["MZ","Mozambique"],["MM","Myanmar"],["NA","Namibia"],["NR","Nauru"],["NP","Nepal"],["NL","Netherlands"],["AN","Netherlands Antilles"],["NC","New Caledonia"],["NZ","New Zealand"],["NI","Nicaragua"],["NE","Niger"],["NG","Nigeria"],["NU","Niue"],["NF","Norfolk Island"],["MP","Northern Mariana Islands"],["NO","Norway"],["OM","Oman"],["PK","Pakistan"],["PW","Palau"],["PS","Palestinian Territory, Occupied"],["PA","Panama"],["PG","Papua New Guinea"],["PY","Paraguay"],["PE","Peru"],["PH","Philippines"],["PN","Pitcairn"],["PL","Poland"],["PT","Portugal"],["PR","Puerto Rico"],["QA","Qatar"],["RE","R�union"],["RO","Romania"],["RU","Russian Federation"],["RW","Rwanda"],["BL","Saint Barth�lemy"],["SH","Saint Helena"],["KN","Saint Kitts and Nevis"],["LC","Saint Lucia"],["MF","Saint Martin"],["PM","Saint Pierre and Miquelon"],["VC","Saint Vincent and the Grenadines"],["WS","Samoa"],["SM","San Marino"],["ST","Sao Tome and Principe"],["SA","Saudi Arabia"],["SN","Senegal"],["RS","Serbia"],["SC","Seychelles"],["SL","Sierra Leone"],["SG","Singapore"],["SK","Slovakia"],["SI","Slovenia"],["SB","Solomon Islands"],["SO","Somalia"],["ZA","South Africa"],["GS","South Georgia and the South Sandwich Islands"],["ES","Spain"],["LK","Sri Lanka"],["SD","Sudan"],["SR","Suriname"],["SJ","Svalbard and Jan Mayen"],["SZ","Swaziland"],["SE","Sweden"],["CH","Switzerland"],["SY","Syrian Arab Republic"],["TW","Taiwan, Province of China"],["TJ","Tajikistan"],["TZ","Tanzania, United Republic of"],["TH","Thailand"],["TL","Timor-Leste"],["TG","Togo"],["TK","Tokelau"],["TO","Tonga"],["TT","Trinidad and Tobago"],["TN","Tunisia"],["TR","Turkey"],["TM","Turkmenistan"],["TC","Turks and Caicos Islands"],["TV","Tuvalu"],["UG","Uganda"],["UA","Ukraine"],["AE","United Arab Emirates"],["GB","United Kingdom"],["US","United States"],["UM","United States Minor Outlying Islands"],["UY","Uruguay"],["UZ","Uzbekistan"],["VU","Vanuatu"],["VE","Venezuela"],["VN","Viet Nam"],["VG","Virgin Islands, British"],["VI","Virgin Islands, U.S."],["WF","Wallis and Futuna"],["EH","Western Sahara"],["YE","Yemen"],["ZM","Zambia"],["ZW","Zimbabwe"],];
function convertcodetoname(code){
	var name;
	for(i=0;i<=countries.length-1;i++){
		var country=countries[i];
		if(country[0]==code){name=country[1]}
		}
	return(name)
	}
function showLocationfp1(point){
	var pointasstring=point.lat()+","+point.lng();
	geocoder1.getLocations(pointasstring,addAddressToMap1)}
function showLocationfp2(point){
	var pointasstring=point.lat()+","+point.lng();
	geocoder2.getLocations(pointasstring,addAddressToMap2)}
function addAddressToMap1(response){
	var texttodisplay;
	if(!response||response.Status.code!=200){
		texttodisplay="No Country"
		}
	else{
		place=response.Placemark[0];
		if(place.AddressDetails===undefined){
			texttodisplay="[None Found]"
		}
		else{
			var cname=convertcodetoname(place.AddressDetails.Country.CountryNameCode);
			texttodisplay=cname}
		}
	document.getElementById("outputmsg1").innerHTML=texttodisplay
}
function addAddressToMap2(response){
	var texttodisplay;
	if(!response||response.Status.code!=200){
		texttodisplay="No Country"
	}
	else{
		place=response.Placemark[0];
		if(place.AddressDetails===undefined){
			texttodisplay="[None Found]"
			}
		else{
			var cname=convertcodetoname(place.AddressDetails.Country.CountryNameCode);
			texttodisplay=cname}
		}
		document.getElementById("outputmsg2").innerHTML=texttodisplay
	}