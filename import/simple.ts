import weaviate, { type WeaviateClient } from "weaviate-client";
import 'dotenv/config'

import * as fs from 'fs';
import { join } from 'path';
import { parse } from 'csv-parse/sync';

let client: WeaviateClient | null = null;

async function initClient() {
    if (!client) {
        client = await weaviate.connectToWeaviateCloud(process.env.NUXT_WEAVIATE_HOST_URL || '', {
            authCredentials: new weaviate.ApiKey(process.env.NUXT_WEAVIATE_ADMIN_KEY!!),
            headers: {
                "X-Cohere-Api-Key": process.env.NUXT_COHERE_API_KEY!!,
                "X-OpenAI-Api-Key": process.env.NUXT_OPENAI_API_KEY!!,
                'X-Anthropic-Api-Key': process.env.NUXT_CLAUDE_API_KEY!!,
            },
        });
    }

    const ready = await client.isReady()
    console.info('Client is ready?', ready)
    return client
}

async function createCollection() {
    client = await initClient()

    const trailsResponse = await client.collections.create({
        name: "TestTrail",
        vectorizers: weaviate.configure.vectorizer.text2VecCohere({
            model: 'embed-multilingual-v3.0',
            sourceProperties: ['trail_name', 'difficulty', 'location', 'description', 'tags', 'length'] // change these
        }),
        generative: weaviate.configure.generative.openAI() // change to anthropic once added by tommy
    })

    const productsResponse = await client.collections.create({
        name: "TestProduct",
        vectorizers: weaviate.configure.vectorizer.text2VecCohere({
            model: 'embed-multilingual-v3.0',
            sourceProperties: ['name', 'sub_category'] // change these
        }),
        generative: weaviate.configure.generative.openAI() // change to anthropic once added by tommy
    })

}

async function importProductData(fileName: string, collectionName: string) {
    client = await initClient();
    const filePath = join(process.cwd(), `./public/${fileName}`);
    const content = await fs.readFileSync(filePath)
    // Parse the CSV content
    console.log('content', content)
    const records = parse(content, { delimiter: ';' });

    const myCollection = client.collections.get(collectionName);
    let itemsToInsert = [];
    let counter = 0;

    for (const item of records) {
        counter++
        if (counter % 1000 == 0) {
            console.log(`Import: ${counter}`);
        }
    
        itemsToInsert.push({
            name: item[0],
            main_category: item[1],
            sub_category: item[2],
            image: item[3],
            link: item[4],
            rating: item[5],
            price: item[8]
        });

        // insert data in batches of 2k objects
        if (itemsToInsert.length == 2000) {
            const response = await myCollection.data.insertMany(itemsToInsert);
            itemsToInsert = [];

            if (response.hasErrors) {
                throw new Error("Something went wrong in import!");
            }
        }
    }

    // insert the remaining objects
    if (itemsToInsert.length > 0) {
        const response = await myCollection.data.insertMany(itemsToInsert);

        if (response.hasErrors) {
            throw new Error("Something went wrong in import!");
        }
    }

    return { status: "Import Complete" };
}

async function importTrailData(fileName: string, collectionName: string) {
    client = await initClient();
    const filePath = join(process.cwd(), `./public/${fileName}`);
    const content = await fs.readFileSync(filePath)
    // Parse the CSV content
    console.log('content', content)
    const records = parse(content);
    
    const myCollection = client.collections.get(collectionName);
    let itemsToInsert = [];
    let counter = 0;


    for (const item of records) {
        counter++
        if (counter % 1000 == 0) {
            console.log(`Import: ${counter}`);
        }

        itemsToInsert.push({
            trail_name: item[0],
            link_AllTrails: item[1],
            image: item[2],
            difficulty: item[3],
            average_rating: item[4],
            location: item[6],
            location_sec: item[7],
            length: item[8],
            description: item[8],
            tag: item[10]
        });

        // insert data in batches of 2k objects
        if (itemsToInsert.length == 2000) {
            const response = await myCollection.data.insertMany(itemsToInsert);
            itemsToInsert = [];

            if (response.hasErrors) {
                throw new Error("Something went wrong in import!");
            }
        }
    }

    // insert the remaining objects
    if (itemsToInsert.length > 0) {
        const response = await myCollection.data.insertMany(itemsToInsert);

        if (response.hasErrors) {
            throw new Error("Something went wrong in import!");
        }
    }

    return { status: "Import Complete" };
}

// Uncomment to create collection and import data before you run script
// await createCollection()
// await importProductData('products.csv','TestProduct')
// await importTrailData('trails.csv', 'TestTrail')