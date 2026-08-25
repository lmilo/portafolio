"""Verifica contraste WCAG de los tokens de color. OKLCH -> sRGB -> ratio.

Uso: python3 scripts/contraste.py
Sale con codigo 1 si algun par declarado incumple su minimo.
"""
from __future__ import annotations

import math
import sys

Rgb = tuple[float, float, float]


def oklch_a_lineal(L: float, C: float, H: float) -> Rgb:
    h = math.radians(H)
    a, b = C * math.cos(h), C * math.sin(h)

    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_**3, m_**3, s_**3

    return (
        +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
    )


def a_srgb(c: float) -> float:
    c = max(0.0, min(1.0, c))
    return 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055


def oklch_a_hex(L: float, C: float, H: float) -> str:
    return '#' + ''.join(f'{round(a_srgb(c) * 255):02X}' for c in oklch_a_lineal(L, C, H))


def luminancia(L: float, C: float, H: float) -> float:
    r, g, b = (max(0.0, min(1.0, c)) for c in oklch_a_lineal(L, C, H))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(a: tuple[float, float, float], b: tuple[float, float, float]) -> float:
    la, lb = luminancia(*a), luminancia(*b)
    claro, oscuro = max(la, lb), min(la, lb)
    return (claro + 0.05) / (oscuro + 0.05)


# --- Tokens -----------------------------------------------------------------

OSCURO = {
    'fondo':        (0.17, 0.012, 250),
    'superficie':   (0.21, 0.014, 250),
    'hundido':      (0.13, 0.010, 250),
    'tinta':        (0.95, 0.008, 85),
    'tinta-media':  (0.76, 0.014, 85),
    'tinta-tenue':  (0.64, 0.014, 85),
    'linea':        (0.30, 0.012, 250),
    'linea-fuerte': (0.53, 0.018, 250),
    'acento':       (0.80, 0.130, 75),
    'acento-fg':    (0.20, 0.040, 75),
    'exito':        (0.78, 0.110, 160),
    'aviso':        (0.76, 0.140, 40),
}

CLARO = {
    'fondo':        (0.98, 0.005, 85),
    'superficie':   (1.00, 0.000, 0),
    'hundido':      (0.955, 0.006, 85),
    'tinta':        (0.22, 0.015, 250),
    'tinta-media':  (0.45, 0.015, 250),
    'tinta-tenue':  (0.52, 0.015, 250),
    'linea':        (0.90, 0.008, 250),
    'linea-fuerte': (0.62, 0.014, 250),
    'acento':       (0.48, 0.110, 65),
    'acento-fg':    (0.99, 0.005, 85),
    'exito':        (0.48, 0.090, 160),
    'aviso':        (0.50, 0.140, 40),
}

# (frente, fondo, minimo, para que)
PARES = [
    ('tinta',        'fondo',      4.5, 'texto principal'),
    ('tinta',        'superficie', 4.5, 'texto en tarjeta'),
    ('tinta-media',  'fondo',      4.5, 'texto secundario'),
    ('tinta-media',  'superficie', 4.5, 'secundario en tarjeta'),
    ('tinta-tenue',  'fondo',      4.5, 'metadatos (a cualquier tamano)'),
    ('acento',       'fondo',      4.5, 'enlaces y acento sobre pagina'),
    ('acento',       'superficie', 4.5, 'acento en tarjeta'),
    ('acento-fg',    'acento',     4.5, 'texto sobre boton de acento'),
    ('exito',        'fondo',      4.5, 'estado en produccion'),
    ('aviso',        'fondo',      4.5, 'estado en desarrollo'),
    ('linea-fuerte', 'fondo',      3.0, 'bordes de controles (WCAG 1.4.11)'),
    ('linea-fuerte', 'superficie', 3.0, 'bordes en tarjeta'),
]


def revisar(nombre: str, tokens: dict) -> list[str]:
    print(f'\n  {nombre}')
    print(f'  {"par":<42} {"ratio":>7}  {"min":>5}')
    print('  ' + '-' * 60)
    fallos = []
    for frente, fondo, minimo, para in PARES:
        r = ratio(tokens[frente], tokens[fondo])
        ok = r >= minimo
        marca = 'ok ' if ok else 'NO '
        print(f'  {marca}{frente} / {fondo:<24} {r:>6.2f}  {minimo:>5.1f}  {para}')
        if not ok:
            fallos.append(f'{nombre}: {frente}/{fondo} = {r:.2f} (min {minimo})')
    return fallos


def main() -> int:
    print('\nContraste WCAG de los tokens — calculado, no estimado')
    fallos = revisar('MODO OSCURO (canonico)', OSCURO) + revisar('MODO CLARO', CLARO)

    print('\n  Hex equivalentes (modo oscuro)')
    for nombre, v in OSCURO.items():
        print(f'    --{nombre:<14} oklch({v[0]} {v[1]} {v[2]})   {oklch_a_hex(*v)}')
    print('\n  Hex equivalentes (modo claro)')
    for nombre, v in CLARO.items():
        print(f'    --{nombre:<14} oklch({v[0]} {v[1]} {v[2]})   {oklch_a_hex(*v)}')

    if fallos:
        print(f'\n  {len(fallos)} par(es) incumplen:')
        for f in fallos:
            print(f'    - {f}')
        return 1
    print('\n  Todos los pares cumplen su minimo.\n')
    return 0


if __name__ == '__main__':
    sys.exit(main())
