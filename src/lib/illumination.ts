/**
 * Illuminated-manuscript tile: a lapis ground with gold eight-pointed stars
 * (two overlapping squares), crimson centres and gold diamonds on the edges.
 * Stars sit on the tile corners and centre, so tiles join seamlessly.
 * Colours are literal hex: an SVG used as an <img> cannot read CSS variables.
 */
export interface Palette {
  ground: string
  line: string
  accent: string
  glow: string
}

export const LIGHT: Palette = {
  ground: '#26479a',
  line: '#e2bd5c',
  accent: '#b6453a',
  glow: '#3a63b8',
}

export const DARK: Palette = {
  ground: '#1f3b7a',
  line: '#e8c670',
  accent: '#cf5a4d',
  glow: '#2d5099',
}

const TILE = 96

function star(x: number, y: number, p: Palette) {
  return (
    `<g transform="translate(${x} ${y})" fill="${p.glow}" fill-opacity=".65" stroke="${p.line}" stroke-width="1.5">` +
    `<rect x="-22" y="-22" width="44" height="44"/>` +
    `<rect x="-22" y="-22" width="44" height="44" transform="rotate(45)"/>` +
    `<circle r="7" fill="${p.accent}" stroke="${p.line}"/></g>`
  )
}

function diamond(x: number, y: number, p: Palette) {
  return `<path d="M${x} ${y - 8}L${x + 8} ${y}L${x} ${y + 8}L${x - 8} ${y}Z" fill="${p.line}"/>`
}

/** SVG data URI rasterised at `px` x `px` pixels (one tile). */
export function illuminationUri(p: Palette, px = TILE): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 ${TILE} ${TILE}">` +
    `<rect width="${TILE}" height="${TILE}" fill="${p.ground}"/>` +
    star(48, 48, p) +
    star(0, 0, p) +
    star(TILE, 0, p) +
    star(0, TILE, p) +
    star(TILE, TILE, p) +
    diamond(48, 0, p) +
    diamond(0, 48, p) +
    diamond(TILE, 48, p) +
    diamond(48, TILE, p) +
    `</svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export const ILLUMINATION_TILE = TILE
