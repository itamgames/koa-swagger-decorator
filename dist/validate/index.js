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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdmFsaWRhdGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBc0I7QUFDdEIsb0RBQThCO0FBRzlCLE1BQU0sVUFBVyxTQUFRLEtBQUs7SUFLNUIsWUFBWSxLQUFhLEVBQUUsSUFBWSxFQUFFLE9BQWU7UUFDdEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUNGO0FBRUQsTUFBTSxhQUFjLFNBQVEsVUFBVTtJQUNwQyxZQUFZLEtBQWE7UUFDdkIsS0FBSyxDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUUsR0FBRyxLQUFLLGNBQWMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDRjtBQUVELE1BQU0sU0FBVSxTQUFRLFVBQVU7SUFDaEMsWUFBWSxLQUFhO1FBQ3ZCLEtBQUssQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FDRjtBQUVELE1BQU0sWUFBYSxTQUFRLFVBQVU7SUFDbkMsWUFBWSxLQUFhO1FBQ3ZCLEtBQUssQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLHdCQUF3QixLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Q0FDRjtBQVFELG1CQUF5QixRQUFlLEVBQUUsTUFBb0I7SUFDNUQsZUFBZTtJQUNmLE1BQU0sS0FBSyxHQUFHLGVBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNsQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDN0IsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw4QkFBOEI7WUFDakQsT0FBTztTQUNSO1FBRUQsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxlQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDakQsTUFBTSxJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM5QjtRQUVELGdDQUFnQztRQUNoQyxNQUFNLFVBQVUsR0FBRyxlQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFFaEUsa0RBQWtEO1FBQ2xELCtDQUErQztRQUMvQyxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDNUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztTQUN6QjtRQUVELElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVM7WUFBRSxPQUFPO1FBRXJDLElBQUksQ0FBQyxlQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDaEQsTUFBTSxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM3QjtRQUVELE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsZUFBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFL0QsSUFBSSxDQUFDLEVBQUU7WUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFyQ0QsNEJBcUNDIn0=