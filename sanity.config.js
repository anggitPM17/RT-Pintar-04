import { defineConfig } from 'sanity';
import { schemaTypes } from './sanity/schema';

export default defineConfig({
  name: 'default',
  title: 'RT Pintar',

  projectId: 'uz0n2brs',
  dataset: 'production',

  schema: {
    types: schemaTypes,
  },
});
