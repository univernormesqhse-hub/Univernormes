#!/usr/bin/env python3
"""Bibliothèque de sound design UNIVERSNORMES (sons synthétisés, libres de droits) → public/sfx2/."""
import os
import numpy as np
import wave

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'sfx2')
rng = np.random.default_rng(7)


def save(name, x, gain=0.9):
    x = np.asarray(x, dtype=np.float64)
    if x.ndim == 1:
        x = np.stack([x, x], axis=1)
    m = np.max(np.abs(x)) or 1
    x = (x / m * gain * 32767).astype(np.int16)
    with wave.open(os.path.join(OUT, name + '.wav'), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(x.tobytes())


def t(d):
    return np.arange(int(SR * d)) / SR


def env(d, a=0.005, r=None, curve=4):
    n = int(SR * d); e = np.ones(n)
    na = max(1, int(SR * a)); e[:na] = np.linspace(0, 1, na)
    tail = np.linspace(0, 1, n - na)
    e[na:] = (1 - tail) ** curve if r is None else np.exp(-tail * d / r)
    return e


def lowpass(x, k):
    k = max(1, int(k)); c = np.cumsum(np.insert(x, 0, 0))
    y = (c[k:] - c[:-k]) / k
    return np.concatenate([y, np.zeros(len(x) - len(y))])


def noise(d):
    return rng.standard_normal(int(SR * d))


# Ambiance d'usine (boucle 30 s) : bourdonnement 50/100 Hz, ventilation, roulement, chocs lointains
d = 30; tt = t(d)
hum = 0.5 * np.sin(2 * np.pi * 50 * tt) + 0.3 * np.sin(2 * np.pi * 100 * tt + 0.3) + 0.12 * np.sin(2 * np.pi * 150 * tt)
hum *= 0.85 + 0.15 * np.sin(2 * np.pi * 0.11 * tt)
air = lowpass(noise(d), 40) * 0.8
roll = lowpass(noise(d), 12) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.7 * tt) ** 2) * 0.25
amb = hum * 0.35 + air + roll
for st in [3.1, 8.7, 14.2, 19.9, 25.3]:
    i = int(st * SR); n = int(0.6 * SR)
    clank = (np.sin(2 * np.pi * 820 * t(0.6)) + 0.6 * np.sin(2 * np.pi * 1310 * t(0.6))) * env(0.6, r=0.12)
    amb[i:i + n] += lowpass(clank, 6) * 0.35
fade = int(0.5 * SR); amb[:fade] *= np.linspace(0, 1, fade); amb[-fade:] *= np.linspace(1, 0, fade)
L = amb + 0.05 * lowpass(noise(d), 30); R = amb + 0.05 * lowpass(noise(d), 30)
save('ambiance-usine', np.stack([L, R], axis=1), 0.8)

# Impact grave (deep hit) : sub qui chute + transitoire
tt = t(1.4); f = 90 * np.exp(-tt * 3) + 38
sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(1.4, r=0.35)
save('deep-hit', sub + lowpass(noise(1.4), 3) * env(1.4, r=0.02) * 0.6)

# Bass hit court
tt = t(0.7); f = 120 * np.exp(-tt * 8) + 45
save('bass-hit', np.sin(2 * np.pi * np.cumsum(f) / SR) * env(0.7, r=0.15))

# Tension (drone grave qui monte, 4 s)
tt = t(4.0); f = 55 + 30 * tt / 4
dr = np.sin(2 * np.pi * np.cumsum(f) / SR) + 0.5 * np.sin(2 * np.pi * np.cumsum(f * 1.5) / SR)
dr += lowpass(noise(4.0), 20) * 0.6
save('tension', dr * np.linspace(0, 1, len(tt)) ** 1.5, 0.7)

# Riser (bruit filtré qui monte, 2 s)
tt = t(2.0); n = noise(2.0); k = np.linspace(60, 2, len(tt)).astype(int)
r = np.array([0.0] * len(n)); c = np.cumsum(np.insert(n, 0, 0))
for i in range(len(n)):
    kk = k[i]; r[i] = (c[i + 1] - c[max(0, i + 1 - kk)]) / kk
save('riser', r * np.linspace(0, 1, len(tt)) ** 2, 0.7)

# Whoosh doux
tt = t(0.6); n = noise(0.6); e = np.sin(np.pi * np.linspace(0, 1, len(tt))) ** 2
save('soft-whoosh', lowpass(n, 18) * e, 0.6)

# Tick (coche) et clic de validation
save('tick', np.sin(2 * np.pi * 2400 * t(0.05)) * env(0.05, r=0.008), 0.7)
x = np.concatenate([np.sin(2 * np.pi * 1800 * t(0.03)) * env(0.03, r=0.006), np.zeros(int(0.05 * SR)), np.sin(2 * np.pi * 2600 * t(0.04)) * env(0.04, r=0.008)])
save('validation', x, 0.7)

# Notification (deux tons)
x = np.concatenate([np.sin(2 * np.pi * 880 * t(0.12)) * env(0.12, r=0.06), np.sin(2 * np.pi * 1320 * t(0.25)) * env(0.25, r=0.1)])
save('notification', x, 0.6)

# Page tournée
tt = t(0.45); n = noise(0.45); e = np.sin(np.pi * np.linspace(0, 1, len(tt))) ** 0.6
save('page', (n - lowpass(n, 6)) * e * (0.6 + 0.4 * np.sin(2 * np.pi * 9 * tt)), 0.5)

# Stylo qui écrit (1,2 s)
tt = t(1.2); n = noise(1.2) - lowpass(noise(1.2), 4)
mod = np.clip(np.sin(2 * np.pi * 7 * tt + np.sin(2 * np.pi * 2.3 * tt) * 2), 0, 1)
save('stylo', n * mod * env(1.2, a=0.05, curve=0.5), 0.35)

# Signature (paraphe rapide)
tt = t(0.6); n = noise(0.6) - lowpass(noise(0.6), 3)
save('signature', n * np.sin(np.pi * np.linspace(0, 1, len(tt))) * (0.5 + 0.5 * np.sin(2 * np.pi * 14 * tt)), 0.4)

# Tampon
save('tampon', lowpass(noise(0.35), 5) * env(0.35, r=0.04) + np.sin(2 * np.pi * 70 * t(0.35)) * env(0.35, r=0.06))

# Cadenas (clic métallique)
x = (np.sin(2 * np.pi * 3100 * t(0.08)) + np.sin(2 * np.pi * 4700 * t(0.08))) * env(0.08, r=0.01)
y = (np.sin(2 * np.pi * 2300 * t(0.12)) + 0.5 * np.sin(2 * np.pi * 5200 * t(0.12))) * env(0.12, r=0.02)
save('cadenas', np.concatenate([x, np.zeros(int(0.06 * SR)), y]), 0.7)

# Alarme (bips industriels, 1,6 s)
beeps = []
for i in range(4):
    beeps += [np.sign(np.sin(2 * np.pi * 950 * t(0.2))) * 0.5 * env(0.2, a=0.01, curve=0.3), np.zeros(int(0.2 * SR))]
save('alarme', lowpass(np.concatenate(beeps), 3), 0.45)

# Signature sonore UNIVERSNORMES : sub doux + accord cristallin
tt = t(2.6)
chord = sum(np.sin(2 * np.pi * f * tt) * a for f, a in [(523.25, 0.5), (659.25, 0.35), (783.99, 0.3), (1046.5, 0.18)])
sig = chord * env(2.6, a=0.02, r=0.9) + np.sin(2 * np.pi * 65 * tt) * env(2.6, a=0.01, r=0.4) * 0.8
save('signature-marque', sig, 0.7)
print('ok', sorted(os.listdir(OUT)))
