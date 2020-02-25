"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = __importDefault(require("ramda"));
const check_1 = __importDefault(require("./check"));
class InputError extends Error {
    constructor(field, message) {
        super(message);
        this.field = field;
        this.status = 400;
    }
}
class RequiredError extends InputError {
    constructor(field) {
        super(field, `${field} is required`);
    }
}
class TypeError extends InputError {
    constructor(field) {
        super(field, `type not matched: ${field}`);
    }
}
class PatternError extends InputError {
    constructor(field) {
        super(field, `pattern not matched: ${field}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdmFsaWRhdGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBc0I7QUFDdEIsb0RBQThCO0FBRzlCLGdCQUFpQixTQUFRLEtBQUs7SUFHNUIsWUFBWSxLQUFhLEVBQUUsT0FBZTtRQUN4QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7QUFFRCxtQkFBb0IsU0FBUSxVQUFVO0lBQ3BDLFlBQVksS0FBYTtRQUN2QixLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsS0FBSyxjQUFjLENBQUMsQ0FBQztJQUN2QyxDQUFDO0NBQ0Y7QUFFRCxlQUFnQixTQUFRLFVBQVU7SUFDaEMsWUFBWSxLQUFhO1FBQ3ZCLEtBQUssQ0FBQyxLQUFLLEVBQUUscUJBQXFCLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGO0FBRUQsa0JBQW1CLFNBQVEsVUFBVTtJQUNuQyxZQUFZLEtBQWE7UUFDdkIsS0FBSyxDQUFDLEtBQUssRUFBRSx3QkFBd0IsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0Y7QUFRRCxtQkFBeUIsUUFBZSxFQUFFLE1BQW9CO0lBQzVELGVBQWU7SUFDZixNQUFNLEtBQUssR0FBRyxlQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQzdCLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsOEJBQThCO1lBQ2pELE9BQU87U0FDUjtRQUVELDRDQUE0QztRQUM1QyxJQUFJLENBQUMsZUFBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2pELE1BQU0sSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUI7UUFFRCxnQ0FBZ0M7UUFDaEMsTUFBTSxVQUFVLEdBQUcsZUFBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRWhFLGtEQUFrRDtRQUNsRCwrQ0FBK0M7UUFDL0MsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQzVCLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7U0FDekI7UUFFRCxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTO1lBQUUsT0FBTztRQUVyQyxJQUFJLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2hELE1BQU0sSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDN0I7UUFFRCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLGVBQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRS9ELElBQUksQ0FBQyxFQUFFO1lBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVsQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBckNELDRCQXFDQyJ9