export const get = async function (url) {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }
  
  export const post = async function (url, data) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    return responseData;
  }
  
  export const put = async function (url, data) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    return responseData;
  }
  
  export const remove = async function (url) {
    const response = await fetch(url, {
      method: "DELETE",
    });
    return "Deletion successful";
  }