import _ from "lodash";
type ObjectType = Record<string, unknown>;

export default function filterChange(
  defaultValues: ObjectType,
  currentValues: ObjectType,
) {
  const result: ObjectType = {};
  for (const [key, value] of Object.entries(defaultValues)) {
    if (!currentValues.hasOwnProperty(key)) continue;

    if (!_.isEqual(value, currentValues[key])) result[key] = currentValues[key];
  }

  return result;
}
