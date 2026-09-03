"use strict";
/**
 * Core Game & Onboarding Types
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMELINESS_BOUNDS = exports.SATISFACTION_BOUNDS = exports.RATING_BOUNDS = exports.GAME_CONFIG = void 0;
// Game Constants
exports.GAME_CONFIG = {
    INITIAL_RATING: 5.0,
    INITIAL_SATISFACTION: 100,
    INITIAL_TIMELINESS: 100,
    WIN_CONDITION_RATING: 4.5,
    TOTAL_SCENARIOS: 5,
    MIN_RATING_TO_CONTINUE: 4.5,
};
exports.RATING_BOUNDS = {
    MIN: 0,
    MAX: 5.0,
};
exports.SATISFACTION_BOUNDS = {
    MIN: 0,
    MAX: 100,
};
exports.TIMELINESS_BOUNDS = {
    MIN: 0,
    MAX: 100,
};
