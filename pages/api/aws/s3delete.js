import dotenv from 'dotenv'
import aws from 'aws-sdk'
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

const deleteObject = async (request, response) => {
    const { path } = await request.body
    const params = ({
        Bucket: bucketName,
        Key: path,
    })

    await s3.deleteObject(params, function(err,data){
        if (err)    {console.log(err,err.stack)}
        else        {console.log("Response:",data); response.status(200).json({result: "Objeto deletado da AWS"})}
    })
}

export default deleteObject