import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const path = 'public/assets/models/panda-3d.glb';
const original = await readFile(path);
assert.equal(original.readUInt32LE(0), 0x46546c67);
assert.equal(original.readUInt32LE(4), 2);
const jsonSize = original.readUInt32LE(12);
const model = JSON.parse(original.subarray(20, 20 + jsonSize).toString());
const binStart = 20 + jsonSize + 8;
assert.equal(model.buffers.length, 1);
assert.ok(!model.buffers[0].uri);
const oldViews = structuredClone(model.bufferViews);
const oldAccessors = structuredClone(model.accessors);
const chunks = [];
let offset = 0, converted = 0;
for (const [index, view] of model.bufferViews.entries()) {
  const old = oldViews[index];
  let bytes = original.subarray(binStart + (old.byteOffset || 0), binStart + (old.byteOffset || 0) + old.byteLength);
  const accessors = model.accessors.filter(a => a.bufferView === index);
  if (view.target === 34963 && accessors.length === 1 && accessors[0].type === 'SCALAR' && accessors[0].componentType === 5125 && !accessors[0].byteOffset && !accessors[0].sparse && !view.byteStride && bytes.length === accessors[0].count * 4) {
    const values = Array.from({ length:accessors[0].count }, (_, i) => bytes.readUInt32LE(i * 4));
    if (values.every(value => value <= 65535)) {
      bytes = Buffer.alloc(values.length * 2);
      values.forEach((value, i) => bytes.writeUInt16LE(value, i * 2));
      accessors[0].componentType = 5123;
      converted++;
    }
  }
  view.byteOffset = offset;
  view.byteLength = bytes.length;
  chunks.push(bytes);
  offset += bytes.length;
  const padding = (4 - offset % 4) % 4;
  if (padding) { chunks.push(Buffer.alloc(padding)); offset += padding; }
}
model.buffers[0].byteLength = offset;
const binary = Buffer.concat(chunks);
// Check every view: geometry data is byte-identical; only index storage changes.
for (const [index, old] of oldViews.entries()) {
  const before = original.subarray(binStart + (old.byteOffset || 0), binStart + (old.byteOffset || 0) + old.byteLength);
  const view = model.bufferViews[index];
  const after = binary.subarray(view.byteOffset, view.byteOffset + view.byteLength);
  const accessorIndex = oldAccessors.findIndex(a => a.bufferView === index);
  if (accessorIndex >= 0 && oldAccessors[accessorIndex].componentType !== model.accessors[accessorIndex].componentType) {
    for (let i = 0; i < oldAccessors[accessorIndex].count; i++) assert.equal(before.readUInt32LE(i * 4), after.readUInt16LE(i * 2));
  } else assert.deepEqual(before, after);
}
const json = Buffer.from(JSON.stringify(model));
const jsonPadding = Buffer.alloc((4 - json.length % 4) % 4, 32);
const jsonChunk = Buffer.concat([json, jsonPadding]);
const header = Buffer.alloc(20);
header.writeUInt32LE(0x46546c67, 0); header.writeUInt32LE(2, 4);
header.writeUInt32LE(28 + jsonChunk.length + binary.length, 8);
header.writeUInt32LE(jsonChunk.length, 12); header.writeUInt32LE(0x4e4f534a, 16);
const binHeader = Buffer.alloc(8);
binHeader.writeUInt32LE(binary.length); binHeader.writeUInt32LE(0x004e4942, 4);
const result = Buffer.concat([header, jsonChunk, binHeader, binary]);
assert.equal(result.length, result.readUInt32LE(8));
await writeFile(path, result);
console.log(JSON.stringify({before:original.length,after:result.length,convertedIndexBuffers:converted,saved:original.length-result.length}));
