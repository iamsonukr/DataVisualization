import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import mongooseLong from 'mongoose-long';

// Add support for Long type in Mongoose
mongooseLong(mongoose);
const Long = mongoose.Schema.Types.Long;

const uri = "mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function inferSchema() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db('RQ_Analytics');
        const collection = db.collection('shopifyOrders');

        // Get a sample document
        const sample = await collection.findOne();
        console.log('Sample Document:', sample);

        // Infer schema based on the sample
        const schema = {};
        for (const key in sample) {
            if (sample.hasOwnProperty(key)) {
                schema[key] = typeof sample[key];
            }
        }

        console.log('Inferred Schema:', schema);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

inferSchema();
