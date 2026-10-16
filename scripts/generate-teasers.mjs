import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const FFMPEG_PATH = path.join(projectRoot, 'node_modules/ffmpeg-static/ffmpeg');
const OUTPUT_DIR = path.join(projectRoot, 'public/teasers');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const STORAGE_BASE = 'https://firebasestorage.googleapis.com/v0/b/studio-748727496-885ed.firebasestorage.app/o';

function getStorageUrl(cleanPath) {
  return `${STORAGE_BASE}/${encodeURIComponent(cleanPath)}?alt=media`;
}

const STORIES = [
  {
    id: 'the-great-giants-of-zazzau',
    title: 'The Great Giants of Zazzau',
    subtitle: 'Queen Amina: Warrior of Zazzau',
    audioPath: 'audio/The_Great_Giants_of_Zazzau.mp3',
    imagePath: 'images/the-great-giants-of-zazzau-cover.png',
  },
  {
    id: 'arhuan-the-giant-prince-of-benin',
    title: 'Arhuan: The Giant Prince of Benin',
    subtitle: 'Inspired by Mama Africa',
    audioPath: 'audio/arhuan-the-giant-prince-of-benin.mp3',
    imagePath: 'images/arhuan-the-giant-prince-of-benin-cover.png',
  },
  {
    id: '1',
    slug: 'the-glass-of-milk',
    title: 'The Glass of Milk',
    subtitle: 'Truth & Honesty in Ancient Times',
    audioPath: 'audio/The-Glass-of-Milk.mp3',
    imagePath: 'images/the-glass-of-milk/page_0.png',
  },
  {
    id: '2',
    slug: 'the-river-was-always-there',
    title: 'The River Was Always There',
    subtitle: 'African Guides & Ancient Heritage',
    audioPath: 'audio/The-River-was-always-there.mp3',
    imagePath: 'images/the-river-was-always-there/page_1.png',
  },
  {
    id: '3',
    slug: 'the-kings-signature',
    title: "The King's Signature",
    subtitle: 'King Duke Ephraim of Calabar',
    audioPath: 'audio/The-Kings-Signature.mp3',
    imagePath: 'images/the-kings-signature/page_0.png',
  },
  {
    id: '4',
    slug: 'understanding-colonisation',
    title: 'Understanding Colonisation',
    subtitle: 'Heritage & Resilience',
    audioPath: 'audio/Colonisation.mp3',
    imagePath: 'images/understanding-colonisation/Osa-1.jpeg',
  },
  {
    id: '5',
    slug: 'we-were-never-lost',
    title: 'We Were Never Lost',
    subtitle: 'King Jaja of Opobo',
    audioPath: 'audio/we-were-never-lost.mp3',
    imagePath: 'images/we-were-never-lost/0.jpg',
  },
  {
    id: '6',
    slug: 'the-river-of-a-thousand-songs',
    title: 'The River of a Thousand Songs',
    subtitle: 'Unity & Harmony',
    audioPath: 'audio/The-River-of-a-Thousand-Songs.mp3',
    imagePath: 'images/the-river-of-songs/0.jpg',
  },
];

async function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: HTTP ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(destPath);
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

function runFFmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(FFMPEG_PATH, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    proc.stderr.on('data', (d) => {
      stderr += d.toString();
    });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}:\n${stderr.slice(-500)}`));
    });
  });
}

async function generateTeaser(story) {
  const tmpDir = path.join(projectRoot, '.tmp-teaser');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const ext = path.extname(story.imagePath) || '.png';
  const localImage = path.join(tmpDir, `${story.id}${ext}`);
  const localAudio = path.join(tmpDir, `${story.id}.mp3`);
  const finalOutput = path.join(OUTPUT_DIR, `${story.id}.mp4`);

  console.log(`\n========================================`);
  console.log(`🎬 Processing Teaser: ${story.title} (${story.id})`);
  console.log(`========================================`);

  try {
    const imageUrl = getStorageUrl(story.imagePath);
    const audioUrl = getStorageUrl(story.audioPath);

    console.log(`⬇️ Downloading artwork from Firebase...`);
    await downloadFile(imageUrl, localImage);

    console.log(`⬇️ Downloading audio track from Firebase...`);
    await downloadFile(audioUrl, localAudio);

    console.log(`🎥 Rendering 15-second 9:16 audiogram video with animated soundwaves...`);

    // Complex filter breakdown:
    // 1. [0:v] Image input:
    //    - Scale & blur for ambient 720x1280 background: scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=25:5,eq=brightness=-0.25[bg]
    //    - Foreground cover art: scale=600:600:force_original_aspect_ratio=decrease[fg]
    //    - Overlay fg on bg in the upper-middle area (y=240): [bg][fg]overlay=(W-w)/2:240[stage]
    // 2. [1:a] Audio input:
    //    - Extract 15 seconds, fade in/out: atrim=0:15,asetpts=PTS-STARTPTS,afade=t=in:ss=0:d=0.5,afade=t=out:st=14.5:d=0.5[aout]
    //    - Generate animated soundwaves matching audio: [aout]asplit=2[a1][a2]; [a2]showwaves=s=600x120:mode=line:colors=0x4AE176|0x25D366:scale=cbrt,format=rgba[waves]; [stage][waves]overlay=(W-w)/2:900[vout]
    const filterComplex = [
      `[0:v]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=25:5,eq=brightness=-0.35[bg]`,
      `[0:v]scale=600:600:force_original_aspect_ratio=decrease[fg]`,
      `[bg][fg]overlay=(W-w)/2:260[stage]`,
      `[1:a]atrim=0:15,asetpts=PTS-STARTPTS,afade=t=in:ss=0:d=0.5,afade=t=out:st=14.5:d=0.5[aout]`,
      `[aout]asplit=2[a_stream][a_waves]`,
      `[a_waves]showwaves=s=600x120:mode=line:colors=0x4AE176|0x25D366:scale=cbrt,format=rgba[waves]`,
      `[stage][waves]overlay=(W-w)/2:920[vout]`,
    ].join('; ');

    const args = [
      '-y',
      '-loop', '1',
      '-i', localImage,
      '-i', localAudio,
      '-filter_complex', filterComplex,
      '-map', '[vout]',
      '-map', '[a_stream]',
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '22',
      '-pix_fmt', 'yuv420p',
      '-c:a', 'aac',
      '-b:a', '160k',
      '-ar', '44100',
      '-t', '15',
      finalOutput,
    ];

    await runFFmpeg(args);
    console.log(`✅ Finished: ${finalOutput} (${(fs.statSync(finalOutput).size / 1024 / 1024).toFixed(2)} MB)`);

    if (story.slug) {
      const aliasOutput = path.join(OUTPUT_DIR, `${story.slug}.mp4`);
      fs.copyFileSync(finalOutput, aliasOutput);
      console.log(`🔗 Copied alias: ${aliasOutput}`);
    }

    // Clean up temp downloads
    try {
      fs.unlinkSync(localImage);
      fs.unlinkSync(localAudio);
    } catch (_) {}

    return true;
  } catch (err) {
    console.error(`❌ Error rendering ${story.id}:`, err.message);
    return false;
  }
}

async function main() {
  console.log(`🚀 Starting generation of WhatsApp Status Teaser Videos...`);
  console.log(`Output folder: ${OUTPUT_DIR}\n`);

  for (const story of STORIES) {
    await generateTeaser(story);
  }

  console.log(`\n🎉 All story teasers generated successfully in ${OUTPUT_DIR}!`);
}

main().catch(console.error);
