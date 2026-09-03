/**
 * Core Game & Onboarding Types
 */
export interface GameMetrics {
    driverRating: number;
    customerSatisfaction: number;
    onTimeMetric: number;
    scenariosCompleted: number;
}
export interface GameState {
    metrics: GameMetrics;
    currentScenarioIndex: number;
    gameStatus: 'in-progress' | 'won' | 'lost';
    decisions: ScenarioChoice[];
    startTime: number;
}
export interface ScenarioChoice {
    scenarioId: string;
    chosenActionIndex: number;
    feedbackMessage: string;
    metricsImpact: MetricsImpact;
}
export interface MetricsImpact {
    ratingDelta: number;
    satisfactionDelta: number;
    timelinessDeltas: number;
    instantFail?: boolean;
}
export interface Scenario {
    id: string;
    title: string;
    situation: string;
    actions: ScenarioAction[];
    context: string;
}
export interface ScenarioAction {
    id: string;
    text: string;
    impact: MetricsImpact;
    feedback: string;
}
export declare const GAME_CONFIG: {
    readonly INITIAL_RATING: 5;
    readonly INITIAL_SATISFACTION: 100;
    readonly INITIAL_TIMELINESS: 100;
    readonly WIN_CONDITION_RATING: 4.5;
    readonly TOTAL_SCENARIOS: 5;
    readonly MIN_RATING_TO_CONTINUE: 4.5;
};
export declare const RATING_BOUNDS: {
    readonly MIN: 0;
    readonly MAX: 5;
};
export declare const SATISFACTION_BOUNDS: {
    readonly MIN: 0;
    readonly MAX: 100;
};
export declare const TIMELINESS_BOUNDS: {
    readonly MIN: 0;
    readonly MAX: 100;
};
export interface Applicant {
    id: string;
    name: string;
    email: string;
    phone?: string;
    onboarding_phase: 'scenario_test' | 'background_check' | 'vehicle_verification' | 'training' | 'approved';
    status: 'not_started' | 'in_progress' | 'completed' | 'failed';
    test_result_id?: string;
    test_completed_at?: Date;
    created_at: Date;
    updated_at: Date;
}
export interface TestResult {
    id: string;
    user_id: string;
    final_score: number;
    metrics: GameMetrics;
    decisions: ScenarioChoice[];
    time_taken: number;
    attempt_number: number;
    passed: boolean;
    created_at: Date;
    updated_at: Date;
}
export interface OnboardingLog {
    id: string;
    user_id: string;
    phase: string;
    action: 'STARTED' | 'PASSED' | 'FAILED' | 'RETAKE' | 'RESET';
    metadata?: Record<string, any>;
    created_at: Date;
}
export interface RetakeTracker {
    id: string;
    user_id: string;
    attempt_number: number;
    previous_score: number;
    new_score?: number;
    previous_attempt_at: Date;
    retake_at?: Date;
    status: 'waiting' | 'eligible' | 'completed';
    reason_for_retake?: string;
    created_at: Date;
    updated_at: Date;
}
export interface PhaseProgression {
    id: string;
    user_id: string;
    phase: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    started_at: Date;
    completed_at?: Date;
    metadata?: Record<string, any>;
    created_at: Date;
}
export interface ScoringAudit {
    id: string;
    test_result_id: string;
    scenario_id: string;
    action_index: number;
    score_before: number;
    score_after: number;
    impact: MetricsImpact;
    created_at: Date;
}
export interface AnalyticsSnapshot {
    id: string;
    period: string;
    period_start: Date;
    period_end: Date;
    total_applicants: number;
    passed_count: number;
    failed_count: number;
    avg_driver_rating: number;
    avg_satisfaction: number;
    avg_timeliness: number;
    avg_completion_time: number;
    created_at: Date;
}
export interface AuditTrail {
    id: string;
    admin_id: string;
    action: string;
    resource_type: string;
    resource_id: string;
    changes: Record<string, any>;
    ip_address?: string;
    user_agent?: string;
    created_at: Date;
}
export interface TestSubmissionPayload {
    userId: string;
    finalScore: number;
    metrics: GameMetrics;
    decisions: ScenarioChoice[];
    timeTaken: number;
}
export interface TestSubmissionResponse {
    success: boolean;
    message: string;
    finalScore: number;
    nextPhase: string;
    backgroundCheckTaskId?: string;
    estimatedDaysToCompletion?: number;
}
export interface AdminAnalyticsResponse {
    success: boolean;
    overview: {
        totalApplicants: number;
        passRate: number;
        failRate: number;
        avgRating: number;
        avgSatisfaction: number;
        avgTimeliness: number;
        thisWeekApplicants: number;
        thisWeekPassRate: number;
    };
    scenarioPerformance: Array<{
        scenarioId: string;
        title: string;
        avgRating: number;
        passRate: number;
        mostChosenAction: number;
    }>;
}
export interface AdminApplicantsResponse {
    success: boolean;
    applicants: Array<{
        id: string;
        name: string;
        email: string;
        status: string;
        currentPhase: string;
        testScore?: number;
        createdAt: Date;
        testCompletedAt?: Date;
    }>;
    total: number;
    page: number;
    pageSize: number;
}
