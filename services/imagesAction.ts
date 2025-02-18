// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import { NextRequest, NextResponse } from 'next/server';
// import { v4 as uuidv4 } from 'uuid';

// const {
//   YANDEX_ACCESS_KEY_ID,
//   YANDEX_SEKRET_ACCESS_KEY,
//   YANDEX_DEFAULT_REGION,
//   YANDEX_BACKET_NAME,
// } = process.env;

// // TODO после отправки изображения в хранилище, ссылку на файл сохранять в БД users.avatar
// export const putImage = async (formData: any) => {
//   console.log(formData, 'formData');
//   try {
//     const file = formData.get('image');
//     if (!file) {
//       throw new Error('Файл не найден в formData');
//     }

//     const fileName = `${uuidv4()}-${file.name}`;
//     const fileBuffer = await file.arrayBuffer();
//     const fileBytes = Buffer.from(new Uint8Array(fileBuffer));

//     const s3Client = new S3Client({
//       endpoint: 'https://storage.yandexcloud.net',
//       credentials: {
//         accessKeyId: YANDEX_ACCESS_KEY_ID || '',
//         secretAccessKey: YANDEX_SEKRET_ACCESS_KEY || '',
//       },
//       region: YANDEX_DEFAULT_REGION,
//     });

//     console.log(YANDEX_ACCESS_KEY_ID);
//     await s3Client.send(
//       new PutObjectCommand({
//         Bucket: YANDEX_BACKET_NAME,
//         Key: fileName + file.name,
//         Body: fileBytes,
//         ContentType: file.type,
//       }),
//     );
//   } catch (e) {
//     throw new Error('Ошибка при получении изображения: ' + e);
//   }
// };
