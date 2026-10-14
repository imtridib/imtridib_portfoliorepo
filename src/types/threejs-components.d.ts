// The library ships no TypeScript types, so we describe just the part we use.
declare module 'threejs-components/build/cursors/tubes1.min.js' {
  const createTubesCursor: (canvas: HTMLCanvasElement, options?: unknown) => unknown
  export default createTubesCursor
}