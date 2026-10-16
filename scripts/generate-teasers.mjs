import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import { createCanvas } from '@napi-rs/canvas';

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
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

function runFFmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(FFMPEG_PATH, args, { stdio: ['ignore', 'ignore', 'pipe'] });
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

/**
 * Creates a crystal-clear 720x1280 transparent PNG with:
 * - Brand pill badge at top
 * - Category / subtitle tag in warm African gold
 * - Artwork outline frame
 * - Story Title (bold, crisp, wrapped if long)
 * - Narration sub-label
 * - Story link & CTA sticker pill at bottom
 * - 0:15 Teaser badge
 */
function createStoryOverlay(story, outPath) {
  const width = 720;
  const height = 1280;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, width, height);

  // Helper for headphones icon
  function drawHeadphones(cx, cy, size = 11, color = '#4ade80') {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy, size, Math.PI, 0, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.roundRect(cx - size - 2, cy - 2, 5, 9, 2);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(cx + size - 3, cy - 2, 5, 9, 2);
    ctx.fill();
    ctx.restore();
  }

  // Helper for pin / badge icon
  function drawPin(cx, cy, color = '#4ade80') {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy - 2, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy - 2, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 1. Top Brand Pill Badge
  ctx.save();
  const brandText = 'OUR MUMU DON DO • AFRICAN HERITAGE';
  ctx.font = 'bold 13px Arial';
  const brandMetrics = ctx.measureText(brandText);
  const brandWidth = brandMetrics.width + 54;
  const brandHeight = 34;
  const brandX = (width - brandWidth) / 2;
  const brandY = 85;

  ctx.fillStyle = 'rgba(16, 185, 129, 0.22)';
  ctx.beginPath();
  ctx.roundRect(brandX, brandY, brandWidth, brandHeight, 17);
  ctx.fill();

  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  drawPin(brandX + 18, brandY + brandHeight / 2);

  ctx.fillStyle = '#4ade80';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(brandText, brandX + 32, brandY + brandHeight / 2);
  ctx.restore();

  // 2. Category / Subtitle Tag
  ctx.save();
  const subText = (story.subtitle || 'AFRICAN HISTORICAL STORY').toUpperCase();
  ctx.font = 'bold 13px Arial';
  ctx.fillStyle = '#fbbf24'; // Warm gold
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(subText, width / 2, 142);
  ctx.restore();

  // 3. Cover art border frame
  ctx.save();
  const artSize = 460;
  const artX = (width - artSize) / 2;
  const artY = 190;
  ctx.strokeStyle = 'rgba(74, 222, 128, 0.5)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(artX - 2, artY - 2, artSize + 4, artSize + 4, 24);
  ctx.stroke();
  ctx.restore();

  // 4. Story Title (Large, crisp, prominent typography)
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 34px Arial';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 4;

  const title = story.title;
  const titleMetrics = ctx.measureText(title);
  if (titleMetrics.width > width - 80) {
    const words = title.split(' ');
    const mid = Math.ceil(words.length / 2);
    const line1 = words.slice(0, mid).join(' ');
    const line2 = words.slice(mid).join(' ');
    ctx.fillText(line1, width / 2, 695);
    ctx.fillText(line2, width / 2, 740);
  } else {
    ctx.fillText(title, width / 2, 715);
  }
  ctx.restore();

  // 5. Narration Subtitle
  ctx.save();
  ctx.font = '16px Arial';
  ctx.fillStyle = '#cbd5e1';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Story Narration • Official Sound Teaser', width / 2, 785);
  ctx.restore();

  // (Soundwaves from FFmpeg will animate between y=825 and y=945)

  // 6. Story Link & CTA Sticker Pill
  ctx.save();
  const ctaText = 'Listen to full story at our-mumu-don-do.sabiai.work';
  ctx.font = 'bold 16px Arial';
  const ctaMetrics = ctx.measureText(ctaText);
  const ctaWidth = ctaMetrics.width + 56;
  const ctaHeight = 52;
  const ctaX = (width - ctaWidth) / 2;
  const ctaY = 1000;

  ctx.shadowColor = 'rgba(34, 197, 94, 0.4)';
  ctx.shadowBlur = 18;

  ctx.fillStyle = 'rgba(9, 14, 24, 0.94)';
  ctx.beginPath();
  ctx.roundRect(ctaX, ctaY, ctaWidth, ctaHeight, 26);
  ctx.fill();

  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 2;
  ctx.stroke();

  drawHeadphones(ctaX + 24, ctaY + ctaHeight / 2, 9, '#4ade80');

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'transparent';
  ctx.fillText(ctaText, ctaX + 42, ctaY + ctaHeight / 2);
  ctx.restore();

  // 7. Time Badge
  ctx.save();
  const timerText = '0:15 Official Teaser';
  ctx.font = 'bold 13px Arial';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(timerText, width / 2, 1075);
  ctx.restore();

  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
}

async function generateTeaser(story) {
  const tmpDir = path.join(projectRoot, '.tmp-teaser');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const ext = path.extname(story.imagePath) || '.png';
  const localImage = path.join(tmpDir, `${story.id}${ext}`);
  const localAudio = path.join(tmpDir, `${story.id}.mp3`);
  const localOverlay = path.join(tmpDir, `${story.id}-overlay.png`);
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

    console.log(`🎨 Generating typography, badge & story link overlay...`);
    createStoryOverlay(story, localOverlay);

    console.log(`🎥 Rendering 15-second 9:16 audiogram video with animated soundwaves & titles...`);

    // Complex filter breakdown:
    // 0:v - Image cover
    // 1:a - Audio track
    // 2:v - Overlay PNG with Title, Subtitle, Badges, and Link
    const filterComplex = [
      `[0:v]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=25:5,eq=brightness=-0.30[bg]`,
      `[0:v]scale=460:460:force_original_aspect_ratio=decrease[fg]`,
      `[bg][fg]overlay=(W-w)/2:190[stage1]`,
      `[1:a]atrim=0:15,asetpts=PTS-STARTPTS,afade=t=in:ss=0:d=0.5,afade=t=out:st=14.5:d=0.5[aout]`,
      `[aout]asplit=2[a_stream][a_waves]`,
      `[a_waves]showwaves=s=540x110:mode=line:colors=0x4AE176|0x22C55E:scale=cbrt,format=rgba[waves]`,
      `[stage1][waves]overlay=(W-w)/2:855[stage2]`,
      `[stage2][2:v]overlay=0:0[vout]`,
    ].join('; ');

    const args = [
      '-y',
      '-loop', '1',
      '-i', localImage,
      '-i', localAudio,
      '-loop', '1',
      '-i', localOverlay,
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
      fs.unlinkSync(localOverlay);
    } catch (_) {}

    return true;
  } catch (err) {
    console.error(`❌ Error rendering ${story.id}:`, err.message);
    return false;
  }
}

async function main() {
  console.log(`🚀 Starting generation of WhatsApp Status & Instagram Teaser Videos with Titles & Links...`);
  console.log(`Output folder: ${OUTPUT_DIR}\n`);

  for (const story of STORIES) {
    await generateTeaser(story);
  }

  console.log(`\n🎉 All story teasers generated successfully in ${OUTPUT_DIR}!`);
}

main().catch(console.error);
