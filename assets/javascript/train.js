// Initialize Firebase
var config = {
  apiKey: "AIzaSyDpv-1wzABPyb_qzmVqRj-lekPvmNjbiz0",
  authDomain: "qproj-665b3.firebaseapp.com",
  databaseURL: "https://qproj-665b3.firebaseio.com",
  projectId: "qproj-665b3",
  storageBucket: "qproj-665b3.appspot.com",
  messagingSenderId: "61704178992"
};
firebase.initializeApp(config);



// save firebase database reference
var database = firebase.database();


// add event listener for form submit
$("#submit-btn").on("click", function (event) {
  event.preventDefault();


  var trainName = $("#train-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var time = $("#firstStart-input").val();
  var trainFrequency = parseInt($("#frequency-input").val());

  // Set up a variale to handle train info group
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firstTrainTime: time,
    frequency: trainFrequency

  };
  database.ref().push(newTrain);


  // clear out any value in form input tags on page
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");

});

// Get snapshot of child to pick up information 
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var time = childSnapshot.val().firstTrainTime;
  var trainFrequency = childSnapshot.val().frequency;
  // start the time process and functioning
  var tFrequency = trainFrequency;

  var firstTime = time;

  var firstTimeConverted = moment(firstTime, "HH:mm");

  var currentTime = moment();


  var diffTime = parseInt(moment().diff(moment(firstTimeConverted), "minutes"));

  // Set a variable for how frequently the train arrives
  var tRemainder = parseInt(diffTime) % parseInt(tFrequency);

  //Convert the time frequency into a number
  tMinutesTillTrain = parseInt(tFrequency) - parseInt(tRemainder);
  // Set variable for getting the time to the next train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  nextTrain = (moment(nextTrain).format("hh:mm A"));

  // Populate the current train data in html, create table to do it
  $("#train-Table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + " min" + "</td><td>" + nextTrain + "</td><td>" + "Arrives in : " + tMinutesTillTrain + " min" + "</td>" + "<td>" + "<button class='btn btn-secondary'>" + "<i class='fas fa-file-signature'></i>" + "</button>" +
    "<button 'class=''btn btn-secondary'>" + "<i class='fas fa-undo'>" + "</i>" + "</button>" + "</td>" + "</tr>"
  );
});