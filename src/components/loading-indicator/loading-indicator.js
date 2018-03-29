var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * Generated class for the LoadingIndicatorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var LoadingIndicatorComponent = (function () {
    function LoadingIndicatorComponent() {
        this.action = new EventEmitter();
    }
    LoadingIndicatorComponent.prototype.callAction = function () {
        this.action.next('clicked');
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LoadingIndicatorComponent.prototype, "loading", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LoadingIndicatorComponent.prototype, "loading_done", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LoadingIndicatorComponent.prototype, "loading_error", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LoadingIndicatorComponent.prototype, "error_message", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], LoadingIndicatorComponent.prototype, "action", void 0);
    LoadingIndicatorComponent = __decorate([
        Component({
            selector: 'loading-indicator',
            templateUrl: 'loading-indicator.html'
        }),
        __metadata("design:paramtypes", [])
    ], LoadingIndicatorComponent);
    return LoadingIndicatorComponent;
}());
export { LoadingIndicatorComponent };
//# sourceMappingURL=loading-indicator.js.map