angular.module('mfuApp', ['ngMaterial', 'firebase'])
	.controller('mfuCtrl', ['$scope', '$firebaseArray', '$mdDialog',
		function($scope, $firebaseArray, $mdDialog) {
			// Firebase Connection
			var ref = new Firebase('https://masterfollowup.firebaseio.com/orders');
			$scope.orders = $firebaseArray(ref);
			// Select Order
			$scope.selectOrder = function(order) {
				$scope.selectedOrder = order;
			};
			// Delete Order
			$scope.deleteOrder = function(order) {
		      	$scope.orders.$remove(order);
			}
			// New Order
			$scope.showNewOrder = function(ev) {
			    $mdDialog.show({
			      controller: newOrderCtrl,
			      templateUrl: 'newOrder.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true
			    })
			    .then(function(newOrder) {
			      	$scope.orders.$add(newOrder);

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
			$scope.showEditOrder = function(ev) {
			    $mdDialog.show({
			      controller: editOrderCtrl,
			      templateUrl: 'editOrder.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      locals: {
			      	order: $scope.selectedOrder
			      }
			    })
			    .then(function(editOrder) {
		    		$scope.orders.$save(editOrder);
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
	}]);

/*
angular.module('mfuApp', ['ngMaterial', 'firebase'])
	.controller('mfuCtrl', ['$scope', '$firebaseObject', 
		function($scope, $firebaseObject) {
			var ref = new Firebase('https://masterfollowup.firebaseio.com');
			var syncObject = $firebaseObject(ref);
			syncObject.$bindTo($scope, "orders");
	
			// var orderRef = ref.child('orders');
			// var newOrderRef = orderRef.push();
			// newOrderRef.set(
			// 		{
			// 			'sc': 'MFT-0056-2015',
			// 		 	'cus': 'asd',
			// 		  	'cpo': '6426'
			// 		}	
			// 	);
	
			// ref.set({
			// 	'sc': 'MFT-0050-2015',
		 	//	'cus': 'qwe',
			// 	'cpo': '6420'
			// });

			// $scope.orders = [];
			// $scope.orders.push({'sc': 'MFT-0050-2015', 'cus': 'qwe', 'cpo': '6420'});
			// $scope.orders.push({'sc': 'MFT-0051-2015', 'cus': 'asd', 'cpo': '6421'});
			// $scope.orders.push({'sc': 'MFT-0052-2015', 'cus': 'zxc', 'cpo': '6422'});
			// $scope.orders.push({'sc': 'MFT-0053-2015', 'cus': 'qwe', 'cpo': '6423'});
			// $scope.orders.push({'sc': 'MFT-0054-2015', 'cus': 'asd', 'cpo': '6424'});
			// $scope.orders.push({'sc': 'MFT-0055-2015', 'cus': 'zxc', 'cpo': '6425'});
			// $scope.orders.push({'sc': 'MFT-0056-2015', 'cus': 'asd', 'cpo': '6426'});
	}]);
*/