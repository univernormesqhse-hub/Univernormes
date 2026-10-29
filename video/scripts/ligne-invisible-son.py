"""Bande-son originale de « La ligne invisible » — 100 % synthétisée (numpy), aucun échantillon protégé.
Couches : drone de nappe (la mineur → la majeur au lever du jour), pulsation de basse, tic-tac du risque,
montées (riser) avant chaque acte, impacts graves, étincelle métallique, gel / rembobinage, éclats,
chutes des blocs de la hiérarchie, cloches PDCA, accord final. Sortie : WAV stéréo 48 kHz."""
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt
SR = 48000; DUR = 72.0; N = int(SR * DUR)
t = np.arange(N) / SR
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(7)
def env(a, b, fade=1.0):
    e = np.clip((t - a) / fade, 0, 1) * np.clip((b - t) / fade, 0, 1); return e
def add(sig, at, gain=1.0, pan=0.0):
    i = int(at * SR); n = min(len(sig), N - i)
    if n <= 0: return
    L[i:i + n] += sig[:n] * gain * (1 - max(0, pan)); R[i:i + n] += sig[:n] * gain * (1 + min(0, pan))
def lp(x, f): return sosfilt(butter(2, f, 'low', fs=SR, output='sos'), x)
def hp(x, f): return sosfilt(butter(2, f, 'high', fs=SR, output='sos'), x)
def bp(x, a, b): return sosfilt(butter(2, [a, b], 'band', fs=SR, output='sos'), x)
def saw(f, tt): return 2 * ((tt * f) % 1) - 1
# ── drone de nappe : la mineur (A1 E2 A2 C3) puis la majeur au lever du jour ──
minor = [55, 82.41, 110, 130.81]; major = [55, 82.41, 110, 138.59, 164.81]
day = np.clip((t - 66) / 3, 0, 1)
drone = np.zeros(N)
for k, f in enumerate(minor):
    drone += (saw(f * (1 + 0.003 * k), t) + saw(f * (1 - 0.004 * k), t)) * (1 - day if f == 130.81 else 1)
for f in major[3:]:
    drone += (saw(f, t) + saw(f * 1.004, t)) * day
lfo = 0.6 + 0.4 * np.sin(2 * np.pi * 0.08 * t)
drone = lp(drone, 900) * lfo
dvol = 0.05 * np.clip((t - 2.4) / 3, 0, 1) + 0.03 * day
add(drone * dvol, 0, 1.0)
# ── pulsation de basse (95 bpm) actes 2 à 6 ──
bpm = 95; beat = 60 / bpm
for k in range(int(64 / beat)):
    at = 10 + k * beat
    if at > 65.5: break
    if 40.3 < at < 43.0: continue
    n = int(0.35 * SR); tt = np.arange(n) / SR
    kick = np.sin(2 * np.pi * (48 + 60 * np.exp(-tt * 28)) * tt) * np.exp(-tt * 9)
    g = 0.28 if 33.6 < at < 49.6 else 0.22
    add(kick, at, g)
    if k % 2 == 1 and at > 22:
        hh = hp(rng.standard_normal(int(0.05 * SR)), 7000) * np.exp(-np.arange(int(0.05 * SR)) / SR * 70)
        add(hh, at, 0.05, pan=0.3)
# ── tic-tac du risque ──
for k in range(int(9.6 / 0.5)):
    at = 23.2 + k * 0.5; n = int(0.03 * SR); tt = np.arange(n) / SR
    add(np.sin(2 * np.pi * (2400 if k % 2 else 1800) * tt) * np.exp(-tt * 160), at, 0.08, pan=-0.4 if k % 2 else 0.4)
# ── montées et impacts ──
def riser(d=1.6):
    n = int(d * SR); tt = np.arange(n) / SR
    x = bp(rng.standard_normal(n), 300, 6000) * (tt / d) ** 2
    x += np.sin(2 * np.pi * (200 * (tt / d) ** 2 * 3 + 80) * tt) * (tt / d) ** 3 * 0.4
    return x
def impact(big=1.0):
    n = int(2.5 * SR); tt = np.arange(n) / SR
    sub = np.sin(2 * np.pi * (38 + 40 * np.exp(-tt * 6)) * tt) * np.exp(-tt * 2.2)
    noise = lp(rng.standard_normal(n), 1800) * np.exp(-tt * 7)
    return (sub * 0.9 + noise * 0.5) * big
for at in [9.6, 22.6, 33.6, 49.6, 59.6, 66.0]:
    add(riser(1.6), at - 1.6, 0.16)
    add(impact(), at, 0.55)
# ── étincelle : sifflement descendant puis frappe métallique ──
n = int(2.0 * SR); tt = np.arange(n) / SR
add(np.sin(2 * np.pi * (3200 - 1400 * tt) * tt) * 0.06 * np.clip(tt / 0.3, 0, 1), 0.2, 1.0)
n = int(1.8 * SR); tt = np.arange(n) / SR
metal = sum(np.sin(2 * np.pi * f * tt) * np.exp(-tt * d) for f, d in [(523, 3), (1347, 4), (2210, 6), (3900, 9)])
add(metal * 0.12 + impact(0.9)[:n] * 0.8, 2.2, 0.6)
add(hp(rng.standard_normal(int(1.2 * SR)), 2500) * np.exp(-np.arange(int(1.2 * SR)) / SR * 3) * 0.12, 2.2, 1.0, pan=0.2)
# ── allumage du site : claquements de projecteurs ──
for k, at in enumerate([3.6, 4.4, 5.2, 6.0, 6.8]):
    n = int(0.25 * SR); tt = np.arange(n) / SR
    add(lp(rng.standard_normal(n), 3000) * np.exp(-tt * 30) + np.sin(2 * np.pi * 90 * tt) * np.exp(-tt * 20), at, 0.25, pan=(-1) ** k * 0.5)
# ── scanner : balayage + bips de détection des dangers ──
add(bp(rng.standard_normal(int(12 * SR)), 400, 1200) * 0.02 * (0.5 + 0.5 * np.sin(2 * np.pi * 0.0875 * np.arange(int(12 * SR)) / SR)), 9.8, 1.0)
for at in [12.4, 14.2, 16.0, 17.8]:
    n = int(0.4 * SR); tt = np.arange(n) / SR
    add((np.sin(2 * np.pi * 880 * tt) + 0.5 * np.sin(2 * np.pi * 1320 * tt)) * np.exp(-tt * 8), at, 0.12)
    add(impact(0.3), at, 0.3)
# ── Reason : trajectoire, gel, rembobinage, blocage ──
n = int(4.4 * SR); tt = np.arange(n) / SR
add(np.sin(2 * np.pi * (110 + 60 * tt / 4.4) * tt) * 0.06 + bp(rng.standard_normal(n), 800, 2500) * 0.03, 36.0, 1.0)
n = int(0.6 * SR); tt = np.arange(n) / SR
add(np.sin(2 * np.pi * 70 * tt * (1 - tt)) * np.exp(-tt * 2) * 0.4, 40.4, 1.0)
n = int(1.4 * SR); rv = riser(1.4)[::-1]
add(rv * 0.25, 41.0, 1.0)
add(riser(0.6) * 0.2, 42.4, 1.0)
n = int(2.0 * SR); tt = np.arange(n) / SR
add(np.sin(2 * np.pi * (110 + 60 * tt / 2) * tt) * 0.05, 43.0, 1.0)
shat = hp(rng.standard_normal(int(1.5 * SR)), 3000) * np.exp(-np.arange(int(1.5 * SR)) / SR * 4)
add(shat * 0.35 + impact(1.1)[:int(1.5 * SR)] * 0.7, 45.1, 0.7)
# ── hiérarchie : chutes de blocs ──
for k, at in enumerate([50.95, 52.45, 53.95, 55.45, 56.95]):
    add(impact(0.6 - k * 0.05), at, 0.5, pan=(k - 2) * 0.15)
# ── PDCA : cloches FM ──
for k, (at, f) in enumerate([(60.3, 440), (61.6, 554.37), (62.9, 659.25), (64.2, 880)]):
    n = int(2.4 * SR); tt = np.arange(n) / SR
    bell = np.sin(2 * np.pi * f * tt + 2.5 * np.exp(-tt * 3) * np.sin(2 * np.pi * f * 1.4 * tt)) * np.exp(-tt * 1.6)
    add(bell, at, 0.16, pan=(-0.5, 0.5, -0.3, 0.3)[k])
for k in range(4):
    add(impact(0.4), 63.4 + k * 0.35, 0.3)
# ── finale : accord de la majeur + signature ──
n = int(6 * SR); tt = np.arange(n) / SR
chord = sum(np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * 2 * f * tt) for f in [220, 277.18, 329.63, 440, 554.37])
add(lp(chord, 3000) * np.clip(tt / 1.5, 0, 1) * np.clip((6 - tt) / 1.2, 0, 1) * 0.05, 66.0, 1.0)
for k, f in enumerate([880, 1108.73, 1318.51]):
    nn = int(2 * SR); tt2 = np.arange(nn) / SR
    add(np.sin(2 * np.pi * f * tt2) * np.exp(-tt2 * 2.2), 68.8 + k * 0.12, 0.08)
# ── master : réverbération légère (échos), normalisation ──
def verb(x):
    y = x.copy()
    for d, g in [(0.031, 0.35), (0.047, 0.3), (0.071, 0.25), (0.113, 0.18), (0.173, 0.12)]:
        k = int(d * SR); y[k:] += x[:-k] * g
    return y
L = verb(L); R = verb(R)
fade = np.clip((DUR - t) / 0.8, 0, 1); L *= fade; R *= fade
peak = max(np.abs(L).max(), np.abs(R).max())
out = np.stack([L, R], 1) / peak * 0.89
wavfile.write('public/ligne-invisible/bande-son.wav', SR, (out * 32767).astype(np.int16))
print('ok', peak)
