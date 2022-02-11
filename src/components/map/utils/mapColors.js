export const GRADES = [0, 0.1, 2, 5, 10, 20, 30, 40, 50];

export const getColor = (rc) => {
  return rc === null
    ? "#EEEEEE"
    : rc === GRADES[0]
    ? "#fff"
    : rc < GRADES[2]
    ? "#fff5eb"
    : rc < GRADES[3]
    ? "#fee6ce"
    : rc < GRADES[4]
    ? "#fdd0a2"
    : rc < GRADES[5]
    ? "#fdae6b"
    : rc < GRADES[6]
    ? "#fd8d3c"
    : rc < GRADES[7]
    ? "#f16913"
    : rc < GRADES[8]
    ? "#d94801"
    : "#8c2d04";
};
