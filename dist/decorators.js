"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefix = exports.queryAll = exports.deprecatedAll = exports.securityAll = exports.middlewaresAll = exports.responsesAll = exports.tagsAll = exports.deprecated = exports.responses = exports.formData = exports.security = exports.middlewares = exports.tags = exports.body = exports.path = exports.query = exports.header = exports.description = exports.desc = exports.params = exports.summary = exports.request = void 0;
const ramda_1 = __importDefault(require("ramda"));
const is_type_of_1 = __importDefault(require("is-type-of"));
const swaggerObject_1 = __importDefault(require("./swaggerObject"));
const _desc = (type, text) => (target, name, descriptor) => {
    descriptor.value[type] = text;
    swaggerObject_1.default.add(target, name, { [type]: text });
    return descriptor;
};
const _params = (type, parameters) => (target, name, descriptor) => {
    if (!descriptor.value.parameters)
        descriptor.value.parameters = {};
    descriptor.value.parameters[type] = parameters;
    // additional wrapper for body
    let swaggerParameters = parameters;
    if (type === "body") {
        swaggerParameters = [
            {
                name: "data",
                description: "request body",
                schema: {
                    type: "object",
                    properties: parameters
                }
            }
        ];
    }
    else {
        swaggerParameters = Object.keys(swaggerParameters).map(key => Object.assign({ name: key }, swaggerParameters[key]));
    }
    swaggerParameters.forEach((item) => {
        item.in = type;
    });
    swaggerObject_1.default.add(target, name, { [type]: swaggerParameters });
    return descriptor;
};
const request = (method, path) => (target, name, descriptor) => {
    method = ramda_1.default.toLower(method);
    descriptor.value.method = method;
    descriptor.value.path = path;
    swaggerObject_1.default.add(target, name, {
        request: { method, path },
        security: [{ ApiKeyAuth: [] }]
    });
    return descriptor;
};
exports.request = request;
const middlewares = (middlewares) => (target, name, descriptor) => {
    descriptor.value.middlewares = middlewares;
    return descriptor;
};
exports.middlewares = middlewares;
const security = (security) => (target, name, descriptor) => {
    swaggerObject_1.default.add(target, name, {
        security
    });
};
exports.security = security;
const deprecated = (target, name, descriptor) => {
    descriptor.value.deprecated = true;
    swaggerObject_1.default.add(target, name, { deprecated: true });
    return descriptor;
};
exports.deprecated = deprecated;
const defaultResp = {
    200: { description: "success" }
};
const responses = (responses = defaultResp) => (target, name, descriptor) => {
    descriptor.value.responses = responses;
    swaggerObject_1.default.add(target, name, { responses });
    return descriptor;
};
exports.responses = responses;
const desc = ramda_1.default.curry(_desc);
exports.desc = desc;
// description and summary
const description = desc("description");
exports.description = description;
const summary = desc("summary");
exports.summary = summary;
const tags = desc("tags");
exports.tags = tags;
const params = ramda_1.default.curry(_params);
exports.params = params;
// below are [parameters]
// header params
const header = params("header");
exports.header = header;
// query params
const query = params("query");
exports.query = query;
// path params
const path = params("path");
exports.path = path;
// body params
const body = params("body");
exports.body = body;
// formData params
const formData = params("formData");
exports.formData = formData;
// class decorators
const tagsAll = (items) => (target) => {
    const tags = is_type_of_1.default.array(items) ? items : [items];
    swaggerObject_1.default.addMulti(target, { tags });
};
exports.tagsAll = tagsAll;
const responsesAll = (responses = defaultResp) => (target) => {
    swaggerObject_1.default.addMulti(target, { responses });
};
exports.responsesAll = responsesAll;
const middlewaresAll = (items) => (target) => {
    const middlewares = is_type_of_1.default.array(items) ? items : [items];
    target.middlewares = middlewares;
};
exports.middlewaresAll = middlewaresAll;
const securityAll = (security) => (target) => {
    const authentitactions = is_type_of_1.default.array(security) ? security : [security];
    swaggerObject_1.default.addMulti(target, {
        security: authentitactions
    });
};
exports.securityAll = securityAll;
const deprecatedAll = (target) => {
    swaggerObject_1.default.addMulti(target, { deprecated: true });
};
exports.deprecatedAll = deprecatedAll;
const prefix = (prefix) => (target) => {
    swaggerObject_1.default.addMulti(target, { prefix });
    target.prefix = prefix;
};
exports.prefix = prefix;
const queryAll = (parameters, filters = ["ALL"]) => (target) => {
    if (!target.parameters)
        target.parameters = {};
    target.parameters.query = parameters; // used in wrapper.js for validation
    target.parameters.filters = filters; // used in wrapper.js for validation
    const swaggerParameters = Object.keys(parameters).map(key => Object.assign({ name: key }, parameters[key]));
    swaggerParameters.forEach(item => {
        item.in = "query";
    });
    swaggerObject_1.default.addMulti(target, { query: swaggerParameters }, filters);
};
exports.queryAll = queryAll;
const Doc = {
    request,
    summary,
    params,
    desc,
    description,
    header,
    query,
    path,
    body,
    tags,
    middlewares,
    security,
    formData,
    responses,
    deprecated,
    tagsAll,
    responsesAll,
    middlewaresAll,
    deprecatedAll,
    securityAll,
    queryAll,
    prefix
};
exports.default = Doc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUFzQjtBQUN0Qiw0REFBNEI7QUFDNUIsb0VBQTRDO0FBRTVDLE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBWSxFQUFFLElBQW9CLEVBQUUsRUFBRSxDQUFDLENBQ3BELE1BQVcsRUFDWCxJQUFZLEVBQ1osVUFBOEIsRUFDOUIsRUFBRTtJQUNGLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzlCLHVCQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbEQsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFZLEVBQUUsVUFBbUMsRUFBRSxFQUFFLENBQUMsQ0FDckUsTUFBVyxFQUNYLElBQVksRUFDWixVQUE4QixFQUM5QixFQUFFO0lBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVTtRQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUNuRSxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUM7SUFFL0MsOEJBQThCO0lBQzlCLElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDO0lBQ25DLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUNuQixpQkFBaUIsR0FBRztZQUNsQjtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsY0FBYztnQkFDM0IsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRSxVQUFVO2lCQUN2QjthQUNGO1NBQ0YsQ0FB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