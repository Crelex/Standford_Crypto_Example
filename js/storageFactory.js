(function(){
    angular.module('app').factory('cryptLib', function(){return window.sjcl;});

})();


(function(){

    angular.module('app').factory('storageFactory', storageFactory);

    storageFactory.$inject = ['$localStorage', 'cryptLib'];


    function storageFactory(localStorage, cryptLib){

        return {
            store: storeData,
            retrive: retiveData
        };
        function storeData(key, obj)
        {
            var val = cryptLib.encrypt("password", obj);
            localStorage[key] = val;
        }

        function retiveData(key)
        {
            //Add what ever sanity checks you need
            var encryptedVal = localStorage[key];
            if(encryptedVal === undefined)
            {
                return null;
            }
            var decryptedVal = cryptLib.decrypt("password", encryptedVal);
            return decryptedVal;
        }

    }


})();
