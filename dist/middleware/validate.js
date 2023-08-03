"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAudio = exports.validateTest = exports.validateSchool = void 0;
const validationSchem_1 = require("../util/validationSchem");
const validateSchool = (req, res, next) => {
    const validationResult = validationSchem_1.SchoolSchema.validate(req.body);
    if (validationResult.error) {
        console.log(validationResult.error);
        return res.status(200).json({ error: validationResult.error });
    }
    else {
        next();
    }
};
exports.validateSchool = validateSchool;
const validateTest = (req, res, next) => {
    const TestResult = validationSchem_1.TestSchema.validate(req.body);
    if (TestResult.error) {
        console.log(TestResult.error);
        return res.status(200).json({ error: TestResult.error });
    }
    else {
        next();
    }
};
exports.validateTest = validateTest;
const validateAudio = (req, res, next) => {
    const AudioResult = validationSchem_1.AudioSchema.validate(req.body);
    if (AudioResult.error) {
        console.log(AudioResult.error);
        return res.status(200).json({ error: AudioResult.error });
    }
    else {
        next();
    }
};
exports.validateAudio = validateAudio;
