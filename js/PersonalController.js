(function () {
    'use strict';

    angular.module('app')
            .controller('PersonalController', PersonalController);

    PersonalController.$inject = ['$location', 'storageFactory', '$scope'];

    function PersonalController($location, storageFactory, $scope) {
        var self = this;

        if (localStorage.TSLApplication === undefined)
        {
            localStorage.TSLApplication = {};
        }

        self.tslApplication = {
            personalForm: {}
        };

        self.LoadLocalData = function () {
            self.tslApplication.personalForm.firstName = storageFactory.retrive('firstName');
            



            // if (localStorage.TSLApplication) {
            //     if(localStorage.TSLApplication.PersonalForm.firstName)
            //     {
            //         self.tslApplication.personalForm.firstName = sjcl.decrypt("password", localStorage.TSLApplication.PersonalForm.firstName);
            //     }
            // }
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
                storageFactory.store('firstName', newVal.firstName);
                

                //localStorage.TSLApplication.PersonalForm.firstName = sjcl.encrypt("password", newVal.firstName)
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
