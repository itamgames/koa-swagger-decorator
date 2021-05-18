"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerProperty = exports.swaggerClass = exports.PropertyOptions = void 0;
/**
 *
 */
class PropertyOptions {
    constructor() {
        /**
         *
         */
        this.type = null;
        /**
         *
         */
        this.required = null;
        /**
         *
         */
        this.example = null;
        /**
         *
         */
        this.description = null;
        /**
         *
         */
        this.items = null;
    }
}
exports.PropertyOptions = PropertyOptions;
/**
 *
 * @param source
 */
function deepClone(source) {
    if (!source || typeof source !== 'object') {
        return null;
    }
    var targetObj = source.constructor === Array ? [] : {};
    for (var keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = deepClone(source[keys]);
            }
            else {
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
}
/**
 * Made for empty class
 * @param constructor
 */
function swaggerClass(constructor) {
    return function (target, propertyKey, descriptor) {
        if (target.swaggerDocument == undefined)
            target.swaggerDocument = {};
        if (target.swaggerClass == undefined)
            target.swaggerClass = target;
        if (target.swaggerClass != target) {
            target.swaggerClass = target;
            target.swaggerDocument = deepClone(target.swaggerDocument);
        }
    };
}
exports.swaggerClass = swaggerClass;
;
/**
 *
 * @param type
 * @param options
 */
function swaggerProperty(options) {
    return function (target, propertyKey, descriptor) {
        if (target.constructor.swaggerDocument == undefined)
            target.constructor.swaggerDocument = {};
        if (target.constructor.swaggerClass == undefined)
            target.constructor.swaggerClass = target.constructor;
        if (target.constructor.swaggerClass != target.constructor) {
            target.constructor.swaggerClass = target.constructor;
            target.constructor.swaggerDocument = deepClone(target.constructor.swaggerDocument);
        }
        target.constructor.swaggerDocument[propertyKey] = options;
    };
}
exports.swaggerProperty = swaggerProperty;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlclByb3BlcnR5SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3N3YWdnZXJQcm9wZXJ0eUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQTs7R0FFRztBQUNILE1BQWEsZUFBZTtJQUE1QjtRQUNJOztXQUVHO1FBQ0gsU0FBSSxHQUFpQixJQUFJLENBQUM7UUFDMUI7O1dBRUc7UUFDSCxhQUFRLEdBQWEsSUFBSSxDQUFDO1FBQzFCOztXQUVHO1FBQ0gsWUFBTyxHQUFTLElBQUksQ0FBQztRQUNyQjs7V0FFRztRQUNILGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCOztXQUVHO1FBQ0gsVUFBSyxHQUFxQixJQUFJLENBQUM7SUFLbkMsQ0FBQztDQUFBO0FBekJELDBDQXlCQztBQUVEOzs7R0FHRztBQUNILFNBQVMsU0FBUyxDQUFDLE1BQVU7SUFDekIsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDdkMsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELElBQUksU0FBUyxHQUFPLE1BQU0sQ0FBQyxXQUFXLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMzRCxLQUFLLElBQUksSUFBSSxJQUFJLE1BQU0sRUFBRTtRQUNyQixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUNsRCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUMvRCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzdDO2lCQUFNO2dCQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEM7U0FDSjtLQUNKO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLFlBQVksQ0FBQyxXQUFzQjtJQUMvQyxPQUFPLFVBQVUsTUFBVyxFQUFFLFdBQW1CLEVBQUUsVUFBOEI7UUFDN0UsSUFBSSxNQUFNLENBQUMsZUFBZSxJQUFJLFNBQVM7WUFBRSxNQUFNLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyRSxJQUFJLE1BQU0sQ0FBQyxZQUFZLElBQUksU0FBUztZQUFFLE1BQU0sQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1FBQ25FLElBQUksTUFBTSxDQUFDLFlBQVksSUFBSSxNQUFNLEVBQUU7WUFDL0IsTUFBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7WUFDN0IsTUFBTSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQzlEO0lBQ0wsQ0FBQyxDQUFBO0FBQ0wsQ0FBQztBQVRELG9DQVNDO0FBQUEsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxTQUFnQixlQUFlLENBQUMsT0FBeUI7SUFDckQsT0FBTyxVQUFVLE1BQVcsRUFBRSxXQUFtQixFQUFFLFVBQThCO1FBQzdFLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLElBQUksU0FBUztZQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUM3RixJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxJQUFJLFNBQVM7WUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3ZHLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTtZQUN2RCxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxXQUFXLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ3RGO1FBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQzlELENBQUMsQ0FBQTtBQUNMLENBQUM7QUFWRCwwQ0FVQztBQUFBLENBQUMifQ==