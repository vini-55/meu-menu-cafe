import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'qaua8bm0', // Seu ID real
  dataset: 'production',
  useCdn: true, // Deixa o site rápido
  apiVersion: '2023-05-03',
})