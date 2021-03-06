# Flo

This project is an attempted solution to the Exabyte ReWoTe - [Flowchart Designer](https://github.com/Exabyte-io/rewotes/blob/master/Flowchart-Designer.md)
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Getting Started

### Installation
Make sure you have NodeJS and `npm` installed. Clone/download repo and run:
```
npm install
```
### Running tests
After installing all dependency modules, you can run tests using:
```
npm test
```
### Start environment
Run either `npm start` or `npm build` to start the dev or prod environments respectively.

## Project Structure
All components are located inside `src/components` and tests can be found alongside components.


### `App.js` component
This is the main component for the application and it holds the state for the entire application.

The elements of the state are as follows:

| Key           | Value           | Function  |
| ------------- |:-------------:| -----:|
| `windows`      | `Object` w/ keys [`library`, `json`, `console`, `node`] and Boolean values | Holds info about which windows should be displayed in the left pane |
| `graph`      | `Object`      |   Data structure representig the flowchart graph |
| `selected` | `Object`      |    Holds the currently selected node |
| `blockType` | `String` | Constant defined in graph-config that defines an empty block type|
|`nextEdgeId`| `Int` > 0, initial 0| Incrementing ID counter for graph edges |
|`nextNodeId`| `Int` > 0, initial 0| Same thing for nodes |
|`canEditNode`| `Bool` | Flag whether the currently selected node is editable/configurable |

#### Flowchart graph
The flowchart is represented using a directed graph as the underlying data structure as provided by [`react-digraph`](https://github.com/uber/react-digraph). The basic structure is:
```
graph = {
    nodes: [],
    edges: []
};
```
Node Schema:

| Key           | Value           | Function  |
| ------------- |:-------------:| -----:|
|`id`| `int` | unique ID for this node|
|`title`| `String` | Title to display |
|`type`| `String` | type as defined in [graph-config](https://github.com/martoio/exabyte-flo/blob/master/src/components/Flowchart/graph-config.js) |
|`x`| `float` | x-coordinate in d3.svg space |
|`y`| `float` | y-coordinate in d3.svg space |
|`outEdge`| `Int or null (initial)` | ID of outgoing edge |
|`inEdge`| `Int or null (initial)` | ID of incoming edge |
|`falseEdge`|`Int or null (initial)`| ID of outgoing False edge on a Decision block|

- **Restrictions**:
1. The first node created using drag & drop must be a Start block;
2. Start Blocks cannot have an incoming edge;
3. End Blocks cannot have an outgoing edge;
4. Decision Blocks are allowed to have 2 outgoing edges - for the True and False branches.

```
Example:
node = {
	id: 4
    title: 'Var-1',
    type: 'process',
    x: 0,
    y: 0,
    outEdge: 2
    inEdge: 3

}
```
Edge Schema:

| Key           | Value           | Function  |
| ------------- |:-------------:| -----:|
|`id`| `int` | unique ID for this node|
|`type`| `String` | type as defined in [graph-config](https://github.com/martoio/exabyte-flo/blob/master/src/components/Flowchart/graph-config.js) |
|`source`| `Int or null (initial)` | ID of source node |
|`target`| `Int or null (initial)` | ID of target node |


```
Example:
edge = {
	id: 2
    type: EMPTY_EDGE,
    source: 2
    target: 3

}
```
### `EditorController.js` component
Bottom bar in the left-hand pane. Controls the opening/closing of windows. All props are passed in through `App.js`.

| PropType           | Value           | Function  |
| ------------- |:-------------:| -----:|
|`onWindowToggle`| `func` | Function to call when a button is pressed. Toggles window visibility|
|`windows`| `Object values [true, true, false, false] default` | The windows object from `App.js` state |
|`canEditNode`| `Bool (false default)` | Whether the currently selected node is editable |

### `JSONWindow.js`
Implements [`react-json-view`](https://www.npmjs.com/package/react-json-view). Takes in an `isVisible` and the `graph` structure as props coming in from `App.js`.
### `LibraryWindow.js`
Implements elements from [`semantic-ui-react`](https://react.semantic-ui.com/introduction). Takes in an `isVisible` as props coming in from `App.js`. The `LibraryWindow` renders an accordion with the different blocks which it references from the graph-config file.
### `ConsoleWindow.js`
This is supposed to be the console/terminal that outputs results during flowchart execution.
### `NodeEditWindow.js`
This is supposed to be the window that edits the parameters of the flowchart blocks.
### `Graph.js`
Implements the [`react-digraph`](https://github.com/uber/react-digraph) component. PropType schema is defined in the documentation page for [`react-digraph`](https://github.com/uber/react-digraph) and the props are all passed in through `App.js`.



