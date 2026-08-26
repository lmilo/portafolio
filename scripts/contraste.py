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
    # Aurora: azul-violeta profundo, no negro. El color de fondo tiene que
    # dejar sitio a las auroras sin que se vean sucias encima.
    'fondo':        (0.155, 0.035, 275),
    'superficie':   (0.225, 0.035, 275),
    'hundido':      (0.115, 0.030, 275),
    'tinta':        (0.975, 0.005, 275),
    'tinta-media':  (0.815, 0.020, 275),
    'tinta-tenue':  (0.690, 0.030, 275),
    'linea':        (0.330, 0.030, 275),
    'linea-fuerte': (0.560, 0.045, 275),
    # Los tres colores de la aurora.
    'violeta':      (0.700, 0.190, 300),
    'cian':         (0.790, 0.140, 205),
    'rosa':         (0.740, 0.180, 350),
    'acento':       (0.760, 0.150, 285),
    'acento-fg':    (0.150, 0.050, 285),
    'exito':        (0.820, 0.170, 160),
    'aviso':        (0.790, 0.150, 60),
}

CLARO = {
    'fondo':        (0.980, 0.010, 275),
    'superficie':   (1.000, 0.000, 0),
    'hundido':      (0.955, 0.018, 275),
    'tinta':        (0.200, 0.040, 275),
    'tinta-media':  (0.430, 0.045, 275),
    'tinta-tenue':  (0.510, 0.045, 275),
    'linea':        (0.900, 0.020, 275),
    'linea-fuerte': (0.640, 0.040, 275),
    'violeta':      (0.480, 0.200, 300),
    'cian':         (0.520, 0.130, 205),
    'rosa':         (0.540, 0.200, 350),
    'acento':       (0.480, 0.190, 285),
    'acento-fg':    (0.990, 0.005, 285),
    'exito':        (0.470, 0.130, 160),
    'aviso':        (0.520, 0.140, 60),
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
    ('violeta',      'fondo',      4.5, 'violeta de la aurora sobre pagina'),
    ('cian',         'fondo',      4.5, 'cian de la aurora sobre pagina'),
    ('rosa',         'fondo',      4.5, 'rosa de la aurora sobre pagina'),
    ('exito',        'fondo',      4.5, 'estado en produccion'),
    ('aviso',        'fondo',      4.5, 'estado en desarrollo'),
    ('linea-fuerte', 'fondo',      3.0, 'bordes de control (WCAG 1.4.11)'),
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
