"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = __importDefault(require("ramda"));
const check_1 = __importDefault(require("./check"));
class InputError extends Error {
    constructor(field, type, message) {
        super(message);
        this.error = type;
        this.field = field;
        this.status = 422;
    }
}
class RequiredError extends InputError {
    constructor(field) {
        super(field, 'RequiredError', `${field} is required`);
    }
}
class TypeError extends InputError {
    constructor(field) {
        super(field, 'TypeError', `type not matched: ${field}`);
    }
}
class PatternError extends InputError {
    constructor(field) {
        super(field, 'PatternError', `pattern not matched: ${field}`);
    }
}
function default_1(rawInput, expect) {
    // make it pure
    const input = ramda_1.default.clone(rawInput);
    Object.keys(expect).forEach((key) => {
        if (expect[key] === undefined) {
            delete input[key]; // remove unexpected key/vals.
            return;
        }
        // if this key is required but not in input.
        if (!check_1.default.required(input[key], expect[key]).is) {
            throw new RequiredError(key);
        }
        // if this key has default value
        const defaultVal = check_1.default.default(input[key], expect[key]).val;
        // only set default value when it is not undefined
        // avoid side effect of undefined default value
        if (defaultVal !== undefined) {
            input[key] = defaultVal;
        }
        if (input[key] === undefined)
            return;
        if (!check_1.default.pattern(input[key], expect[key]).is) {
            throw new PatternError(key);
        }
        const { is, val } = check_1.default.checkType(input[key], expect[key]);
        if (!is)
            throw new TypeError(key);
        input[key] = val;
    });
    return input;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdmFsaWRhdGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBc0I7QUFDdEIsb0RBQThCO0FBRzlCLGdCQUFpQixTQUFRLEtBQUs7SUFLNUIsWUFBWSxLQUFhLEVBQUUsSUFBWSxFQUFFLE9BQWU7UUFDdEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUNGO0FBRUQsbUJBQW9CLFNBQVEsVUFBVTtJQUNwQyxZQUFZLEtBQWE7UUFDdkIsS0FBSyxDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUUsR0FBRyxLQUFLLGNBQWMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDRjtBQUVELGVBQWdCLFNBQVEsVUFBVTtJQUNoQyxZQUFZLEtBQWE7UUFDdkIsS0FBSyxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUscUJBQXFCLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztDQUNGO0FBRUQsa0JBQW1CLFNBQVEsVUFBVTtJQUNuQyxZQUFZLEtBQWE7UUFDdkIsS0FBSyxDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsd0JBQXdCLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztDQUNGO0FBUUQsbUJBQXlCLFFBQWUsRUFBRSxNQUFvQjtJQUM1RCxlQUFlO0lBQ2YsTUFBTSxLQUFLLEdBQUcsZUFBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVoQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ2xDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUM3QixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtZQUNqRCxPQUFPO1NBQ1I7UUFFRCw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLGVBQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNqRCxNQUFNLElBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzlCO1FBRUQsZ0NBQWdDO1FBQ2hDLE1BQU0sVUFBVSxHQUFHLGVBQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUVoRSxrREFBa0Q7UUFDbEQsK0NBQStDO1FBQy9DLElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUM1QixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUztZQUFFLE9BQU87UUFFckMsSUFBSSxDQUFDLGVBQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNoRCxNQUFNLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzdCO1FBRUQsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxlQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUvRCxJQUFJLENBQUMsRUFBRTtZQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQXJDRCw0QkFxQ0MifQ==