"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authDef = exports.authContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authDef = {
  isAuthenticated: false,
  token: null,
  userName: null,
  userId: null
};
exports.authDef = authDef;

var authContext = _react["default"].createContext(null);

exports.authContext = authContext;