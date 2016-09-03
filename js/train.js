// Initialize Firebase
var config = {
	apiKey: "AIzaSyCmA72FnaCmZPdGePBM926_Hf1sjU8i3g0",
	authDomain: "week7-3dcca.firebaseapp.com",
	databaseURL: "https://week7-3dcca.firebaseio.com",
	storageBucket: "week7-3dcca.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();
var name = "";
var destination = "";
var firstTime = "";
var frequency = "";
var nextArrival = "";
var minAway = "";

var newTrain = {
		name: name,
		destination: destination,
		firstTime: firstTime,
		frequency: frequency,
		//nextArrival: nextArrival,
		minAway: minAway
}


$('#submit').on('click', function(event) {
	event.preventDefault();
	
	newTrain.name = $('#train-name').val().trim();
	newTrain.destination = $('#destination').val();
	newTrain.firstTime = $('#first-time').val();
	newTrain.frequency = $('#frequency').val();
	newTrain.minAway = 0;
	//console.log(firstTime);
	//console.log(frequency);

	database.ref().push(newTrain);

	$('.form-control').val('');
})

database.ref().on('child_added', function(childSnapshot) {

	firstTime = childSnapshot.val().firstTime;
	name = childSnapshot.val().name;
	destination = childSnapshot.val().destination;	
	frequency = childSnapshot.val().frequency;
	
	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
	//console.log(firstTimeConverted);
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	var tRemainder = diffTime % frequency;

	//calculate minutes away
	minAway =  frequency - tRemainder;
	//console.log(minAway);

	//calculate next arrival time
	nextArrival = moment().add(frequency, 'minutes');
	//console.log(nextArrival);

	//Create tr for every train
	var schedule_tr = $('<tr>');

	//Create td for schedule data
	var name_td = $('<td>');
	var destination_td = $('<td>');
	var frequency_td = $('<td>');
	var nextArrival_td = $('<td>');
	var minAway_td = $('<td>');

	//Add data to td
	name_td.text(name);
	destination_td.text(destination);
	frequency_td.text(frequency);

	nextArrival_td.text(nextArrival.format('HH:mm'));
	minAway_td.text(minAway);

	//Append td to schedule_tr
	schedule_tr.append(name_td);
	schedule_tr.append(destination_td);
	schedule_tr.append(frequency_td);
	schedule_tr.append(nextArrival_td);
	schedule_tr.append(minAway_td);

	$('tbody').append(schedule_tr);
});
