export const getColor = (rc) => {
  return rc === null
    ? "#EEEEEE"
    : rc === 0
    ? "#fff"
    : rc < 2
    ? "#fff5eb"
    : rc < 5
    ? "#fee6ce"
    : rc < 10
    ? "#fdd0a2"
    : rc < 20
    ? "#fdae6b"
    : rc < 30
    ? "#fd8d3c"
    : rc < 40
    ? "#f16913"
    : rc < 50
    ? "#d94801"
    : "#8c2d04";
};
