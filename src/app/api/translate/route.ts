// src/app/api/translate/route.ts
import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Menggunakan uuid dari package

// Ambil konfigurasi dari environment variables
const AZURE_TRANSLATOR_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_TRANSLATOR_ENDPOINT = process.env.AZURE_TRANSLATOR_ENDPOINT;
const AZURE_TRANSLATOR_REGION = process.env.AZURE_TRANSLATOR_REGION;

// Interface untuk struktur error yang mungkin dari Azure
interface AzureErrorDetail { 
  code: string; 
  message: string; 
  target?: string; 
  innerError?: AzureErrorDetail; 
}
interface AzureErrorResponseData { 
  error?: AzureErrorDetail; 
}

// Interface untuk body request yang diterima dari frontend
interface TranslateRequestBody {
  text: string;
  sourceLanguage?: string; // Opsional, Azure bisa auto-detect
  targetLanguage: string | string[]; // Bisa satu atau banyak bahasa target
}

export async function POST(request: Request) {
  // Validasi konfigurasi Azure
  if (!AZURE_TRANSLATOR_KEY) {
    console.error("Azure Translator Key missing.");
    return NextResponse.json({ error: 'Konfigurasi Kunci Azure Translator tidak ditemukan di server.' }, { status: 500 });
  }
  if (!AZURE_TRANSLATOR_ENDPOINT || typeof AZURE_TRANSLATOR_ENDPOINT !== 'string' || !AZURE_TRANSLATOR_ENDPOINT.startsWith('https')) {
    console.error("Azure Translator Endpoint missing or invalid:", AZURE_TRANSLATOR_ENDPOINT);
    return NextResponse.json({ error: 'Konfigurasi Endpoint Azure Translator tidak valid di server.' }, { status: 500 });
  }
  if (!AZURE_TRANSLATOR_REGION) {
    console.error("Azure Translator Region missing.");
    return NextResponse.json({ error: 'Konfigurasi Region Azure Translator tidak ditemukan di server.' }, { status: 500 });
  }

  try {
    const { 
      text, 
      sourceLanguage, // Jika tidak diberikan oleh frontend, Azure akan auto-detect
      targetLanguage  // Bisa berupa string tunggal atau array string
    } = await request.json() as TranslateRequestBody;

    // Validasi input dari frontend
    if (!text || typeof text !== 'string' || text.trim() === "") {
      return NextResponse.json({ error: 'Teks untuk diterjemahkan tidak boleh kosong.' }, { status: 400 });
    }
    if (!targetLanguage || (typeof targetLanguage !== 'string' && !Array.isArray(targetLanguage))) {
      return NextResponse.json({ error: 'Bahasa target tidak valid. Harus berupa string atau array string.' }, { status: 400 });
    }
    if (sourceLanguage && typeof sourceLanguage !== 'string') {
        return NextResponse.json({ error: 'Bahasa sumber tidak valid. Harus berupa string.' }, { status: 400 });
    }
    
    const params: { [key: string]: string | string[] } = {
        'api-version': '3.0',
        'to': targetLanguage, // Ini akan menjadi string atau array string
    };

    // Tambahkan 'from' hanya jika sourceLanguage diberikan
    if (sourceLanguage) {
        params['from'] = sourceLanguage;
    }

    const axiosConfig = {
      baseURL: AZURE_TRANSLATOR_ENDPOINT,
      url: '/translate',
      method: 'post' as const,
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_TRANSLATOR_KEY,
        'Ocp-Apim-Subscription-Region': AZURE_TRANSLATOR_REGION,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString() // Menggunakan uuid dari package
      },
      params: params,
      data: [{ text: text.trim() }],
      responseType: 'json' as const,
    };
    
    console.log("Mencoba menerjemahkan dengan config:", { 
        baseURL: axiosConfig.baseURL, 
        url: axiosConfig.url, 
        params: axiosConfig.params, 
        sourceTextLength: text.trim().length 
    });

    const azureResponse = await axios(axiosConfig);

    // Struktur respons Azure akan berupa array jika 'to' adalah array, 
    // atau objek tunggal jika 'to' adalah string tunggal.
    // Untuk konsistensi, kita akan selalu mengembalikan array hasil terjemahan di 'translations'.
    // Jika hanya satu bahasa target, response.data[0].translations akan berisi satu elemen.
    // Jika beberapa bahasa target, response.data[0].translations akan berisi beberapa elemen.

    const translations = azureResponse.data[0]?.translations;

    if (translations && translations.length > 0) {
      console.log("Terjemahan berhasil:", translations);
      // Jika Anda ingin frontend menangani satu atau banyak terjemahan, kirim struktur ini.
      // Jika frontend hanya mengharapkan satu hasil (targetLanguage adalah string), Anda bisa ambil yang pertama.
      if (typeof targetLanguage === 'string') {
        return NextResponse.json({ translatedText: translations[0]?.text, translations }); // Kirim juga array lengkap
      }
      return NextResponse.json({ translations });
    } else {
      console.error("Format respons Azure tidak diharapkan atau tidak ada hasil terjemahan:", azureResponse.data);
      throw new Error('Gagal memproses respons dari layanan penerjemah Azure atau tidak ada hasil.');
    }

  } catch (error) {
    let errorMessage = 'Terjadi kesalahan pada server saat menerjemahkan.';
    let errorDetails: string | object | null = 'Tidak ada detail tambahan.';
    let statusCode = 500;

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<AzureErrorResponseData>;
      console.error("Axios Error Details:", { /* ... (logging sama seperti sebelumnya) ... */ });
      const azureErrorDetail = axiosError.response?.data?.error;
      errorMessage = azureErrorDetail?.message 
        ? `Layanan Penerjemah Azure: ${azureErrorDetail.message} (Kode: ${azureErrorDetail.code})`
        : axiosError.message || 'Error saat menghubungi layanan Azure.';
      errorDetails = axiosError.response?.data || axiosError.message;
      statusCode = axiosError.response?.status || 500;
    } else if (error instanceof Error) {
      console.error("Generic Error:", error.message, error.stack);
      errorMessage = error.message;
      errorDetails = error.stack || null;
    } else {
      console.error("Unknown Error:", error);
      errorMessage = 'Terjadi kesalahan internal yang tidak diketahui.';
      errorDetails = String(error);
    }
      
    return NextResponse.json(
      { error: errorMessage, details: errorDetails },
      { status: statusCode }
    );
  }
}