var app = angular.module("profileApp", ["ngSanitize"]);

var profileInfo = {
  firstName: "",
  lastName: "",
  headline: "",
  id: "",
  numConnections: "",
  pictureUrl: "",
  summary: "",
  email: ""
};

app.controller("profileCtrl", function($scope, $http, $location)
{
  // Executed when user logs in and their profile data is retrieved 
  $scope.displayProfile = function displayProfile()
  {
    if (IN.User.isAuthorized())
    {
        console.log("User has granted access to this application.");
        $scope.profile_pic = profileInfo.pictureUrl;
        $scope.name = profileInfo.firstName + " " + profileInfo.lastName;
        $scope.headline = profileInfo.headline;
        $scope.summary = profileInfo.summary;
        $scope.numConnections = profileInfo.numConnections;
        $scope.email = profileInfo.email;
    }
    else
    {
        console.log("User has not granted access.");
        var req = new XMLHttpRequest;
        req.open()
        IN.User.authorize();
    }
    $scope.$apply();
  }

  $scope.logout = function logout()
  {
    IN.User.logout(function()
    {
      console.log("User has successfully logged out.");
    });
    $scope.profile_pic = "https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAlwAAAAJGYwMzEwYmNkLTUzNTctNDFlZi1hYzM4LTQwOWM3MGMzYjUwMQ.jpg";
    $scope.name = "";
    $scope.headline = "";
    $scope.summary = "";
    $scope.numConnections = "";
    $scope.email = "";
  }

});

// Setup an event listener to make an API call once auth is complete
function onLinkedInLoad()
{
    IN.Event.on(IN, "frameworkLoaded", function() {
        console.log("LinkedIn JavaScript SDK has successfully loaded.");
    });

    IN.Event.on(IN, "systemReady", function() {
        console.log("The system is ready for execution.");
    });

    // when user has authorized this application, call the getProfileData function to get their basic info
    IN.Event.on(IN, "auth", getProfileData);
}

// Handle the successful return from the API call
function onSuccess(data)
{
    console.log(data);
    profileInfo.firstName = data.firstName;
    profileInfo.lastName = data.lastName;
    profileInfo.headline = data.headline;
    profileInfo.id = data.id;
    profileInfo.numConnections = data.numConnections;
    profileInfo.pictureUrl = data.pictureUrl;
    profileInfo.summary = data.summary;
    profileInfo.email = data.emailAddress;
    angular.element(document.getElementById('profileCtrl')).scope().displayProfile();
}

// Handle an error response from the API call
function onError(error) {
    console.log(error);
}

// Use the API call wrapper to request the member's basic profile data
function getProfileData() {
    console.log("User has authorized this application to access their information.");
    // Sends a request to the LinkedIn REST API. Is returned JSON that can be accessed in a javascript object
    IN.API.Raw("/people/~:(firstName,lastName,headline,id,num-connections,picture-url,summary,email-address)?format=json").result(onSuccess).error(onError);
  }
