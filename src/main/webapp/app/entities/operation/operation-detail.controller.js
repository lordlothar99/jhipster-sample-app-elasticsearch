(function() {
    'use strict';

    angular
        .module('sampleElasticSearchApp')
        .controller('OperationDetailController', OperationDetailController);

    OperationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Operation', 'BankAccount', 'Label'];

    function OperationDetailController($scope, $rootScope, $stateParams, entity, Operation, BankAccount, Label) {
        var vm = this;
        vm.operation = entity;
        vm.load = function (id) {
            Operation.get({id: id}, function(result) {
                vm.operation = result;
            });
        };
        var unsubscribe = $rootScope.$on('sampleElasticSearchApp:operationUpdate', function(event, result) {
            vm.operation = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
