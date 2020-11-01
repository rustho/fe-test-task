export const fetchTo = (
  url: string,
  method: string,
  body: any,
  callback: (result: any) => void
) => {
  let options: any = {
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "content-type": "application/json; charset=UTF-8",
    },
  };
  if (method === "POST") {
    options.method = method;
    options.body = JSON.stringify(body);
  }
  fetch(url, options)
    .then((response) => response.json())
    .then((json) => {
      if (json.ok) {
        callback(json.result);
      }
    });
};
