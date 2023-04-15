"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const categoryRouter_1 = __importDefault(require("./router/categoryRouter"));
const productRouter_1 = __importDefault(require("./router/productRouter"));
const attributeRouter_1 = __importDefault(require("./router/attributeRouter"));
const errorController_1 = __importDefault(require("./controller/errorController"));
const appError_1 = __importDefault(require("./util/appError"));
const config_1 = require("./util/config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
if (config_1.NODE_ENV === "development") {
    app.use((0, morgan_1.default)(':date[clf] ":method :url"'));
}
app.get("/", (req, res) => {
    res.status(200).json({ message: "Success" });
});
app.use("/api/v1/categories", categoryRouter_1.default);
app.use("/api/v1/attributes", attributeRouter_1.default);
app.use("/api/v1/products", productRouter_1.default);
app.all("*", (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(errorController_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map