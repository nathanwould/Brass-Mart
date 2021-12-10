export default function formatBreadcrumb(string) {
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)
  const findTheHyphen = (arr) => arr.findIndex((element) => element == "-")
  let toArray = string.split('')
  if (findTheHyphen(toArray) !== -1) {
    toArray = toArray.splice(findTheHyphen(toArray) + 1, toArray.length)
  }
  return capitalize(toArray.join(''))
};