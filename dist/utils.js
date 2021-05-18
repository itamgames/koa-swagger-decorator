"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerKeys = exports.allowedMethods = exports.reservedMethodNames = exports.loadSwaggerClasses = exports.loadClass = exports.getFilepaths = exports.getPath = exports.convertPath = void 0;
const path_1 = __importDefault(require("path"));
const globby_1 = __importDefault(require("globby"));
const is_type_of_1 = __importDefault(require("is-type-of"));
// eg. /api/{id} -> /api/:id
const convertPath = (path) => {
    const re = new RegExp('{(.*?)}', 'g');
    return path.replace(re, ':$1');
};
exports.convertPath = convertPath;
const getPath = (prefix, path) => `${prefix}${path}`.replace('//', '/');
exports.getPath = getPath;
const reservedMethodNames = [
    'middlewares',
    'name',
    'constructor',
    'length',
    'prototype',
    'parameters',
    'prefix',
];
exports.reservedMethodNames = reservedMethodNames;
var allowedMethods;
(function (allowedMethods) {
    allowedMethods["GET"] = "get";
    allowedMethods["POST"] = "post";
    allowedMethods["PUT"] = "put";
    allowedMethods["PATCH"] = "patch";
    allowedMethods["DELETE"] = "delete";
})(allowedMethods || (allowedMethods = {}));
exports.allowedMethods = allowedMethods;
const getFilepaths = (dir, recursive = true, ignore = []) => {
    const ignoreDirs = ignore.map((path => `!${path}`));
    const paths = recursive
        ? globby_1.default.sync(['**/*.js', '**/*.ts', ...ignoreDirs], { cwd: dir })
        : globby_1.default.sync(['*.js', '*.ts', ...ignoreDirs], { cwd: dir });
    return paths.map(path => path_1.default.join(dir, path));
};
exports.getFilepaths = getFilepaths;
const loadModule = (filepath) => {
    const obj = require(filepath);
    if (!obj)
        return obj;
    // it's es module
    if (obj.__esModule)
        return 'default' in obj ? obj.default : obj;
    return obj;
};
const loadClass = (filepath) => {
    const cls = loadModule(filepath);
    if (is_type_of_1.default.class(cls))
        return cls;
    return false;
};
exports.loadClass = loadClass;
const loadSwaggerClasses = (dir = '', options = {}) => {
    dir = path_1.default.resolve(dir);
    const { recursive = true } = options;
    return getFilepaths(dir, recursive, options.ignore)
        .map(filepath => loadClass(filepath))
        .filter(cls => cls);
};
exports.loadSwaggerClasses = loadSwaggerClasses;
const swaggerKeys = (className, methods) => methods.map(m => `${className}- ${m}`);
exports.swaggerKeys = swaggerKeys;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQXlCO0FBQ3pCLG9EQUE0QjtBQUM1Qiw0REFBNEI7QUFFNUIsNEJBQTRCO0FBQzVCLE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7SUFDbkMsTUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFDO0FBd0RBLGtDQUFXO0FBdERiLE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBYyxFQUFFLElBQVksRUFBRSxFQUFFLENBQy9DLEdBQUcsTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFzRHRDLDBCQUFPO0FBcERULE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsYUFBYTtJQUNiLE1BQU07SUFDTixhQUFhO0lBQ2IsUUFBUTtJQUNSLFdBQVc7SUFDWCxZQUFZO0lBQ1osUUFBUTtDQUNULENBQUM7QUFnREEsa0RBQW1CO0FBOUNyQixJQUFLLGNBTUo7QUFORCxXQUFLLGNBQWM7SUFDakIsNkJBQVUsQ0FBQTtJQUNWLCtCQUFZLENBQUE7SUFDWiw2QkFBVSxDQUFBO0lBQ1YsaUNBQWMsQ0FBQTtJQUNkLG1DQUFnQixDQUFBO0FBQ2xCLENBQUMsRUFOSSxjQUFjLEtBQWQsY0FBYyxRQU1sQjtBQXlDQyx3Q0FBYztBQXZDaEIsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFXLEVBQUUsWUFBcUIsSUFBSSxFQUFFLFNBQW1CLEVBQUUsRUFBRSxFQUFFO0lBQ3JGLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sS0FBSyxHQUFHLFNBQVM7UUFDckIsQ0FBQyxDQUFDLGdCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxnQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxVQUFVLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbEQsQ0FBQyxDQUFDO0FBNkJBLG9DQUFZO0FBM0JkLE1BQU0sVUFBVSxHQUFHLENBQUMsUUFBZ0IsRUFBRSxFQUFFO0lBQ3RDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUMsR0FBRztRQUFFLE9BQU8sR0FBRyxDQUFDO0lBQ3JCLGlCQUFpQjtJQUNqQixJQUFJLEdBQUcsQ0FBQyxVQUFVO1FBQUUsT0FBTyxTQUFTLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDaEUsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDLENBQUM7QUFFRixNQUFNLFNBQVMsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtJQUNyQyxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsSUFBSSxvQkFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFBRSxPQUFPLEdBQUcsQ0FBQztJQUM5QixPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQztBQWdCQSw4QkFBUztBQWRYLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxNQUFjLEVBQUUsRUFBRSxVQUFvRCxFQUFFLEVBQUUsRUFBRTtJQUN0RyxHQUFHLEdBQUcsY0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixNQUFNLEVBQUUsU0FBUyxHQUFHLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUNyQyxPQUFPLFlBQVksQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDaEQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQVNBLGdEQUFrQjtBQVBwQixNQUFNLFdBQVcsR0FBRyxDQUFDLFNBQWlCLEVBQUUsT0FBaUIsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7QUFVbkcsa0NBQVcifQ==