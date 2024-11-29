const push = async (api, data) => {
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error in Fetchinggggg");
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error in Catch", error);
    return false;
  }
};

export default push;
