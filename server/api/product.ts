import weaviate, { WeaviateClient } from "weaviate-client"
import { z } from 'zod'

export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig()

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(config.weaviateHostURL,{
    authCredentials: new weaviate.ApiKey(config.weaviateReadKey),
    headers: {
      'X-Cohere-Api-Key': config.cohereApiKey,
      'X-OpenAI-Api-Key': config.openaiApiKey,
    }
  }
)

const responseSchema = z.object({
  query: z.string(),
})


async function vectorSearch(products: string) {

  const jsonProducts = JSON.parse(products)

  const myProductCollection = client.collections.get('TestProduct')

const response1 = await myProductCollection.query.nearText(jsonProducts[0].item,{ limit : 2 })
const response2 = await myProductCollection.query.nearText(jsonProducts[1].item,{ limit : 2 })
const response3 = await myProductCollection.query.nearText(jsonProducts[2].item,{ limit : 2 })
const response4 = await myProductCollection.query.nearText(jsonProducts[3].item,{ limit : 2 })

let item1 = response1.objects
let item2 = response2.objects
let item3 = response3.objects
let item4 = response4.objects

return { item1, item2, item3, item4 }
}

  return defineEventHandler<{query: { query: string } }>(async (event) => {
  
    const result = await getValidatedQuery(event, body => responseSchema.safeParse(body))
    if (!result.success)
      throw result.error.issues
  
    const productList = result.data.query
  
    return await vectorSearch(productList)
  })
})