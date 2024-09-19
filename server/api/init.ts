import weaviate, { WeaviateClient } from "weaviate-client"

export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig()

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(config.weaviateHostURL,{
    authCredentials: new weaviate.ApiKey(config.weaviateReadKey),
    headers: {
      'X-Cohere-Api-Key': config.cohereApiKey,
    }
  }
)

async function initialFetch() {
const myProductCollection = client.collections.get('TestProduct')

const response = await myProductCollection.query.fetchObjects({ limit : 20 })

return response.objects

}

  return defineEventHandler(async () => {
  
    return await initialFetch()
  })
})