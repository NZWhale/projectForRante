var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this._handlers = [];
    }
    EventEmitter.prototype.addChangeEventListener = function (handler) {
        this._handlers.push(handler);
    };
    EventEmitter.prototype.executeHandlers = function () {
        this._handlers.forEach(function (handler) {
            handler();
        });
    };
    return EventEmitter;
}());
export default EventEmitter;
