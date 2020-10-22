var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import EventEmitter from './EventEmitter';
var LoginPageModel = /** @class */ (function (_super) {
    __extends(LoginPageModel, _super);
    function LoginPageModel() {
        var _this = _super.call(this) || this;
        _this._userIsLoggedIn = false;
        return _this;
    }
    LoginPageModel.prototype.setLoginStatus = function (userIsLoggedIn) {
        this._userIsLoggedIn = userIsLoggedIn;
        this.executeHandlers();
    };
    LoginPageModel.prototype.getLoginStatus = function () {
        return this._userIsLoggedIn;
    };
    return LoginPageModel;
}(EventEmitter));
export default LoginPageModel;
