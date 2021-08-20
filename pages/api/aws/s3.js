import dotenv from 'dotenv'
import aws from 'aws-sdk'
const crypto = require('crypto');
dotenv.config()

const region = process.env.AWS_BUCKET_REGION
const bucketName = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY
const secretAccessKey = process.env.AWS_BUCKET_SECRET_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
  ContentType: 'multipart/form-data'
})

const generateUploadURL = async (request, response) => {
    const { link_foto, path } = await request.body
    let imageName = link_foto
    if (!link_foto) {
      imageName = crypto.randomBytes(16).toString('hex');
    }
    const params = ({
        Bucket: bucketName,
        Key: `${path}${imageName}`,
        Expires: 60,
    })
    
    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return response.status(200).json({url: uploadURL})
}

export default generateUploadURL