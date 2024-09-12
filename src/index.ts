type ObjectWithAnyValues = Record<string, any>;

export function deepJsonDiff(
  obj1: ObjectWithAnyValues,
  obj2: ObjectWithAnyValues
): boolean {
  // Recursively finds differences between two objects
  function findDifferences(
    obj1: ObjectWithAnyValues,
    obj2: ObjectWithAnyValues,
    path: string = ""
  ): string[] {
    const differences: string[] = [];
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    allKeys.forEach((key) => {
      const newPath = path ? `${path}.${key}` : key;
      handleKeyComparison(obj1, obj2, key, newPath, differences);
    });
    return differences;
  }

  // Handles comparison based on key existence and data type
  function handleKeyComparison(
    obj1: ObjectWithAnyValues,
    obj2: ObjectWithAnyValues,
    key: string,
    path: string,
    differences: string[]
  ) {
    if (!(key in obj2)) {
      differences.push(`${path} missing in second object`);
    } else if (!(key in obj1)) {
      differences.push(`${path} missing in first object`);
    } else {
      compareValues(obj1[key], obj2[key], path, differences);
    }
  }

  // Compare values, including handling of objects and arrays
  function compareValues(
    val1: any,
    val2: any,
    path: string,
    differences: string[]
  ) {
    if (Array.isArray(val1) && Array.isArray(val2)) {
      handleArrayComparison(val1, val2, path, differences);
    } else if (isObject(val1) && isObject(val2)) {
      differences.push(...findDifferences(val1, val2, path));
    } else if (val1 !== val2) {
      differences.push(`Different values at ${path}: ${val1} vs ${val2}`);
    }
  }

  // Sorts and compares arrays
  function handleArrayComparison(
    arr1: any[],
    arr2: any[],
    path: string,
    differences: string[]
  ) {
    if (arr1.length !== arr2.length) {
      differences.push(`Different array lengths at ${path}`);
    } else {
      let sortedArr1 = sortArrayByJSONString(arr1);
      let sortedArr2 = sortArrayByJSONString(arr2);
      differences.push(...findDifferences(sortedArr1, sortedArr2, path));
    }
  }

  // Helper to sort an array by JSON stringified version of its elements
  function sortArrayByJSONString(array: any[]): any[] {
    return [...array].sort((a, b) =>
      JSON.stringify(a).localeCompare(JSON.stringify(b))
    );
  }

  // Helper to check if a value is an object (and not null or an Array)
  function isObject(value: any): boolean {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  const differences = findDifferences(obj1, obj2);
  return differences.length === 0;
}
