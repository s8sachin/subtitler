export const sortAsc = (a: any, b: any, sortKey: string) => {
  if (a[sortKey] < b[sortKey]) {
    return -1;
  }
  if (a[sortKey] > b[sortKey]) {
    return 1;
  }
  return 0;
};

export const sortDesc = (a: any, b: any, sortKey: string) => {
  if (a[sortKey] > b[sortKey]) {
    return -1;
  }
  if (a[sortKey] < b[sortKey]) {
    return 1;
  }
  return 0;
};
