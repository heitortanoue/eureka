import dotenv from 'dotenv'
import aws from 'aws-sdk'
const crypto = require('crypto');
dotenv.config()

const region = "sa-east-1"
const bucketName = "eureka-app"
const accessKeyId = "AKIAUMUMRC633A6U4LPV"
const secretAccessKey = "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"

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
  ContentType: 'multipart/form-data'
})

const generateUploadURL = async (request, response) => {
    const { link_foto } = await request.body
    let imageName = link_foto
    if (!link_foto) {
      imageName = crypto.randomBytes(16).toString('hex');
    }
    const params = ({
        Bucket: bucketName,
        Key: `imgPerfil/${imageName}`,
        Expires: 60,
    })
    
    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return response.status(200).json({url: uploadURL})
}

export default generateUploadURL