"""Segments horodatés via sherpa-onnx whisper : python3 sherpa_segments.py <a16.wav> <model_dir> [lang]"""
import glob, json, os, subprocess, sys
import sherpa_onnx, soundfile as sf

wav, D = sys.argv[1], sys.argv[2]
lang = sys.argv[3] if len(sys.argv) > 3 else 'fr'
pick = lambda pat: sorted(glob.glob(os.path.join(D, pat)), key=len)[0]
rec = sherpa_onnx.OfflineRecognizer.from_whisper(encoder=pick('*encoder*.onnx'), decoder=pick('*decoder*.onnx'), tokens=pick('*tokens.txt'), language=lang, task='transcribe', num_threads=4)
a, sr = sf.read(wav, dtype='float32')
log = subprocess.run(['ffmpeg', '-i', wav, '-af', 'silencedetect=n=-35dB:d=0.35', '-f', 'null', '-'], capture_output=True, text=True).stderr
st = [float(l.split('silence_start: ')[1].split()[0]) for l in log.splitlines() if 'silence_start' in l]
en = [float(l.split('silence_end: ')[1].split()[0]) for l in log.splitlines() if 'silence_end' in l]
sp, prev = [], 0.0
for s, e in zip(st, en):
    if s - prev > 0.05: sp.append([prev, s])
    prev = e
if len(a) / sr - prev > 0.2: sp.append([prev, len(a) / sr])
ch = []
for s, e in sp:
    while e - s > 25: ch.append([s, s + 20]); s += 20
    if ch and e - ch[-1][0] <= 7.0 and s - ch[-1][1] < 0.6: ch[-1][1] = e
    else: ch.append([s, e])
out = []
for s, e in ch:
    stream = rec.create_stream(); stream.accept_waveform(sr, a[int(max(0, s - 0.1) * sr):int(min(e + 0.5, len(a) / sr) * sr)]); rec.decode_stream(stream)
    out.append({'s': round(s, 2), 'e': round(e, 2), 't': stream.result.text.strip()})
print(json.dumps(out, ensure_ascii=False))
