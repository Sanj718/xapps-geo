declare module 'fs-backwards-stream' {
  import { Readable } from 'stream';
  function backwardsStream(filepath: string, options: any): Readable;
  export = backwardsStream;
} 