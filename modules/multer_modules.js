const { Storage } = require("@google-cloud/storage");
const bucketName = "ecotup-development-bucket";
const path = require("path");
const keyFilePath = path.join("serviceaccount-key.json");

const storage = new Storage({
  projectId: "ecotup",
  keyFilename: keyFilePath,
});
const bucket = storage.bucket(bucketName);

const uploadFileToStorage = (file, destination) => {
  return new Promise((resolve, reject) => {
    const fileName = file.originalname;
    const fileUpload = bucket.file(`${destination}/${fileName}`);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on("error", (error) => {
      reject(`Error uploading file: ${error}`);
    });

    stream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      resolve(publicUrl);
    });

    stream.end(file.buffer);
  });
};

module.exports = {
  uploadFileToStorage,
};
