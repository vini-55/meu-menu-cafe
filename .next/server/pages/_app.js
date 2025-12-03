/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./context/CartContext.tsx":
/*!*********************************!*\
  !*** ./context/CartContext.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CartProvider: () => (/* binding */ CartProvider),\n/* harmony export */   useCart: () => (/* binding */ useCart)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst CartContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});\nfunction CartProvider({ children }) {\n    const [cart, setCart] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    // Adicionar item (se já existe, aumenta a quantidade)\n    const addToCart = (newItem)=>{\n        setCart((prev)=>{\n            const existing = prev.find((i)=>i.id === newItem.id);\n            if (existing) {\n                return prev.map((i)=>i.id === newItem.id ? {\n                        ...i,\n                        quantity: i.quantity + 1\n                    } : i);\n            }\n            return [\n                ...prev,\n                {\n                    ...newItem,\n                    quantity: 1\n                }\n            ];\n        });\n    };\n    // Remover item (diminui quantidade ou remove se for 0)\n    const removeFromCart = (id)=>{\n        setCart((prev)=>{\n            return prev.map((i)=>i.id === id ? {\n                    ...i,\n                    quantity: i.quantity - 1\n                } : i).filter((i)=>i.quantity > 0);\n        });\n    };\n    // Cálculos automáticos\n    const totalItems = cart.reduce((acc, item)=>acc + item.quantity, 0);\n    const totalPrice = cart.reduce((acc, item)=>acc + item.price * item.quantity, 0);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(CartContext.Provider, {\n        value: {\n            cart,\n            addToCart,\n            removeFromCart,\n            totalPrice,\n            totalItems\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\User\\\\Desktop\\\\Folder\\\\meu-menu-cafe\\\\context\\\\CartContext.tsx\",\n        lineNumber: 51,\n        columnNumber: 5\n    }, this);\n}\n// Hook para usar o carrinho em qualquer lugar\nconst useCart = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(CartContext);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0L0NhcnRDb250ZXh0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXVFO0FBa0J2RSxNQUFNRyw0QkFBY0gsb0RBQWFBLENBQWtCLENBQUM7QUFFN0MsU0FBU0ksYUFBYSxFQUFFQyxRQUFRLEVBQTJCO0lBQ2hFLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHTCwrQ0FBUUEsQ0FBYSxFQUFFO0lBRS9DLHNEQUFzRDtJQUN0RCxNQUFNTSxZQUFZLENBQUNDO1FBQ2pCRixRQUFRLENBQUNHO1lBQ1AsTUFBTUMsV0FBV0QsS0FBS0UsSUFBSSxDQUFDLENBQUNDLElBQU1BLEVBQUVDLEVBQUUsS0FBS0wsUUFBUUssRUFBRTtZQUNyRCxJQUFJSCxVQUFVO2dCQUNaLE9BQU9ELEtBQUtLLEdBQUcsQ0FBQyxDQUFDRixJQUNmQSxFQUFFQyxFQUFFLEtBQUtMLFFBQVFLLEVBQUUsR0FBRzt3QkFBRSxHQUFHRCxDQUFDO3dCQUFFRyxVQUFVSCxFQUFFRyxRQUFRLEdBQUc7b0JBQUUsSUFBSUg7WUFFL0Q7WUFDQSxPQUFPO21CQUFJSDtnQkFBTTtvQkFBRSxHQUFHRCxPQUFPO29CQUFFTyxVQUFVO2dCQUFFO2FBQUU7UUFDL0M7SUFDRjtJQUVBLHVEQUF1RDtJQUN2RCxNQUFNQyxpQkFBaUIsQ0FBQ0g7UUFDdEJQLFFBQVEsQ0FBQ0c7WUFDUCxPQUFPQSxLQUNKSyxHQUFHLENBQUMsQ0FBQ0YsSUFBT0EsRUFBRUMsRUFBRSxLQUFLQSxLQUFLO29CQUFFLEdBQUdELENBQUM7b0JBQUVHLFVBQVVILEVBQUVHLFFBQVEsR0FBRztnQkFBRSxJQUFJSCxHQUMvREssTUFBTSxDQUFDLENBQUNMLElBQU1BLEVBQUVHLFFBQVEsR0FBRztRQUNoQztJQUNGO0lBRUEsdUJBQXVCO0lBQ3ZCLE1BQU1HLGFBQWFiLEtBQUtjLE1BQU0sQ0FBQyxDQUFDQyxLQUFLQyxPQUFTRCxNQUFNQyxLQUFLTixRQUFRLEVBQUU7SUFDbkUsTUFBTU8sYUFBYWpCLEtBQUtjLE1BQU0sQ0FBQyxDQUFDQyxLQUFLQyxPQUFTRCxNQUFNQyxLQUFLRSxLQUFLLEdBQUdGLEtBQUtOLFFBQVEsRUFBRTtJQUVoRixxQkFDRSw4REFBQ2IsWUFBWXNCLFFBQVE7UUFBQ0MsT0FBTztZQUFFcEI7WUFBTUU7WUFBV1M7WUFBZ0JNO1lBQVlKO1FBQVc7a0JBQ3BGZDs7Ozs7O0FBR1A7QUFFQSw4Q0FBOEM7QUFDdkMsTUFBTXNCLFVBQVUsSUFBTTFCLGlEQUFVQSxDQUFDRSxhQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWV1LW1lbnUtY2FmZS8uL2NvbnRleHQvQ2FydENvbnRleHQudHN4P2MzMjEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlU3RhdGUsIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcclxuXHJcbi8vIFRpcG9zXHJcbnR5cGUgQ2FydEl0ZW0gPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgcHJpY2U6IG51bWJlcjtcclxuICBxdWFudGl0eTogbnVtYmVyOyAvLyBRdWFudGlkYWRlIGRlc3RlIGl0ZW1cclxufTtcclxuXHJcbnR5cGUgQ2FydENvbnRleHRUeXBlID0ge1xyXG4gIGNhcnQ6IENhcnRJdGVtW107XHJcbiAgYWRkVG9DYXJ0OiAoaXRlbTogQ2FydEl0ZW0pID0+IHZvaWQ7XHJcbiAgcmVtb3ZlRnJvbUNhcnQ6IChpZDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHRvdGFsUHJpY2U6IG51bWJlcjtcclxuICB0b3RhbEl0ZW1zOiBudW1iZXI7XHJcbn07XHJcblxyXG5jb25zdCBDYXJ0Q29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8Q2FydENvbnRleHRUeXBlPih7fSBhcyBDYXJ0Q29udGV4dFR5cGUpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIENhcnRQcm92aWRlcih7IGNoaWxkcmVuIH06IHsgY2hpbGRyZW46IFJlYWN0Tm9kZSB9KSB7XHJcbiAgY29uc3QgW2NhcnQsIHNldENhcnRdID0gdXNlU3RhdGU8Q2FydEl0ZW1bXT4oW10pO1xyXG5cclxuICAvLyBBZGljaW9uYXIgaXRlbSAoc2UgasOhIGV4aXN0ZSwgYXVtZW50YSBhIHF1YW50aWRhZGUpXHJcbiAgY29uc3QgYWRkVG9DYXJ0ID0gKG5ld0l0ZW06IENhcnRJdGVtKSA9PiB7XHJcbiAgICBzZXRDYXJ0KChwcmV2KSA9PiB7XHJcbiAgICAgIGNvbnN0IGV4aXN0aW5nID0gcHJldi5maW5kKChpKSA9PiBpLmlkID09PSBuZXdJdGVtLmlkKTtcclxuICAgICAgaWYgKGV4aXN0aW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHByZXYubWFwKChpKSA9PlxyXG4gICAgICAgICAgaS5pZCA9PT0gbmV3SXRlbS5pZCA/IHsgLi4uaSwgcXVhbnRpdHk6IGkucXVhbnRpdHkgKyAxIH0gOiBpXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gWy4uLnByZXYsIHsgLi4ubmV3SXRlbSwgcXVhbnRpdHk6IDEgfV07XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvLyBSZW1vdmVyIGl0ZW0gKGRpbWludWkgcXVhbnRpZGFkZSBvdSByZW1vdmUgc2UgZm9yIDApXHJcbiAgY29uc3QgcmVtb3ZlRnJvbUNhcnQgPSAoaWQ6IHN0cmluZykgPT4ge1xyXG4gICAgc2V0Q2FydCgocHJldikgPT4ge1xyXG4gICAgICByZXR1cm4gcHJldlxyXG4gICAgICAgIC5tYXAoKGkpID0+IChpLmlkID09PSBpZCA/IHsgLi4uaSwgcXVhbnRpdHk6IGkucXVhbnRpdHkgLSAxIH0gOiBpKSlcclxuICAgICAgICAuZmlsdGVyKChpKSA9PiBpLnF1YW50aXR5ID4gMCk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvLyBDw6FsY3Vsb3MgYXV0b23DoXRpY29zXHJcbiAgY29uc3QgdG90YWxJdGVtcyA9IGNhcnQucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIGl0ZW0ucXVhbnRpdHksIDApO1xyXG4gIGNvbnN0IHRvdGFsUHJpY2UgPSBjYXJ0LnJlZHVjZSgoYWNjLCBpdGVtKSA9PiBhY2MgKyBpdGVtLnByaWNlICogaXRlbS5xdWFudGl0eSwgMCk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Q2FydENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgY2FydCwgYWRkVG9DYXJ0LCByZW1vdmVGcm9tQ2FydCwgdG90YWxQcmljZSwgdG90YWxJdGVtcyB9fT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9DYXJ0Q29udGV4dC5Qcm92aWRlcj5cclxuICApO1xyXG59XHJcblxyXG4vLyBIb29rIHBhcmEgdXNhciBvIGNhcnJpbmhvIGVtIHF1YWxxdWVyIGx1Z2FyXHJcbmV4cG9ydCBjb25zdCB1c2VDYXJ0ID0gKCkgPT4gdXNlQ29udGV4dChDYXJ0Q29udGV4dCk7Il0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlU3RhdGUiLCJDYXJ0Q29udGV4dCIsIkNhcnRQcm92aWRlciIsImNoaWxkcmVuIiwiY2FydCIsInNldENhcnQiLCJhZGRUb0NhcnQiLCJuZXdJdGVtIiwicHJldiIsImV4aXN0aW5nIiwiZmluZCIsImkiLCJpZCIsIm1hcCIsInF1YW50aXR5IiwicmVtb3ZlRnJvbUNhcnQiLCJmaWx0ZXIiLCJ0b3RhbEl0ZW1zIiwicmVkdWNlIiwiYWNjIiwiaXRlbSIsInRvdGFsUHJpY2UiLCJwcmljZSIsIlByb3ZpZGVyIiwidmFsdWUiLCJ1c2VDYXJ0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./context/CartContext.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _context_CartContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/CartContext */ \"./context/CartContext.tsx\");\n\n\n // Importe o Provider\nfunction App({ Component, pageProps }) {\n    return(// Envolvemos tudo com o CartProvider\n    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_CartContext__WEBPACK_IMPORTED_MODULE_2__.CartProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\User\\\\Desktop\\\\Folder\\\\meu-menu-cafe\\\\pages\\\\_app.tsx\",\n            lineNumber: 9,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\User\\\\Desktop\\\\Folder\\\\meu-menu-cafe\\\\pages\\\\_app.tsx\",\n        lineNumber: 8,\n        columnNumber: 5\n    }, this));\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQThCO0FBRXdCLENBQUMscUJBQXFCO0FBRTdELFNBQVNDLElBQUksRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQVk7SUFDNUQsT0FDRSxxQ0FBcUM7a0JBQ3JDLDhEQUFDSCw4REFBWUE7a0JBQ1gsNEVBQUNFO1lBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7QUFHOUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXUtbWVudS1jYWZlLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcydcclxuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJ1xyXG5pbXBvcnQgeyBDYXJ0UHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0L0NhcnRDb250ZXh0JzsgLy8gSW1wb3J0ZSBvIFByb3ZpZGVyXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xyXG4gIHJldHVybiAoXHJcbiAgICAvLyBFbnZvbHZlbW9zIHR1ZG8gY29tIG8gQ2FydFByb3ZpZGVyXHJcbiAgICA8Q2FydFByb3ZpZGVyPlxyXG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICA8L0NhcnRQcm92aWRlcj5cclxuICApO1xyXG59Il0sIm5hbWVzIjpbIkNhcnRQcm92aWRlciIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();