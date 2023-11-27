export default function arrayToSelectbox({
  array,
  toSelectbox = true,
  refArray = null,
}) {
  if (array) {
    if (toSelectbox) {
      let newArray = [];
      for (let obj of array) {
        newArray.push({ value: obj.id, label: obj.name, ...obj });
      }

      return newArray;
    }

    let newValues = [];
    for (let obj of array) {
      const findObj = refArray?.find((rf) => rf.id == obj.value) || null;
      newValues.push(findObj);
    }
    return newValues;
  }
}
