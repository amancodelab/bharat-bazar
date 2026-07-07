export const uploadToCloudinary = async (file: any) => {
  const cloud_name = "dgf0oyxa6";
  const upload_preset = "Bharat bazar";

  const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", upload_preset);

  const res = await fetch(url, {
    method: "POST",
    body: data,
  });

  const fileData = await res.json();

  console.log(fileData);
  console.log("Image URL:", fileData.secure_url);

  return fileData.secure_url;
};