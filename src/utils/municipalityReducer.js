export const CHANGE_LIMIT = "CHANGE_LIMIT";

const handleDateLimitChange = (state, selectedLimit) => {
  const displayLimit = selectedLimit;
  let queryLimit = state.queryLimit;
  if (selectedLimit === 0) {
    queryLimit = 0;
  }
  return { displayLimit: displayLimit, queryLimit: queryLimit };
};

export function municipalityReducer(state, action) {
  switch (action.type) {
    case CHANGE_LIMIT:
      return handleDateLimitChange(state, action.selectedLimit);
    default:
      throw new Error();
  }
}
