import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Produto',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Produto',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'Preço',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'image',
      title: 'Foto',
      type: 'image',
      options: {
        hotspot: true, // Permite cortar a imagem no painel
      },
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Cafés', value: 'Cafés' },
          { title: 'Salgados', value: 'Salgados' },
          { title: 'Doces', value: 'Doces' },
          { title: 'Co-Working', value: 'Co-Working' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'available',
      title: 'Disponível?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'tags',
      title: 'Tags (ex: Vegano, Hot)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})