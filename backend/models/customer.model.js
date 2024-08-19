// import mongoose from 'mongoose';

// const customerSchema = new mongoose.Schema({
//     _id: { type: String},
//     addresses: {type:Array}, // Array of addresses
//     admin_graphql_api_id: { type: String },
//     created_at: { type: Date },
//     currency: { type: String, default: "" },
//     default_address: { type: Array }, // Embedded address object
//     email: { type: String },
//     email_marketing_consent:  { type: Array }, // Embedded email marketing consent object
//     first_name: { type: String },
//     id: { type: String },
//     last_name: { type: String },
//     last_order_id: { type: String },
//     last_order_name: { type: String },
//     multipass_identifier: { type: String },
//     note: { type: String },
//     orders_count: { type: Number, default: 0 },
//     phone: { type:Number },
//     sms_marketing_consent: { type:String},
//     state: { type: String },
//     tags: { type: String },
//     tax_exempt: { type: Boolean },
//     tax_exemptions: { type: [String], default: [] },
//     total_spent: { type: String },
//     updated_at: { type: Date },
//     verified_email: { type: Boolean }
// });

// // Use this approach to avoid redefining the model in case of hot reloads or similar scenarios
// const customerModel = mongoose.models.shopifyCustomers || mongoose.model('shopifyCustomers', customerSchema);

// export default customerModel;

import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    _id: { type: String }, // Assuming you're using mongoose-long for large numbers
    addresses: { type: Array }, // Array of addresses, basic array type
    admin_graphql_api_id: { type: String },
    created_at: { type: Date },
    currency: { type: String },
    default_address: { type: Object }, // Storing as a general object without schema
    email: { type: String },
    email_marketing_consent: { type: Object }, // General object type
    first_name: { type: String },
    id: { type: String }, // Long type for large IDs
    last_name: { type: String },
    last_order_id: { type: mongoose.Schema.Types.Mixed, default: null }, // Mixed type to accommodate null
    last_order_name: { type: mongoose.Schema.Types.Mixed, default: null }, // Mixed type for flexibility
    multipass_identifier: { type: mongoose.Schema.Types.Mixed, default: null }, // Mixed type for flexibility
    note: { type: mongoose.Schema.Types.Mixed, default: null }, // Mixed type for flexibility
    orders_count: { type: Number, default: 0 },
    phone: { type: mongoose.Schema.Types.Mixed, default: null }, // Mixed type for null values
    sms_marketing_consent: { type: mongoose.Schema.Types.Mixed, default: null }, // Mixed type for null values
    state: { type: String },
    tags: { type: String },
    tax_exempt: { type: Boolean },
    tax_exemptions: { type: Array, default: [] }, // Array of tax exemptions
    total_spent: { type: String, default: "0.00" },
    updated_at: { type: Date },
    verified_email: { type: Boolean }
});

// Model for customers collection
const customerModel = mongoose.model('shopifyCustomers', customerSchema);

export default customerModel;

