"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionBase = void 0;
var PermissionBase = /** @class */ (function () {
    function PermissionBase(el) {
        this.el = el;
    }
    PermissionBase.prototype.checkPermission = function () {
        var _this = this;
        var permissions = JSON.parse(localStorage.getItem("userDetail")).Permissions;
        if (permissions && permissions.length > 0) {
            var currentPermission = permissions.find(function (x) { return x.IdHtml === _this.getPermissionValue(); });
            if (currentPermission && !currentPermission.StatGrant && currentPermission.StatHide) {
                this.el.nativeElement.style.display = "none";
            }
            else if (currentPermission && !currentPermission.StatGrant && currentPermission.StatRead) {
                this.el.nativeElement.disabled = true;
                var childNodes = this.el.nativeElement.childNodes;
                for (var _i = 0, childNodes_1 = childNodes; _i < childNodes_1.length; _i++) {
                    var node = childNodes_1[_i];
                    node.disabled = true;
                }
            }
        }
    };
    PermissionBase.prototype.ngOnChanges = function () {
        this.checkPermission();
    };
    return PermissionBase;
}());
exports.PermissionBase = PermissionBase;
//# sourceMappingURL=PermissionBase.js.map