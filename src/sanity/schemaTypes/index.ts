import { type SchemaTypeDefinition } from 'sanity'
import categories from "@/sanity/schemaTypes/categories"
import customer from "@/sanity/schemaTypes/customer"
import deleviryZone from "@/sanity/schemaTypes/deliveryZone"
import products from "@/sanity/schemaTypes/products"
import order from "@/sanity/schemaTypes/order"
import payment from "@/sanity/schemaTypes/payment"
import shipment from "@/sanity/schemaTypes/shipment"
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categories,customer,products,deleviryZone,order,payment,shipment
  ],
}
