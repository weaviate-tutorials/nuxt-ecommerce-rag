import weaviate, { WeaviateClient } from "weaviate-client"
import { z } from 'zod'

export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig()

  const client: WeaviateClient = await weaviate.connectToWeaviateCloud(config.weaviateHostURL, {
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



  async function vectorSearch(searchTerm: string) {
    const myTrailCollection = client.collections.get('TestTrail')

    const response = await myTrailCollection.generate.nearText(searchTerm, {
      groupedTask: `i want you to be a core planner that thinks about all the equipment related hiking.
    someone wants to go on a hike they described as "${searchTerm}". using the information you receive below
    give them one recommendation for a hike to take in markdown including details like location, difficulty and length

    i also want you to output 4 essential items in json format that they might need to buy to go on this hike successfully
    and safely. before the json place this character "@"

    place recommendations first and json after.. json should look like this [{item:"description"}]
    `
    }, { limit: 3 })

    return response

  }

  return defineEventHandler<{ query: { query: string } }>(async (event) => {

    const result = await getValidatedQuery(event, body => responseSchema.safeParse(body))
    if (!result.success)
      throw result.error.issues

    const searchTerm = result.data.query

    return await vectorSearch(searchTerm)
  })
})