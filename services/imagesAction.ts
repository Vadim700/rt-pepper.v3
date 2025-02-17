// import { UploadImageResponse } from '@/app/[lang]/api/upload/route';

// export const handleFile = async (file: any) => {
//   try {
//     const response = await fetch(process.env.NEXTAUTH_URL + '/api/upload', {
//       method: 'POST',
//       body: file,
//     });

//     const data: UploadImageResponse = await response.json();

//     if (data.success) {
//       console.log('Изображение успешно загружено');
//     } else {
//       throw new Error(data.error || 'Ошибка загрузки');
//     }
//   } catch (e) {
//     throw new Error('Ошибка при получении изображения: ' + e);
//   }
// };
