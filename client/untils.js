export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


  export  const themeColor = [
    { bg: "#E9D8D8", body: "#F5E4E4", header: "#E0CFCD", text: "#333333" },
    { bg: "#E9D8D8", body: "#F5EBCD", header: "#EAE0C3", text: "#333333" },
    { bg: "#ccd8cc", body: "#E2EEE2", header: "#C5CFC2", text: "#333333" },
    { bg: "#CED9D9", body: "#E1E8E8", header: "#CED9D9", text: "#333333" },
    { bg: "#E4DECE", body: "#EAE4D3", header: "#DBD5C3", text: "#333333" },
    { bg: "#D7D4CE", body: "#E5E3DF", header: "#9E9E9D", text: "#333333" },
    { bg: "#111111", body: "#222222", header: "#111111", text: "#ffff" },
  ];
