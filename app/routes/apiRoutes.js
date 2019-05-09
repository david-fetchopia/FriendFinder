// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friend");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
      res.json(friends);
  })

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    // if (tableData.length < 5) {
    //   tableData.push(req.body);
    //   res.json(true);
    // }
    // else {
    //   waitListData.push(req.body);
    //   res.json(false);
   

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!
    // Capture the user input object
    var userInput = req.body;
    console.log('userInput = ' + JSON.stringify(userInput));
    var userResponses = userInput.scores
    console.log('userResponses = ' + userResponses);

    // Compute best friend match
    var matchName = '';
    var matchImage = '';
    var totalDifference = 51; // Make the initial value big for comparison

    // Examine all existing friends in the list
    for (var i = 0; i < friends.length; i++) {
        // console.log('friend = ' + JSON.stringify(friends[i]));

        // Compute differenes for each question
        var scoreDiff = 0;
        for (var j = 0; j < userResponses.length; j++) {
            scoreDiff += Math.abs(friends[i].scores[j] - userResponses[j]);
        }
        // console.log('diff = ' + scoreDiff);

        // If lowest difference, record the friend match
        if (scoreDiff < totalDifference) {
            // console.log('Closest match found = ' + scoreDiff);
            // console.log('Friend name = ' + friends[i].name);
            // console.log('Friend image = ' + friends[i].photo);

            totalDifference = scoreDiff;
            matchName = friends[i].name;
            matchImage = friends[i].photo;
        }
    }
    res.json({ status: 'OK', matchName: matchName, matchImage: matchImage });
});
};