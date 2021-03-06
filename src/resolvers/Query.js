import { getUserId } from '../utils'

const Query = {
  // Los resolvers originalmente reciben 4 paramentros parent, argumentos, contexto, información
  // parent, si existiera algun tipo que estuviera implicito en la query, lo pudieramos obtener directamente del padre.
  // Queries declaradas como root no tienen un parent xq ya se encuentran en la raíz principal.
  // argumentos, inputs del cliente o específicaciones que provienen del cliente.
  // contexto, ámbito u entorno que posee en el graphQL y poder acceder desde cualquier resolver.
  // Información,
  author: (parent, { id, orderBy, skip, take }, { prisma, request }, info) => {
    const userId = getUserId(request)

    if (!id)
      return prisma.authors.findMany({
        orderBy,
        take,
        skip,
      })

    return prisma.authors.findOne({ where: { id } })
  },
  book: (parent, { id, orderBy, skip, take }, { prisma, request }, info) => {
    const userId = getUserId(request)

    if (!id)
      return prisma.books.findMany({
        orderBy,
        take,
        skip,
      })

    return prisma.books.findOne({ where: { id } })
  },
  hello: (parent, args, ctx, info) => {
    const { name } = args
    return `Hello ${name || 'World'}`
  },
  user: (parent, { id }, { prisma }, info) => {
    if (!id) return prisma.users.findMany() // Para obtener todos los usuarios de la tabla
    return prisma.users.findOne({ where: { id } })
  },
}

export default Query
