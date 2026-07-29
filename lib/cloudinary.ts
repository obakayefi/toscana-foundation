import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Upload a File object, Buffer, or local/remote image path/URL string to Cloudinary.
 * @param source - A File (from a form upload), Buffer, or a URL/path string (for seeding migration)
 * @param folder - The Cloudinary folder to upload into
 * @returns { url: string; publicId: string }
 */
export async function uploadToCloudinary(
    source: File | Buffer | string,
    folder: string
): Promise<{ url: string; publicId: string }> {
    if (Buffer.isBuffer(source)) {
        return streamToCloudinary(source, folder);
    }

    if (typeof source === 'string') {
        // Check if string is a local file or relative path inside public/
        let relativePath = source;
        if (source.startsWith('http://') || source.startsWith('https://')) {
            try {
                const parsedUrl = new URL(source);
                relativePath = parsedUrl.pathname.replace(/^\//, ''); // e.g. "scholars/ndu_mau.JPG"
            } catch {
                relativePath = source;
            }
        } else if (source.startsWith('/')) {
            relativePath = source.replace(/^\//, '');
        }

        const localPath = path.join(process.cwd(), 'public', relativePath);

        if (fs.existsSync(localPath)) {
            console.log(`[Cloudinary Upload] Found local file at ${localPath}`);
            const buffer = fs.readFileSync(localPath);
            return streamToCloudinary(buffer, folder);
        }

        // If not on local disk and it's an http(s) URL, attempt remote fetch
        if (source.startsWith('http://') || source.startsWith('https://')) {
            const response = await fetch(source);
            if (!response.ok) throw new Error(`Failed to fetch image: ${source} (Status ${response.status})`);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            return streamToCloudinary(buffer, folder);
        }

        throw new Error(`Local file not found and invalid remote URL: ${source}`);
    } else {
        // File object → convert to buffer and stream
        const arrayBuffer = await source.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return streamToCloudinary(buffer, folder);
    }
}

function streamToCloudinary(
    buffer: Buffer,
    folder: string
): Promise<{ url: string; publicId: string }> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder }, (error, result) => {
                if (error || !result) return reject(error ?? new Error('Upload failed'));
                resolve({ url: result.secure_url, publicId: result.public_id });
            })
            .end(buffer);
    });
}