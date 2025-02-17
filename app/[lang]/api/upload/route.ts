import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export interface UploadImageResponse {
  success: boolean;
  message: string;
  imageUrl?: string;
  error?: string;
}

const {
  YANDEX_ACCESS_KEY_ID,
  YANDEX_SEKRET_ACCESS_KEY,
  YANDEX_DEFAULT_REGION,
  YANDEX_BACKET_NAME,
} = process.env;

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Изображение не предоставлено',
        },
        { status: 400 },
      );
    }

    const fileName = `${uuidv4()}-${file.name}`;
    const fileBuffer = await file.arrayBuffer();
    const fileBytes = Buffer.from(new Uint8Array(fileBuffer));

    const s3Client = new S3Client({
      endpoint: 'https://storage.yandexcloud.net',
      credentials: {
        accessKeyId: YANDEX_ACCESS_KEY_ID || '',
        secretAccessKey: YANDEX_SEKRET_ACCESS_KEY || '',
      },
      region: YANDEX_DEFAULT_REGION,
    });

    await s3Client.send(
      new PutObjectCommand({
        Bucket: YANDEX_BACKET_NAME,
        Key: fileName,
        Body: fileBytes,
        ContentType: file.type,
      }),
    );

    const imageUrl = `https://${YANDEX_BACKET_NAME}.storage.yandexcloud.net/${fileName}`;

    return NextResponse.json(
      {
        success: true,
        message: 'Изображение успешно загружено',
        imageUrl,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('Ошибка при загрузке файла:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Произошла ошибка при загрузке файла',
        error,
      },
      { status: 500 },
    );
  }
}
