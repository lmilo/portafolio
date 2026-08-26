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
    'fondo':        (0.145, 0.006, 250),
    'superficie':   (0.20, 0.008, 250),
    'hundido':      (0.10, 0.005, 250),
    'tinta':        (0.97, 0.000, 0),
    'tinta-media':  (0.80, 0.008, 90),
    'tinta-tenue':  (0.68, 0.010, 90),
    'linea':        (0.32, 0.010, 250),
    'linea-fuerte': (0.97, 0.000, 0),
    # El amarillo es FONDO de bloque, no color de texto.
    'acento':       (0.87, 0.185, 100),
    'acento-fg':    (0.15, 0.020, 100),
    # Texto interactivo sobre el fondo de la pagina.
    'enlace':       (0.87, 0.185, 100),
    'cian':         (0.83, 0.145, 205),
    'cian-fg':      (0.15, 0.020, 205),
    'magenta':      (0.75, 0.180, 8),
    'magenta-fg':   (0.16, 0.030, 8),
    'exito':        (0.86, 0.210, 145),
    'exito-fg':     (0.15, 0.030, 145),
    'aviso':        (0.76, 0.185, 45),
    'aviso-fg':     (0.15, 0.030, 45),
}

CLARO = {
    'fondo':        (0.985, 0.008, 100),
    'superficie':   (1.00, 0.000, 0),
    'hundido':      (0.955, 0.012, 100),
    'tinta':        (0.16, 0.010, 250),
    'tinta-media':  (0.40, 0.012, 250),
    'tinta-tenue':  (0.48, 0.012, 250),
    'linea':        (0.88, 0.010, 250),
    'linea-fuerte': (0.16, 0.010, 250),
    'acento':       (0.87, 0.185, 100),
    'acento-fg':    (0.15, 0.020, 100),
    # En claro el amarillo no sirve como texto: el enlace baja a un ambar oscuro.
    'enlace':       (0.45, 0.130, 60),
    'cian':         (0.83, 0.145, 205),
    'cian-fg':      (0.15, 0.020, 205),
    'magenta':      (0.75, 0.180, 8),
    'magenta-fg':   (0.16, 0.030, 8),
    'exito':        (0.86, 0.210, 145),
    'exito-fg':     (0.15, 0.030, 145),
    'aviso':        (0.76, 0.185, 45),
    'aviso-fg':     (0.15, 0.030, 45),
}

# (frente, fondo, minimo, para que)
PARES = [
    ('tinta',        'fondo',      4.5, 'texto principal'),
    ('tinta',        'superficie', 4.5, 'texto en tarjeta'),
    ('tinta-media',  'fondo',      4.5, 'texto secundario'),
    ('tinta-media',  'superficie', 4.5, 'secundario en tarjeta'),
    ('tinta-tenue',  'fondo',      4.5, 'metadatos (a cualquier tamano)'),
    ('enlace',       'fondo',      4.5, 'texto de enlace sobre pagina'),
    ('enlace',       'superficie', 4.5, 'enlace en tarjeta'),
    ('acento-fg',    'acento',     4.5, 'texto sobre bloque amarillo'),
    ('cian-fg',      'cian',       4.5, 'texto sobre bloque cian'),
    ('magenta-fg',   'magenta',    4.5, 'texto sobre bloque magenta'),
    ('exito-fg',     'exito',      4.5, 'texto sobre bloque de exito'),
    ('aviso-fg',     'aviso',      4.5, 'texto sobre bloque de aviso'),
    ('linea-fuerte', 'fondo',      3.0, 'bordes duros (WCAG 1.4.11)'),
    ('linea-fuerte', 'superficie', 3.0, 'bordes duros en tarjeta'),
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
