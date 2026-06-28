import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true,
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
  },
  customerPhone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  customerAddress: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
  customerEmail: {
    type: String,
    trim: true,
    lowercase: true,
    default: '',
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    name: String,
    price: Number,
    quantity: Number,
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  deliveryCharges: {
    type: Number,
    default: 0,
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'Bank Transfer', 'JazzCash', 'EasyPaisa'],
    default: 'COD',
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  notes: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Remove any existing pre-save hooks
// Simple function to generate order number
function generateOrderNumber(): string {
  const date = new Date();
  const prefix = 'ORD';
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `${prefix}-${year}${month}${day}-${random}`;
}

// Use function declaration instead of arrow function for pre-save
OrderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
export { generateOrderNumber };
