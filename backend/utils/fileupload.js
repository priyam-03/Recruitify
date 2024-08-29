const {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require("crypto");

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
const BUCKET = process.env.AWS_BUCKET_NAME;

const uploadToS3 = async (file) => {
  const key = generateFileName().toString();
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    await s3.send(command);
    return key;
  } catch (error) {
    console.log(error, "error");
    return { error };
  }
};

const getFile = async (Key) => {
  try {
    const input = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: Key,
    };

    const command = new GetObjectCommand(input);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const deleteFile = async (key) => {
  try {
    const deleteParams = new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    });

    return s3.send(deleteParams);
  } catch (error) {
    console.log(error);
    return { error };
  }
};

module.exports = {
  uploadToS3,
  getFile,
  deleteFile,
};
