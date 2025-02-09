"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlashcardsCountByCategoryId = exports.removeFlashcardsFromCategory = exports.editFlashcard = exports.getFlashcardById = exports.createFlashcard = exports.createCategory = exports.removeCategoryById = exports.getCategories = exports.getCategoryNameById = exports.getFlashcardsById = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var seed = function () { return __awaiter(void 0, void 0, void 0, function () {
    var collection, categories, category, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, prisma.flashcardCollection.create({
                        data: { title: "collection" },
                    })];
            case 1:
                collection = _a.sent();
                return [4 /*yield*/, prisma.flashcardCategory.createMany({
                        data: [{ title: "day 1", collectionId: collection.id }],
                    })];
            case 2:
                categories = _a.sent();
                return [4 /*yield*/, prisma.flashcardCategory.findFirst({
                        where: { collectionId: collection.id }
                    })];
            case 3:
                category = _a.sent();
                if (!category) return [3 /*break*/, 5];
                return [4 /*yield*/, prisma.flashcard.createMany({
                        data: [
                            { title: "apple", definition: "яблуко", categoryId: category === null || category === void 0 ? void 0 : category.id },
                            { title: "pineapple", definition: "ананас", categoryId: category === null || category === void 0 ? void 0 : category.id },
                            { title: "grapes", definition: "виноград", categoryId: category === null || category === void 0 ? void 0 : category.id },
                            { title: "lemon", definition: "лимон", categoryId: category === null || category === void 0 ? void 0 : category.id },
                        ],
                    })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                console.log("Seed data inserted successfully!");
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error("Error seeding data:", error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
seed();
var deleteAllRecords = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, prisma.flashcard.deleteMany({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.flashcardCategory.deleteMany({})];
            case 2:
                _a.sent();
                return [4 /*yield*/, prisma.flashcardCollection.deleteMany({})];
            case 3:
                _a.sent();
                console.log("All records deleted successfully!");
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error("Error deleting records:", error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getFlashcardsById = function (categoryId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.flashcard.findMany({
                    where: { categoryId: categoryId },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getFlashcardsById = getFlashcardsById;
var getCategoryNameById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.flashcardCategory.findUnique({
                    where: { id: id },
                    select: { title: true },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getCategoryNameById = getCategoryNameById;
var getCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.flashcardCategory.findMany({
                    include: {
                        flashcards: true,
                    },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getCategories = getCategories;
var removeCategoryById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, prisma.flashcard.deleteMany({
                        where: { categoryId: id },
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.flashcardCategory.delete({
                        where: { id: id },
                    })];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_3 = _a.sent();
                console.error("Error removing category:", error_3);
                throw new Error("Category removal failed.");
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removeCategoryById = removeCategoryById;
var getCategoryIdByTitle = function (title) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.flashcardCategory.findUnique({
                    where: { title: title },
                    select: { id: true },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var doesCollectionExist = function (collectionId) { return __awaiter(void 0, void 0, void 0, function () {
    var collection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.flashcardCollection.findUnique({
                    where: { id: collectionId },
                    select: { id: true },
                })];
            case 1:
                collection = _a.sent();
                return [2 /*return*/, !!collection];
        }
    });
}); };
var getCollectionIdByName = function (title) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.flashcardCollection.findUnique({
                    where: { title: title },
                    select: { id: true },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var createCategory = function (title) { return __awaiter(void 0, void 0, void 0, function () {
    var existingCategory, collection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getCategoryIdByTitle(title)];
            case 1:
                existingCategory = _a.sent();
                if (existingCategory)
                    return [2 /*return*/, existingCategory];
                return [4 /*yield*/, getCollectionIdByName("collection")];
            case 2:
                collection = _a.sent();
                if (!collection) {
                    throw new Error("Collection \"collection\" does not exist.");
                }
                return [4 /*yield*/, prisma.flashcardCategory.create({
                        data: {
                            collectionId: collection.id,
                            title: title,
                        },
                        select: { id: true },
                    })];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createCategory = createCategory;
var createFlashcard = function (categoryId, title, definition) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.flashcard.create({
                    data: {
                        categoryId: categoryId,
                        title: title,
                        definition: definition,
                    },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createFlashcard = createFlashcard;
var getFlashcardById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!id || id <= 0)
                    return [2 /*return*/, null];
                return [4 /*yield*/, prisma.flashcard.findUnique({
                        where: { id: id },
                        select: { id: true },
                    })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getFlashcardById = getFlashcardById;
var editFlashcard = function (categoryId, id, title, definition) { return __awaiter(void 0, void 0, void 0, function () {
    var existingFlashcard;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getFlashcardById)(id)];
            case 1:
                existingFlashcard = _a.sent();
                if (!!existingFlashcard) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, exports.createFlashcard)(categoryId, title, definition)];
            case 2: return [2 /*return*/, _a.sent()];
            case 3: return [4 /*yield*/, prisma.flashcard.update({
                    where: { id: id },
                    data: { title: title, definition: definition },
                })];
            case 4: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.editFlashcard = editFlashcard;
var removeFlashcardsFromCategory = function (categoryId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.flashcard.deleteMany({
                    where: { categoryId: categoryId },
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.removeFlashcardsFromCategory = removeFlashcardsFromCategory;
var getFlashcardsCountByCategoryId = function (categoryId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.flashcard.count({
                    where: { categoryId: categoryId },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getFlashcardsCountByCategoryId = getFlashcardsCountByCategoryId;
