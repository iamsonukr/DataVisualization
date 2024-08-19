import mongoose from 'mongoose';
import mongooseLong from 'mongoose-long';

mongooseLong(mongoose);
const Long = mongoose.Schema.Types.Long;

// Define the Customer schema
const customerSchema = new mongoose.Schema({
    _id: { type: Long, required: true },
    addresses: [{
        id: { type: Long, required: true },
        customer_id: { type: Long, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        company: { type: String, default: null },
        address1: { type: String, required: true },
        address2: { type: String, default: null },
        city: { type: String, required: true },
        province: { type: String, required: true },
        country: { type: String, required: true },
        zip: { type: String, required: true },
        phone: { type: String, default: null },
        name: { type: String, default: "" },
        province_code: { type: String, default: null },
        country_code: { type: String, default: "" },
        country_name: { type: String, default: "" },
        default: { type: Boolean, required: true }
    }],
    admin_graphql_api_id: { type: String, required: true },
    created_at: { type: Date, required: true },
    currency: { type: String, default: "" },
    default_address: {
        id: { type: Long, required: true },
        customer_id: { type: Long, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        company: { type: String, default: null },
        address1: { type: String, required: true },
        address2: { type: String, default: null },
        city: { type: String, required: true },
        province: { type: String, required: true },
        country: { type: String, required: true },
        zip: { type: String, required: true },
        phone: { type: String, default: null },
        name: { type: String, default: "" },
        province_code: { type: String, default: null },
        country_code: { type: String, default: "" },
        country_name: { type: String, default: "" },
        default: { type: Boolean, required: true }
    },
    email: { type: String, required: true },
    email_marketing_consent: {
        state: { type: String, required: true },
        opt_in_level: { type: String, required: true },
        consent_updated_at: { type: Date, default: null }
    },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    last_order_id: { type: Long, default: null },
    last_order_name: { type: String, default: null },
    multipass_identifier: { type: String, default: null },
    note: { type: String, default: null },
    orders_count: { type: Number, required: true },
    phone: { type: String, default: null },
    sms_marketing_consent: { type: String, default: null },
    state: { type: String, required: true },
    tags: { type: String, default: "" },
    tax_exempt: { type: Boolean, required: true },
    tax_exemptions: { type: [String], default: [] },
    total_spent: { type: String, required: true },
    updated_at: { type: Date, required: true },
    verified_email: { type: Boolean, required: true }
});

// Create the Customer model
const Customer = mongoose.model('Customer', customerSchema);

// Connection to MongoDB and fetch data
async function fetchCustomers() {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/RQ_Analytics?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");

        // Fetch all customers
        const customers = await Customer.find({});
        console.log("Fetched Customers:", customers);

    } catch (error) {
        console.error("Error fetching customers:", error);
    } finally {
        // Close the MongoDB connection
        mongoose.connection.close();
    }
}

// Run the fetch function
fetchCustomers();
