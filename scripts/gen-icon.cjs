/**
 * Generates a valid 32x32 icon.ico for Tauri (Windows).
 * ICO: 6-byte header + 16-byte entry + BITMAPINFOHEADER (40) + XOR (32*32*4) + AND (ceil(32/8)*32)
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src-tauri/icons');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const W = 32;
const H = 32;
const headerSize = 40;
const xorRowBytes = Math.ceil((W * 4) / 4) * 4;
const xorSize = xorRowBytes * H;
const andRowBytes = Math.ceil(W / 8) * 8;
const andSize = (andRowBytes / 8) * H;
const imageSize = headerSize + xorSize + andSize;

const out = path.join(dir, 'icon.ico');
const buf = Buffer.alloc(6 + 16 + imageSize);
let off = 0;

// ICONDIR
buf.writeUInt16LE(0, off); off += 2;
buf.writeUInt16LE(1, off); off += 2;  // type ICO
buf.writeUInt16LE(1, off); off += 2;  // count

// ICONDIRENTRY
buf.writeUInt8(W, off); off += 1;
buf.writeUInt8(H, off); off += 1;
buf.writeUInt8(0, off); off += 1;   // palette
buf.writeUInt8(0, off); off += 1;
buf.writeUInt16LE(1, off); off += 2;
buf.writeUInt16LE(32, off); off += 2;  // 32bpp
buf.writeUInt32LE(imageSize, off); off += 4;
buf.writeUInt32LE(22, off); off += 4;  // offset to image

// BITMAPINFOHEADER (40 bytes)
buf.writeUInt32LE(40, off); off += 4;
buf.writeInt32LE(W, off); off += 4;
buf.writeInt32LE(H * 2, off); off += 4;  // height = 2*H for XOR+AND
buf.writeUInt16LE(1, off); off += 2;
buf.writeUInt16LE(32, off); off += 2;
buf.writeUInt32LE(0, off); off += 4;
buf.writeUInt32LE(0, off); off += 4;
buf.writeInt32LE(0, off); off += 4;
buf.writeInt32LE(0, off); off += 4;
buf.writeUInt32LE(0, off); off += 4;
buf.writeUInt32LE(0, off); off += 4;

// XOR mask: 32x32 BGRA (bottom-up), blue-ish, row-aligned
for (let y = H - 1; y >= 0; y--) {
  for (let x = 0; x < W; x++) {
    buf[off++] = 244; buf[off++] = 133; buf[off++] = 66; buf[off++] = 255;
  }
  for (let p = W * 4; p < xorRowBytes; p++) buf[off++] = 0;
}

// AND mask: all 0 (fully opaque)
for (let i = 0; i < andSize; i++) buf[off++] = 0;

fs.writeFileSync(out, buf);
console.log('Wrote', out, '(' + buf.length, 'bytes)');
