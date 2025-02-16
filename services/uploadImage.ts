// require('dotenv').config();
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import { readFileSync } from 'fs';
// import { join } from 'path';

// const client = new S3Client({
//   region: process.env.YANDEX_DEFAULT_REGION,
//   credentials: {
//     accessKeyId: process.env.YANDEX_BACKET_NAME,
//     secretAccessKey: process.env.YANDEX_ACCESS_KEY_ID,
//   },
//   endpoint: process.env.YANDEX_ENDPOINT_URL,
//   forcePathStyle: true, // Needed for Cloudflare R2
//   signatureVersion: 'v4',
// });

// const bucketName = process.env.YANDEX_BACKET_NAME;
// const filePath = join(__dirname, 'scaffolds.json');
// const keyName = 'peopeIcon';

// const uploadFile = async () => {
//   try {
//     const data = await client.send(
//       new PutObjectCommand({
//         Bucket: bucketName,
//         Key: keyName,
//         Body: readFileSync('/images/people.png'),
//         ContentType: 'image/png',
//       }),
//     );
//     console.log('Success', data);
//   } catch (err) {
//     console.log('Error', err);
//   }
// };

// uploadFile();
