"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = require("react-dom/client");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var App = function App() {
  console.log("first");
  return /*#__PURE__*/_react["default"].createElement("div", null, "Hello World");
};
var container = document.getElementById("root");
(0, _client.createRoot)(container).render(/*#__PURE__*/_react["default"].createElement(App, null));