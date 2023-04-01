const formattedCustomerData = (data = []) => {
  console.log(data);
  if (!data.length) return [];
  const workers = data.map(({ _id, name, address, mobileNumber }) => {
    return {
      key: _id,
      text: name,
      address,
      mobileNo: mobileNumber,
    };
  });
  return {
    workers,
  };
};

export {
    formattedCustomerData
}
