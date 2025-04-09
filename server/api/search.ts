import weaviate, { WeaviateClient } from "weaviate-client"
import { z } from 'zod'

export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig()

  const client: WeaviateClient = await weaviate.connectToWeaviateCloud(config.weaviateHostURL,{
      authCredentials: new weaviate.ApiKey(config.weaviateReadKey),
      headers: {
        'X-Cohere-Api-Key': config.cohereApiKey,
      }
    }
)

const responseSchema = z.object({
  query: z.string(),
})

async function vectorSearch(searchTerm:string) {
  const myProductCollection = client.collections.use('TestProduct')

  const response = await myProductCollection.query.hybrid(searchTerm, 
     { limit: 5,
    alpha: 0.9 
  })
  return response.objects

}

  return defineEventHandler<{query: { query: string } }>(async (event) => {
  
    const result = await getValidatedQuery(event, body => responseSchema.safeParse(body))
    if (!result.success)
      throw result.error.issues
  
    const searchTerm = result.data.query
  
    return await vectorSearch(searchTerm)
  })
})