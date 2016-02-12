'use strict';
var app = angular.module('mapa-tomografia',[]);
var urlServidor = 'http://mapa-tomografia-webservice.cloudapp.net/mapa-tomografia-webservice/tomografia/';
var msgErro = 'Houve um problema na requisição da informação solicitada';

app.controller('img',['$rootScope', '$scope','$http', function($rootScope, $scope,$http) {
  $scope.descricao = "Clique nas áreas demarcadas";
    $scope.info = function(area,id){
        $("#retorno").html('<div class="loader">\
                         <div class="loader--dot"></div>\
                         <div class="loader--dot"></div>\
                         <div class="loader--dot"></div>\
                         <div class="loader--dot"></div>\
                         <div class="loader--dot"></div>\
                         <div class="loader--dot"></div></div>');
        var areaSelec = area;
        var idReq = id;
        if (idReq == 1){
          $http({
            method: 'GET',
            url: urlServidor+1,
            headers: {
                  'Content-Type': 'application/json'
            }
          }).then(function successCallback(response) {
              $("#retorno").removeClass();
              $("#retorno").addClass("alert alert-info text-center");
              console.log("Sem erro: "+angular.toJson(response.data));
              $scope.descricao = response.data.hachuras.conteudo;
              $("#retorno").html($scope.descricao);
            }, function errorCallback(response) {
                 $("#retorno").removeClass();
              $("#retorno").addClass("alert alert-danger text-center");
              $scope.descricao = msgErro;
              $("#retorno").html($scope.descricao);
            });
        } else{
            $http({
            method: 'GET',
            url: urlServidor+idReq,
            headers: {
                  'Content-Type': 'application/json'
            }
          }).then(function successCallback(response) {
                $("#retorno").removeClass();
                $("#retorno").addClass("alert alert-info text-center");
                console.log("Sem erro: "+angular.toJson(response.data));
                $scope.descricao = response.data.hachuras[areaSelec-1].conteudo;
                $("#retorno").html($scope.descricao);
            }, function errorCallback(response) {
                $("#retorno").removeClass();
                $("#retorno").addClass("alert alert-danger text-center");
                $scope.descricao = msgErro;
                $("#retorno").html($scope.descricao);
            });
        }
    };


}]);