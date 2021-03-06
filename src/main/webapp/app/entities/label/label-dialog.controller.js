(function() {
    'use strict';

    angular
        .module('sampleElasticSearchApp')
        .controller('LabelDialogController', LabelDialogController);

    LabelDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Label', 'Operation'];

    function LabelDialogController ($scope, $stateParams, $uibModalInstance, entity, Label, Operation) {
        var vm = this;
        vm.label = entity;
        vm.operations = Operation.query();
        vm.load = function(id) {
            Label.get({id : id}, function(result) {
                vm.label = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('sampleElasticSearchApp:labelUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.label.id !== null) {
                Label.update(vm.label, onSaveSuccess, onSaveError);
            } else {
                Label.save(vm.label, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
