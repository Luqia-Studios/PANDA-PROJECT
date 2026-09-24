"""Usage: python scripts/prepare-gallery.py SOURCE_DIRECTORY (Pillow + pillow-heif)."""
import json
import sys
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import pillow_heif

pillow_heif.register_heif_opener()
source = Path(sys.argv[1])
root = Path(__file__).resolve().parent.parent
output = root / 'public/assets/images/gallery'
output.mkdir(parents=True, exist_ok=True)
names = ['20260515_083022.heic', '20260516_191253.heic', '20260517_170151.heic', '20260518_174329.heic', '20260519_182430.heic', '20260527_122305.heic', 'IMG-20260715-WA0008.jpg', 'IMG-20260802-WA0010.jpg', 'IMG-20260808-WA0010.jpg', 'IMG-20260808-WA0015.jpg', 'IMG-20260808-WA0018.jpg', 'IMG-20260828-WA0009.jpg', '20260902_135932.jpg', '20260902_172145.jpg', '20260903_130455.jpg', '20260903_130959.jpg', 'IMG-20260904-WA0022.jpg', 'IMG-20260904-WA0025.jpg']
manifest = []
sheet = Image.new('RGB', (900, 960), '#eeeeee')
draw = ImageDraw.Draw(sheet)
for index, name in enumerate(names):
    with Image.open(source / name) as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
    entry = {'id': Path(name).stem.lower(), 'width': photo.width, 'height': photo.height}
    for variant, bound, quality in [('thumb', 160, 65), ('small', 640, 74), ('preview', 1120, 77), ('full', 1920, 82)]:
        image = photo.copy()
        image.thumbnail((bound, bound), Image.Resampling.LANCZOS)
        image.save(output / f'{entry["id"]}-{variant}.webp', 'WEBP', quality=quality, method=6, exif=b'', icc_profile=b'')
    tile = photo.copy()
    tile.thumbnail((220, 155))
    x, y = (index % 4) * 225, (index // 4) * 192
    sheet.paste(tile, (x + (225 - tile.width) // 2, y))
    draw.text((x + 5, y + 158), name, fill='black')
    manifest.append(entry)
    print(name, flush=True)
(root / 'public/proposta-partner/projects/pandanna/gallery/photos.js').write_text('window.PANDA_GALLERY_PHOTOS = ' + json.dumps(manifest, indent=2) + ';\n', encoding='utf-8')
sheet.save(root / '.tmp/gallery-contact.jpg')
total = sum((source / name).stat().st_size for name in names)
for variant in ['thumb', 'small', 'preview', 'full']:
    sizes = [p.stat().st_size for p in output.glob(f'*-{variant}.webp')]
    print(variant, 'total bytes:', sum(sizes), 'max bytes:', max(sizes))
print('Original bytes:', total)
