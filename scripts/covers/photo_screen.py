"""Put a real Dulce screenshot onto a device screen in a photo.

python photo_screen.py photo.jpg screen.png out.jpg tlx,tly trx,try brx,bry blx,bly [--white] [--skin] [--radius 0.12]
  corners: the visible screen glass, clockwise from top-left
  --white  only replace bright, unsaturated pixels inside the quad (blank white screen; keeps fingers/notch)
  --skin   keep skin-coloured pixels inside the quad (a finger over the screen)
"""
import sys, cv2, numpy as np

a = sys.argv[1:]
photo_p, shot_p, out_p = a[:3]
pts = np.array([[float(v) for v in p.split(',')] for p in a[3:7]], np.float32)
white = '--white' in a
skin = '--skin' in a
radius = float(a[a.index('--radius') + 1]) if '--radius' in a else 0.12

photo = cv2.imread(photo_p)
shot = cv2.imread(shot_p)
H, W = photo.shape[:2]
h, w = shot.shape[:2]

# rounded-corner mask in screenshot space
r = int(w * radius)
rm = np.zeros((h, w), np.uint8)
cv2.rectangle(rm, (r, 0), (w - r, h), 255, -1)
cv2.rectangle(rm, (0, r), (w, h - r), 255, -1)
for cx, cy in [(r, r), (w - r, r), (r, h - r), (w - r, h - r)]:
    cv2.circle(rm, (cx, cy), r, 255, -1)

M = cv2.getPerspectiveTransform(np.array([[0, 0], [w, 0], [w, h], [0, h]], np.float32), pts)
warped = cv2.warpPerspective(shot, M, (W, H), flags=cv2.INTER_LANCZOS4)
mask = cv2.warpPerspective(rm, M, (W, H), flags=cv2.INTER_LINEAR)

hsv = cv2.cvtColor(photo, cv2.COLOR_BGR2HSV)
if white:
    wm = cv2.inRange(hsv, (0, 0, 95), (180, 70, 255))
    wm = cv2.morphologyEx(wm, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    wm = cv2.dilate(wm, np.ones((3, 3), np.uint8))
    mask = cv2.bitwise_and(mask, wm)
if skin:
    sk = cv2.inRange(hsv, (0, 35, 90), (25, 200, 255))
    sk = cv2.morphologyEx(sk, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    # keep only big skin blobs (fingers), fill holes, smooth the outline
    n, lab, st, _ = cv2.connectedComponentsWithStats(sk)
    big = np.zeros_like(sk)
    for i in range(1, n):
        if st[i, cv2.CC_STAT_AREA] > 1500: big[lab == i] = 255
    big = cv2.morphologyEx(big, cv2.MORPH_CLOSE, np.ones((25, 25), np.uint8))
    big = cv2.GaussianBlur(big, (0, 0), 2.5)
    mask = (mask.astype(np.float32) * (1 - big.astype(np.float32) / 255)).astype(np.uint8)

alpha = cv2.GaussianBlur(mask, (3, 3), 0).astype(np.float32)[..., None] / 255
# match the photo: slight softness, a touch of the photo's own light, faint glass sheen
warped = cv2.GaussianBlur(warped, (0, 0), 0.6)
glare = np.zeros((H, W), np.float32)
x0, y0 = pts[:, 0].min(), pts[:, 1].min()
x1, y1 = pts[:, 0].max(), pts[:, 1].max()
yy, xx = np.mgrid[0:H, 0:W]
t = ((xx - x0) / max(1, x1 - x0) + (yy - y0) / max(1, y1 - y0)) / 2
glare = np.clip(0.07 - 0.07 * t, 0, 0.07)[..., None]
screen = warped.astype(np.float32) * 0.96 + 255 * glare
out = screen * alpha + photo.astype(np.float32) * (1 - alpha)
cv2.imwrite(out_p, np.clip(out, 0, 255).astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 90])
print(out_p)
