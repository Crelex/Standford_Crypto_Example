(function () {
    'use strict';

    angular.module('app')
            .controller('PersonalController', PersonalController);

    PersonalController.$inject = ['$location', '$localStorage', '$scope'];

    function PersonalController($location, localStorage, $scope) {
        var self = this;

        if (localStorage.TSLApplication === undefined)
        {
            localStorage.TSLApplication = {};
        }

        self.tslApplication = {
            personalForm: {}
        };

        self.LoadLocalData = function () {
            if (localStorage.TSLApplication) {
                if(localStorage.TSLApplication.PersonalForm.firstName)
                {
                    self.tslApplication.personalForm.firstName = sjcl.decrypt("password", localStorage.TSLApplication.PersonalForm.firstName);
                }
            }
        };

        self.gotoPrevious = function () {
            $location.url(GeneralRepo.getPreviousPage($location.path()));
        };

        self.gotoNext = function () {
            if (($scope.personalForm.$valid && (self.tslApplication.personalForm.ssn === self.tslApplication.personalForm.ssn2)) || ($scope.personalForm.$valid && !applicationData.Intro.isDriver)) {
                GeneralRepo.addApplicationData(self.tslApplication);
                $location.url(GeneralRepo.getNextPage($location.path()));
            }
            else {
                $scope.$apply();
            }
        };

        $scope.$watch(angular.bind(this, function () {
            return this.tslApplication.personalForm;
        }), function (newVal) {
            if (newVal.firstName) {
                localStorage.TSLApplication.PersonalForm.firstName = sjcl.encrypt("password", newVal.firstName)
            }

        }, true); //true is for multi-level deep-watch fairly CPU expensive, make sure this doesn't get carried away.


        initialize();


        

        function initialize() {
            //This line is for debugging

            // localStorage.$reset();

            self.tslApplication = {
                personalForm: {}
            };

            if (localStorage.TSLApplication) {
                //Personal Persistance
                self.LoadLocalData();
            }
            else {
                localStorage.TSLApplication = {};
            }
        };


    }
})();
