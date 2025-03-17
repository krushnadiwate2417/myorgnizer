const post = async (api, data, path, token) => {
 
  try {
    const response = await fetch(
      api,
      path == "/" || path == "/login" || path == "/verify"
        ? {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        : {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          }
    );

    if (!response.ok) {

      throw new Error("Error in Fetchinggggg");
      
    }

    const result = await response.json();

    return result;
  } catch (error) {

    return false;
  }
};

export default post;
