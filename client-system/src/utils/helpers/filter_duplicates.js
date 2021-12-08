export function filter_duplicates(array) {
  let dupe = {};
  let output = [];

  array.forEach((element, i) => {
    if (!(element in dupe)) {
      dupe[element] = true;
      output.push(element);
    }
  });

  return output;
}
