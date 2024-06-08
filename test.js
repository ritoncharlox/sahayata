function convertStringToObject(jsonString) {
    try {
      // Attempt to parse the JSON string
      const jsonObject = JSON.parse(jsonString);
      return jsonObject;
    } catch (error) {
      // Return an error message if the string is not valid JSON
    //   return { error: "Invalid JSON string", details: error.message };
    }
  }
  
  // Example usage
  const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
  const invalidJsonString = '{name: "John", age: 30, city: "New York"}';
  const result = convertStringToObject(jsonString);
  const invalidResult = convertStringToObject(invalidJsonString);
  
  console.log(result);  // { name: 'John', age: 30, city: 'New York' }
  console.log(invalidResult);  // { error: 'Invalid JSON string', details: 'Unexpected token n in JSON at position 1' }
  
  // Example with an invalid JSON string
  
  