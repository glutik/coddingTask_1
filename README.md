# libs that were used:
- angular, for modelling and visualizing blocks of diagram
- jsPlumb, for drawing arrows according the mockup

# choosing the drawing lib considerations
There are several libs that allow flowcharts representation, like jsPlumb, draw2d, gojs, JointJS and other. Most of them are very heavy and have a lot of unnecessary features for this task. I found jsPlumb and gojs most appropriate for the task, and since jsPlumb is x5 lighter and has more simple API I chose it for drawing.

# issues
- In order to connect the blocks of diagram jsPlumb needs to wait for final DOM structure. ngRepeat doesn't supply any kind of "ngRepeatEnded" event, so I used a solution found on stackoverflow:
http://stackoverflow.com/questions/15207788/calling-a-function-when-ng-repeat-has-finished
- IE sucks. Like always =)