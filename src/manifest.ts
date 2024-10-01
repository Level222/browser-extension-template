import { ManifestV3Export } from '@crxjs/vite-plugin';

const manifest = {
  manifest_version: 3,
  name: 'browser-extension-template',
  version: '1.0.0',
} satisfies ManifestV3Export;

export default manifest;
