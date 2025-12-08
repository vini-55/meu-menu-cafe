import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Painel Café Luna', // AQUI você pode colocar o nome bonito (com acento e espaço)

  projectId: 'qaua8bm0', // AQUI tem que ser o código qaua8bm0 (sem espaços)
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})