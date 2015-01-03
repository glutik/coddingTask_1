angular.module('diagram', [])
    .controller('diagramCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.data = [];
        $http.get('data.json').then(function (resp) {
            for (var key in resp.data.names) {
                $scope.data.push({
                    name: key,
                    label: resp.data.names[key],
                    top: resp.data.positions[key].top,
                    left: resp.data.positions[key].left,
                    transitions: resp.data.transitions[key].split(',')
                })
            }
            $scope.container = resp.data.container;
        })

        function connectDiagramBlocks() {
            for (var i in $scope.data) {
                var transitions = $scope.data[i].transitions;
                for (var j in transitions) {
                    jsPlumb.connect({
                        source: $scope.data[i].name,
                        target: transitions[j],
                        connector: ["StateMachine", {curviness: 10, margin: 5}],
                        anchor: "Continuous",
                        endpoint: "Blank",
                        paintStyle: {strokeStyle: "#bbb", lineWidth: 1},
                        overlays: [
                            ["Arrow", {width: 18, length: 12, foldback: 0.8, location: 1}]
                        ]
                    })
                }
            }
        }

        $scope.$on('ngRepeatFinished', connectDiagramBlocks);
    }])
    .directive('diagramBlock', function () {
        return {
            restrict: 'E',
            scope: {
                block: '='
            },
            template: '<div class="diagramBlock" id="{{block.name}}" ng-style="{top: block.top+\'px\', left: block.left+\'px\'}">{{block.label}}</div>'
        }
    })
    .directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }
    });