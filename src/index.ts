type ObjectWithAnyValues = Record<string, any>;

/**
 * deepJsonDiff - Compares two JSON objects deeply to check if they are identical in both structure and values.
 *
 * @param sourceObject - The base or reference JSON object used as the source for comparison.
 * @param targetObject - The target JSON object that is compared to the source.
 * @returns boolean - Returns `true` if the objects are identical in both structure and values, `false` otherwise.
 *
 * This function performs a deep recursive comparison of two JSON objects. It checks for the existence of keys in both
 * objects, compares values, handles arrays, and traverses nested objects. If differences are found, they are logged,
 * and `false` is returned. If no differences are found, the function returns `true`.
 */
function deepJsonDiff(
  sourceObject: ObjectWithAnyValues,
  targetObject: ObjectWithAnyValues
): boolean {
  /**
   * Helper function to check if a value is a valid JSON-like object.
   * A valid JSON object is an object (not null and not an array).
   *
   * @param obj - The value to check.
   * @returns true if the value is a valid object, false otherwise.
   */
  function isValidJSONObject(obj: any): boolean {
    return obj !== null && typeof obj === "object" && !Array.isArray(obj);
  }

  // Validate both objects before proceeding with the comparison
  // If either input is invalid, throw an error.
  if (!isValidJSONObject(sourceObject) || !isValidJSONObject(targetObject)) {
    throw new Error("Both inputs must be valid JSON-like objects.");
  }

  /**
   * Recursively find differences between two objects.
   *
   * @param sourceObject - The base object (reference object).
   * @param targetObject - The object to compare against the base object.
   * @param path - Current path in the object hierarchy (used to build difference messages).
   * @returns An array of strings describing the differences.
   */
  function findDifferences(
    sourceObject: ObjectWithAnyValues,
    targetObject: ObjectWithAnyValues,
    path: string = ""
  ): string[] {
    const differences: string[] = [];

    // Combine all keys from both objects into a Set (to avoid duplicate keys)
    const allKeys = new Set([
      ...Object.keys(sourceObject),
      ...Object.keys(targetObject),
    ]);

    // Iterate over all keys and handle the comparison
    allKeys.forEach((key) => {
      const newPath = path ? `${path}.${key}` : key; // Create a path for nested properties
      handleKeyComparison(
        sourceObject,
        targetObject,
        key,
        newPath,
        differences
      );
    });

    return differences;
  }

  /**
   * Compare two objects based on the presence and types of their keys.
   *
   * @param sourceObject - The base object (reference object).
   * @param targetObject - The object to compare.
   * @param key - The key being compared.
   * @param path - The path used for the difference message.
   * @param differences - The array where differences will be pushed.
   */
  function handleKeyComparison(
    sourceObject: ObjectWithAnyValues,
    targetObject: ObjectWithAnyValues,
    key: string,
    path: string,
    differences: string[]
  ) {
    // If the key exists in sourceObject but not in targetObject, note the difference
    if (!(key in targetObject)) {
      differences.push(`${path} missing in target object`);
    }
    // If the key exists in targetObject but not in sourceObject, note the difference
    else if (!(key in sourceObject)) {
      differences.push(`${path} missing in source object`);
    }
    // Otherwise, compare the values associated with the key in both objects
    else {
      compareValues(sourceObject[key], targetObject[key], path, differences);
    }
  }

  /**
   * Compare the values of two keys, handle nested objects and arrays.
   *
   * @param val1 - The value from the source object.
   * @param val2 - The value from the target object.
   * @param path - The current path in the object hierarchy.
   * @param differences - The array where differences will be pushed.
   */
  function compareValues(
    val1: any,
    val2: any,
    path: string,
    differences: string[]
  ) {
    // If both values are arrays, compare the arrays
    if (Array.isArray(val1) && Array.isArray(val2)) {
      handleArrayComparison(val1, val2, path, differences);
    }
    // If both values are objects, recursively compare their properties
    else if (isObject(val1) && isObject(val2)) {
      differences.push(...findDifferences(val1, val2, path));
    }
    // If values are different, note the difference
    else if (val1 !== val2) {
      differences.push(`Different values at ${path}: ${val1} vs ${val2}`);
    }
  }

  /**
   * Compare two arrays, including sorting them for consistency.
   *
   * @param arr1 - The array from the source object.
   * @param arr2 - The array from the target object.
   * @param path - The current path in the object hierarchy.
   * @param differences - The array where differences will be pushed.
   */
  function handleArrayComparison(
    arr1: any[],
    arr2: any[],
    path: string,
    differences: string[]
  ) {
    // If arrays have different lengths, note the difference
    if (arr1.length !== arr2.length) {
      differences.push(`Different array lengths at ${path}`);
    }
    // Otherwise, sort and compare each element in the arrays
    else {
      let sortedArr1 = sortArrayByJSONString(arr1);
      let sortedArr2 = sortArrayByJSONString(arr2);
      differences.push(...findDifferences(sortedArr1, sortedArr2, path));
    }
  }

  /**
   * Sort an array by its JSON stringified elements for consistent comparison.
   *
   * @param array - The array to sort.
   * @returns The sorted array.
   */
  function sortArrayByJSONString(array: any[]): any[] {
    return [...array].sort((a, b) =>
      JSON.stringify(a).localeCompare(JSON.stringify(b))
    );
  }

  /**
   * Check if a value is an object (not null and not an array).
   *
   * @param value - The value to check.
   * @returns true if the value is an object, false otherwise.
   */
  function isObject(value: any): boolean {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  // Perform the recursive comparison, and check if any differences exist.
  const differences = findDifferences(sourceObject, targetObject);

  // Return true if no differences were found, otherwise false.
  return differences.length === 0;
}

export default deepJsonDiff;
