angular.module('home', [])
  .controller('HomeController', ['$firebaseArray', '$mdDialog', HomeController]);

  function HomeController ($firebaseArray, $mdDialog) {
    _self = this;
    // Firebase Connection
    var ref = new Firebase('https://masterfollowup.firebaseio.com/orders');
    this.orders = $firebaseArray(ref);
    // Select Order
    _self.selectOrder = function(order) {
        _self.selectedOrder = order;
    };
    // Delete Order
    _self.deleteOrder = function(ev) {
        var confirm = $mdDialog.confirm()
            .title('Confirmation')
            .content('Would you like to delete order?')
            .ariaLabel('Delete Order')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');
        $mdDialog.show(confirm).then(function() {
            _self.orders.$remove(_self.selectedOrder);
        }, function() {
            console.log('Delete Order Dialog Cancelled');
        });
    };

    // New Order
    _self.showNewOrder = function(ev) {
        $mdDialog.show({
                controller: newOrderCtrl,
                templateUrl: 'newOrder.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
            .then(function(newOrder) {
                _self.orders.$add(newOrder);

            }, function() {
                console.log('New Order Dialog Cancelled');
            });
    };

    function newOrderCtrl($scope, $mdDialog) {
        $scope.newOrder = {};
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.add = function(newOrder) {
            $mdDialog.hide(newOrder);
        };
    }
    // Edit Order
    _self.showEditOrder = function(ev) {
        $mdDialog.show({
                controller: editOrderCtrl,
                templateUrl: 'editOrder.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    order: _self.selectedOrder
                }
            })
            .then(function(editOrder) {
                _self.orders.$save(editOrder);
            }, function() {
                console.log('Edit Order Dialog Cancelled');
            });
    };

    function editOrderCtrl($scope, $mdDialog, order) {
        $scope.editOrder = order;
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.save = function() {
            $mdDialog.hide($scope.editOrder);
        };
        $scope.remove = function() {
            $mdDialog.hide('remove', $scope.editOrder);
        };
	}	
  }