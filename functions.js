var app = angular.module("profileApp", ["ngSanitize"]);

app.controller("profileCtrl", function($scope, $http, $location)
{
  // Executed when user clicks "Get info" button
  $scope.displayProfile = function displayProfile()
  {
    if (IN.User.isAuthorized())
    {
        console.log("User has granted access to this application.");
        getProfileData();
    }
    else
    {
        console.log("User has not granted access.");
        IN.User.authorize(getProfileData());
    }
  }

  $scope.logout = function logout()
  {
    IN.User.logout(function()
    {
      console.log("User has successfully logged out.");
    });
  }
});

function onLinkedInLoad()
{
  IN.Event.on(IN, "frameworkLoaded", function()
  {
      console.log("LinkedIn JavaScript SDK has successfully loaded.");
  });

  IN.Event.on(IN, "systemReady", function()
  {
    console.log("The system is ready for execution.");
  });
}

function getProfileData()
{
  console.log("test?");
  IN.API.Raw("/people/~?format=json").result(data());
}

function data()
{
  console.log("data function test");
}

function onError(error)
{
    console.log("Error");
}
