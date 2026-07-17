interface PointData {
  positions: Float32Array
  count: number
}

export function sampleTextPoints(
  text: string,
  fontFace: string,
  fontSize: number = 100,
  maxPoints: number = 5000
): PointData {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return { positions: new Float32Array(), count: 0 }

  ctx.font = `${fontSize}px "${fontFace}"`
  const metrics = ctx.measureText(text)

  // Set canvas size to fit the text with some padding
  const width = Math.ceil(metrics.width) + 20
  const height = Math.ceil(fontSize * 1.2)
  canvas.width = width
  canvas.height = height

  // Redraw after resizing
  ctx.font = `${fontSize}px "${fontFace}"`
  ctx.fillStyle = 'white'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, width / 2, height / 2)

  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data
  const points: [number, number][] = []

  // Sample pixels (skip every Nth pixel for performance)
  const step = 2
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const alpha = data[(y * width + x) * 4 + 3]
      if (alpha > 128) {
        points.push([x - width / 2, -(y - height / 2)]) // Flip Y for 3D coords
      }
    }
  }

  // Cap at maxPoints
  const finalPoints = points.slice(0, maxPoints)
  const positions = new Float32Array(finalPoints.length * 3)

  for (let i = 0; i < finalPoints.length; i++) {
    positions[i * 3] = finalPoints[i][0] * 0.05 // Scale down
    positions[i * 3 + 1] = finalPoints[i][1] * 0.05
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2 // Z-jitter
  }

  return { positions, count: finalPoints.length }
}
