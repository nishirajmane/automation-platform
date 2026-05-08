"use strict";
// ──────────────────────────────────────────────
// Tenant
// ──────────────────────────────────────────────
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStatus = exports.PricingModel = exports.UserRole = void 0;
// ──────────────────────────────────────────────
// User
// ──────────────────────────────────────────────
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["CREATOR"] = "CREATOR";
    UserRole["VIEWER"] = "VIEWER";
})(UserRole || (exports.UserRole = UserRole = {}));
// ──────────────────────────────────────────────
// Product (Bot / Automation listing)
// ──────────────────────────────────────────────
var PricingModel;
(function (PricingModel) {
    PricingModel["FREE"] = "FREE";
    PricingModel["ONE_TIME"] = "ONE_TIME";
    PricingModel["SUBSCRIPTION"] = "SUBSCRIPTION";
    PricingModel["USAGE_BASED"] = "USAGE_BASED";
})(PricingModel || (exports.PricingModel = PricingModel = {}));
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["DRAFT"] = "DRAFT";
    ProductStatus["PUBLISHED"] = "PUBLISHED";
    ProductStatus["ARCHIVED"] = "ARCHIVED";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
//# sourceMappingURL=index.js.map