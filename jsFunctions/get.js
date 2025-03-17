const get = async (api, token) => {
  try {
    const response = await fetch(api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error in Fetchinggggggg");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error in error", error);
    return false;
  }
};

export default get;
