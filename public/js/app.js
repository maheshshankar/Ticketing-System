 var app = angular.module('myApp', ["ngRoute"]);
 
  app.config(function($routeProvider) {
     $routeProvider
         .when("/", {
             templateUrl: "html/home.html",
             controller: "ticketController"
         })
         .when("/ticket", {
             templateUrl: "html/tickets.html",
             controller: "ticketController"

         })
         .when("/addcomplaint", {
             templateUrl: "html/addcomplaint.html",
             controller: "ticketController"

         })
         .when("/assignuser", {
             templateUrl: "html/assignuser.html",
             controller: "ticketController"

         })
         .when("/addcomment", {
             templateUrl: "html/addcomment.html",
             controller: "ticketController"

         })
         .when("/changestate", {
             templateUrl: "html/changestate.html",
             controller: "ticketController"

         })
         .otherwise('/')

 });


 app.controller('ticketController', function($scope, $http, $route) {
     $http.get("data.txt").then(function(response) {
         $scope.tickets = response.data;
         let data = response.data;
         let resp = JSON.stringify(response.data);

         $scope.count = {
             ticket: data.length,
             new: 0,
             open: 0,
             closed: 0
         };


         let statusKeys = Object.keys($scope.count);

         data.forEach(x => {
                 statusKeys.forEach(key => {
                     if (x.status === key) ++$scope.count[key];
                 })
             })

         $scope.myFunc = function() {
             $scope.showTicket = !$scope.showTicket
         };






         $scope.complaint = {};

         $scope.submitComplaint = function () {
            $scope.complaint.isFormHidden = true;
            let params = {
                customer_name: $scope.complaint.name,
                complaint: $scope.complaint.text
            }
            $http.get('/addcomplaint', {params: params}).then(res => {
                $scope.complaint.responseData = res.data;
            })
         }

         $scope.comments = {};
        
          $scope.addComments = function () {
            $scope.comments.isFormHidden = true;
            let params = {
                customer_name: $scope.comments.name,
                comments: $scope.comments.text
            }
            $http.get('/addcomments', {params: params}).then(res => {
                $scope.comments.responseData = res.data;
            })
         }

         $scope.assign = {};
        
          $scope.assignUser = function () {
            $scope.assign.isFormHidden = true;
            let params = {
                customer_name: $scope.assign.name,
                user: $scope.assign.user
            }
            $http.get('/assignuser', {params: params}).then(res => {
                $scope.assign.responseData = res.data;
            })
         }

          $scope.status = {};
        
          $scope.changeStatusToClosed = function () {
            
            let params = {
                customer_name: $scope.status.name
            }
            $http.get('/changestatus', {params: params}).then(res => {
                $scope.status.responseData = res.data;
            })
         }

          $scope.ticket = {};
        
          $scope.ticketDetails = function () {
            
            let params = {
                customer_name: $scope.ticket.name
            }
            $http.get('/ticket', {params: params}).then(res => {
                $scope.ticket.responseData = res.data;
            })
         }

     });
 });
