// ============================================================
// API LAYER — all network / mock calls live here
// No React imports, no UI concerns whatsoever
// Replace mock implementations with real fetch() when backend is ready
// ============================================================

export const MOCK_DATA = {
  solution_1:
    "Here's a JavaScript code for a factorial function using both iterative and recursive approaches:\n\n### 1. Iterative Approach (using a loop)\n```javascript\nfunction factorialIterative(n) {\n    if (n < 0) return NaN; // Factorial of negative numbers is undefined\n    if (n === 0 || n === 1) return 1; // Base case\n\n    let result = 1;\n    for (let i = 2; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}\n\n// Example usage:\nconsole.log(factorialIterative(5)); // Output: 120\n```\n\n### 2. Recursive Approach\n```javascript\nfunction factorialRecursive(n) {\n    if (n < 0) return NaN; // Factorial of negative numbers is undefined\n    if (n === 0 || n === 1) return 1; // Base case\n    return n * factorialRecursive(n - 1); // Recursive call\n}\n\n// Example usage:\nconsole.log(factorialRecursive(5)); // Output: 120\n```\n\n### One-Liner (ES6 Arrow Function)\n```javascript\nconst factorial = n => n < 0 ? NaN : n <= 1 ? 1 : n * factorial(n - 1);\nconsole.log(factorial(5)); // 120\n```",
  solution_2:
    "Certainly! Below is a simple implementation of a factorial function in JavaScript.\n\n```javascript\nfunction factorial(n) {\n    if (n < 0) {\n        return \"Factorial is not defined for negative numbers.\";\n    }\n    if (n === 0 || n === 1) {\n        return 1;\n    }\n    let result = 1;\n    for (let i = 2; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}\n\n// Example usage:\nconsole.log(factorial(5)); // Output: 120\nconsole.log(factorial(0)); // Output: 1\nconsole.log(factorial(-1)); // Output: \"Factorial is not defined for negative numbers.\"\n```\n\n### Explanation:\n- **Input Validation**: Checks if the input is negative.\n- **Base Case**: If n is 0 or 1, returns 1.\n- **Iterative Calculation**: Multiplies result by each integer from 2 to n.\n- **Return Result**: Returns the computed factorial.",
  judge: {
    solution_1_score: 10,
    solution_2_score: 9,
    solution_1_reasoning:
      "This solution is excellent as it provides both iterative and recursive implementations, explains the trade-offs between them, and includes a concise ES6 one-liner. The code is robust, handles negative numbers appropriately with NaN, and covers all common implementation patterns.",
    solution_2_reasoning:
      "This solution is accurate and easy to understand. However, it returns a string for negative inputs rather than a standard numeric indicator like NaN or throwing an error, which makes programmatic handling of the function's output more difficult for the developer.",
  },
}

export const INITIAL_HISTORY = [
  { id: 1, title: "Python Script Debugging", icon: "history" },
  { id: 2, title: "Creative Writing Prompt", icon: "history" },
  { id: 3, title: "Factorial in JS", icon: "compare_arrows", active: true },
  { id: 4, title: "Benchmarks Overview", icon: "leaderboard" },
]

export const INITIAL_MESSAGE = {
  id: 0,
  userText: "write an code for factorial function in js",
  data: { problem: "write an code for factorial function in js", ...MOCK_DATA },
  loading: false,
}

/**
 * Submits a problem to the arena and returns two AI solutions + judge verdict.
 * @param {string} problem - The user's coding problem
 * @returns {Promise<{problem: string, solution_1: string, solution_2: string, judge: object}>}
 */
export async function submitProblem(problem) {
  // TODO: Replace with real API call:
  // const res = await fetch('/api/arena', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ problem }),
  // })
  // return res.json()

  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...MOCK_DATA, problem }), 2500)
  })
}
