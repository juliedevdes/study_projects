/**
 * GREEDY ALGORITHM EXERCISE: ACTIVITY SELECTION PROBLEM
 * Practice implementing greedy approximation algorithms
 */

// ============================================================================
// ACTIVITY SELECTION PROBLEM (Optimal Greedy Solution)
// ============================================================================

/**
 * PROBLEM DESCRIPTION:
 * You are given n activities with their start and finish times.
 * Select the maximum number of activities that can be performed by a single person,
 * assuming that a person can only work on a single activity at a time.
 *
 * EXAMPLE:
 * Activities: [(1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11), (8,12), (2,14), (12,16)]
 * Expected Output: Activities at indices [0, 1, 3, 7, 10] or similar valid combination
 *
 * STEP-BY-STEP GUIDE:
 * 1. Sort activities by their finish times (earliest finish first)
 * 2. Always select the first activity (earliest finish time)
 * 3. For remaining activities, select an activity only if its start time
 *    is >= finish time of the last selected activity
 * 4. Repeat until all activities are processed
 *
 * TIME COMPLEXITY: O(n log n) due to sorting
 * SPACE COMPLEXITY: O(n) for storing selected activities
 */

function activitySelection(activities) {
    if (!activities || activities.length === 0) return [];

    const activitiesWithIndex = activities.map((activity, index) => ({
        start: activity[0],
        finish: activity[1],
        originalIndex: index,
    }));

    activitiesWithIndex.sort((a, b) => a.finish - b.finish);

    const selected = [];
    let lastFinishTime = -1;

    for (const activity of activitiesWithIndex) {
        if (activity.start >= lastFinishTime) {
            selected.push(activity.originalIndex);
            lastFinishTime = activity.finish;
        }
    }

    return selected;
}

// ============================================================================
// TEST CASE - Use this to verify your implementation
// ============================================================================

function runTests() {
    console.log('=== TESTING ACTIVITY SELECTION ALGORITHM ===\n');

    // Test Activity Selection
    console.log('Activity Selection Test:');
    const activities = [
        [1, 4], // Activity 0: 1-4
        [3, 5], // Activity 1: 3-5
        [0, 6], // Activity 2: 0-6
        [5, 7], // Activity 3: 5-7
        [3, 9], // Activity 4: 3-9
        [5, 9], // Activity 5: 5-9
        [6, 10], // Activity 6: 6-10
        [8, 11], // Activity 7: 8-11
        [8, 12], // Activity 8: 8-12
        [2, 14], // Activity 9: 2-14
        [12, 16], // Activity 10: 12-16
    ];

    console.log('Input:', activities);
    const result = activitySelection(activities);
    console.log('Selected activity indices:', result);
    console.log('Selected activities:');
    result.forEach(index => {
        console.log(`  Activity ${index}: [${activities[index][0]}, ${activities[index][1]}]`);
    });
    console.log(`Total activities selected: ${result.length}`);
}

// Run the test
runTests();
