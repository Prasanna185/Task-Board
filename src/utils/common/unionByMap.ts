const unionByMap = (arrays: Array<any | []>, iteratee: string): any => {
  // create a map
  const map = new Map();
  
  // iterate the arrays we pass to the function
  arrays.forEach(array => {
    // iterate the objects in each array
    array.forEach((object: { [x: string]: any }) => {
      // set a new key/value pair for each object
      // { 'Bob' => { name: 'Bob', food: 'Pizza' } }
      map.set(object[iteratee], object);
    });
  });
  
  // return a new array from our map
  return [...map.values()];
};
  
export default unionByMap;
    