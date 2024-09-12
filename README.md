# @tzm96dev/deep-json-diff

`@tzm96dev/deep-json-diff` is a JavaScript utility function designed to perform a deep comparison between two JSON objects to determine if they are identical in structure and content. It evaluates each property by navigating recursively through both objects and reports any discrepancies.

## Features

- **Deep Recursive Comparison**: Thoroughly compares all levels and properties of two JSON objects.
- **Detailed Discrepancies**: Outputs precise paths and descriptions where differences occur.
- **Type and Structure Verification**: Ensures consistency in types and data structure between the compared objects.

## Installation

You can install `@tzm96dev/deep-json-diff` using npm:

```bash
npm install @tzm96dev/deep-json-diff
```

## Usage
Here's how to use @tzm96dev/deep-json-diff to compare two JSON objects, where sourceObject is the base object and targetObject is the object being compared:
```javascript
// Importing the deepJsonDiff function from the @tzm96dev/deep-json-diff package
import deepJsonDiff from '@tzm96dev/deep-json-diff';

/**
 * Example source object representing a user's data.
 * 
 * @type {Object}
 */
const sourceObject = {
  user: {
    name: "Alice",          // User's name
    age: 25,                // User's age
    interests: [            // User's interests
      "reading", 
      "cycling", 
      "technology"
    ]
  }
};

/**
 * Example target object representing another user's data for comparison.
 * 
 * @type {Object}
 */
const targetObject = {
  user: {
    name: "Alice",          // Same name and age as sourceObject for comparison
    age: 25,
    interests: [            // Different interests from sourceObject
      "reading", 
      "biking", 
      "tech"
    ]
  }
};

/**
 * Perform a deep comparison between sourceObject and targetObject
 * using the deepJsonDiff function.
 * 
 * @returns {boolean} - Returns true if the objects are identical, false otherwise.
 */
const areIdentical = deepJsonDiff(sourceObject, targetObject);

// Output the result of the comparison
// Expected output: false, as there are differences in the 'interests' array values
console.log(areIdentical);
```

### API

#### `deepJsonDiff(sourceObject: ObjectWithAnyValues, targetObject: ObjectWithAnyValues): boolean`

- **Parameters**:

  - **`sourceObject`**: The base or reference JSON object that serves as the source for comparison.
  - **`targetObject`**: The target JSON object being compared against the `sourceObject`.

- **Returns**:
  - A `boolean` value:
    - **`true`**: If both `sourceObject` and `targetObject` are structurally identical and contain the same values.
    - **`false`**: If any differences in structure, keys, or values are detected.

---

This description clarifies that the function performs deep comparison between two JSON objects, ensuring accuracy in both structure and content.


### Contributing

Contributions are always welcome! If you would like to enhance `@tzm96dev/deep-json-diff`, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/Talha-Zubair-Mayo/deep-json-diff).

---

### License

This project is distributed under the MIT License. For more information, please refer to the [LICENSE](./LICENSE) file.

---

### Key Updates:

1. **Parameter Clarification**: Updated the parameter names to `sourceObject` and `targetObject` to better reflect their roles in the comparison.
2. **Description Enhancements**: Improved the clarity of feature descriptions and the function's purpose.
3. **Usage Example Update**: Revised the usage example to reflect the updated parameter names and provide a clear context for their use.
4. **Input Validation**: Added an input validation step to ensure that both `sourceObject` and `targetObject` are valid JSON-like objects before performing any comparison.
5. **Error Handling**: Introduced error handling, throwing a descriptive error if either `sourceObject` or `targetObject` is invalid.
6. **Array Comparison**: Arrays are now sorted before comparison to ensure consistent results, even if the elements are not in the same order.
7. **Recursive Comparison**: Added support for recursive comparison of nested objects and arrays to ensure deep structural comparison.
8. **Improved Readability**: The function's readability has been enhanced with comprehensive comments explaining each step and helper function, making the code easier to understand and maintain.
9. **Markdown Syntax Fix**: Corrected the syntax and added proper formatting to make the code more readable.
10. **Usage Section**: Now correctly highlights the JavaScript code block and explains how the `deepJsonDiff` function is used.

---
