(function () {
    'use strict';

    angular
        .module('app')
        .controller('demoController', demoController);

    demoController.$inject = ['$location', 'ngStorage']; 

    function demoController($location, localStorage) {
        /* jshint validthis:true */
        var self = this;

        self.encryptedValue = "";
        self.encrypt = function (password, message) {
            self.encryptedValue = sjcl.encrypt(password, message);
        };
        self.decrypt = function (password, encryptedData) {
            self.UnencryptedValue = sjcl.decrypt(password, encryptedData);
        };

        activate();





        $scope.$watch(angular.bind(this, function () {
            return this.tslApplication.prevAddresses;
        }), function (newVal) {
            localStorage.TSLApplication.prevAddresses = newVal;
        });



        function activate() {
        }
    }
})();
