// // import { NextRequest } from "next/server";
// // import { Address, Package } from "@/lib/helper/types";
// // import { shipengine } from "@//lib/helper/shipEngine";

// // export async function POST(req: NextRequest) {
// //   try {
// //     const {
// //       shipToAddress, // Fixed typo
// //       packages,
// //     }: { shipToAddress: Address; packages: Package[] } = await req.json();

// //     if (!shipToAddress || !packages) {
// //       return new Response(
// //         JSON.stringify({
// //           error: "Missing required fields: shipToAddress and packages",
// //         }),
// //         { status: 400 }
// //       );
// //     }

// //     const shipFromAddress: Address = {
// //       name: "Michael Smith",
// //       phone: "+1 555 987 6543",
// //       addressLine1: "456 Oak Avenue",
// //       addressLine2: "Suite 200",
// //       cityLocality: "Los Angeles",
// //       stateProvince: "CA",
// //       postalCode: "90001",
// //       countryCode: "US",
// //       addressResidentialIndicator: "no",
// //     };

// //     const carrierIds = [
// //       process.env.SHIPENGINE_FIRST_COURIER,
// //       process.env.SHIPENGINE_SECOND_COURIER,
// //       process.env.SHIPENGINE_THIRD_COURIER,
// //       process.env.SHIPENGINE_FOURTH_COURIER,
// //     ].filter((id): id is string => !!id);

// //     const shipmentDetails = await shipengine.getRatesWithShipmentDetails({
// //       shipment: {
// //         shipTo: shipToAddress,
// //         shipFrom: shipFromAddress,
// //         packages: packages,
// //       },
// //       rateOptions: { carrierIds },
// //     });

// //     console.log("Ship To Address:", shipToAddress);
// //     console.log("Packages:", packages);
// //     console.log("Shipment Details:", shipmentDetails);

// //     return new Response(
// //       JSON.stringify({ shipToAddress, packages, shipmentDetails }),
// //       { status: 200 }
// //     );
// //   } catch (error) {
// //     console.error("Error fetching shipping rates:", error);
// //     return new Response(
// //       JSON.stringify({ error: (error as Error).message || "Internal Server Error" }),
// //       { status: 500 }
// //     );
// //   }
// // }









// // code get by gpt 


// import { NextRequest } from "next/server";
// import { Address, Package } from "@/lib/helper/types";
// import { shipengine } from "@/lib/helper/shipEngine";

// export async function POST(req: NextRequest) {
//   try {
//     const { shipToAddress, packages }: { shipToAddress: Address; packages: Package[] } = await req.json();

//     if (!shipToAddress || !packages) {
//       return new Response(
//         JSON.stringify({ error: "Missing required fields: shipToAddress and packages" }),
//         { status: 400 }
//       );
//     }

//     const shipFromAddress: Address = {
//       name: "Michael Smith",
//       phone: "+1 555 987 6543",
//       addressLine1: "456 Oak Avenue",
//       addressLine2: "Suite 200",
//       cityLocality: "Los Angeles",
//       stateProvince: "CA",
//       postalCode: "90001",
//       countryCode: "US",
//       addressResidentialIndicator: "no",
//     };

//     const carrierIds = [
//       process.env.SHIPENGINE_FIRST_COURIER,
//       process.env.SHIPENGINE_SECOND_COURIER,
//       process.env.SHIPENGINE_THIRD_COURIER,
//       process.env.SHIPENGINE_FOURTH_COURIER,
//     ].filter((id): id is string => !!id);

//     if (carrierIds.length === 0) {
//       console.error("Error: No carrier IDs found in environment variables");
//       return new Response(JSON.stringify({ error: "No carrier IDs configured" }), { status: 500 });
//     }

//     console.log("Carrier IDs:", carrierIds);
//     console.log("Ship To Address:", shipToAddress);
//     console.log("Packages:", packages);

//     let shipmentDetails;
//     try {
//       shipmentDetails = await shipengine.getRatesWithShipmentDetails({
//         shipment: {
//           shipTo: shipToAddress,
//           shipFrom: shipFromAddress,
//           packages: packages,
//         },
//         rateOptions: { carrierIds },
//       });
//     } catch (shipEngineError) {
//       console.error("Error fetching shipping rates from ShipEngine:", shipEngineError);
//       return new Response(
//         JSON.stringify({ error: "Failed to fetch shipping rates" }),
//         { status: 500 }
//       );
//     }

//     console.log("Shipment Details:", shipmentDetails);

//     return new Response(
//       JSON.stringify({ shipToAddress, packages, shipmentDetails }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Unexpected server error:", error);
//     return new Response(
//       JSON.stringify({ error: "Internal Server Error" }),
//       { status: 500 }
//     );
//   }
// }



// code get by gpt 



import { NextRequest } from "next/server";
import { Address, Package } from "@/sanity/lib/helper/types";
import { shipengine } from "@/sanity/lib/helper/shipEngine";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { shipToAddress, packages }: { shipToAddress: Address; packages: Package[] } = await req.json();

    if (!shipToAddress || !packages) {
      return new Response(JSON.stringify({ error: "Missing required fields: shipToAddress and packages" }), {
        status: 400,
      });
    }

    // Ship From Address (Static for now)
    const shipFromAddress: Address = {
      name: "Michael Smith",
      phone: "+1 555 987 6543",
      addressLine1: "456 Oak Avenue",
      addressLine2: "Suite 200",
      cityLocality: "Los Angeles",
      stateProvince: "CA",
      postalCode: "90001",
      countryCode: "US",
      addressResidentialIndicator: "no",
    };

    // Load carrier IDs from environment variables
    const carrierIds = [
      process.env.SHIPENGINE_FIRST_COURIER,
      process.env.SHIPENGINE_SECOND_COURIER,
      process.env.SHIPENGINE_THIRD_COURIER,
      process.env.SHIPENGINE_FOURTH_COURIER,
    ].filter((id): id is string => !!id);

    if (carrierIds.length === 0) {
      console.error("Error: No carrier IDs found in environment variables");
      return new Response(JSON.stringify({ error: "No carrier IDs configured" }), { status: 500 });
    }

    // Log all details for debugging
    console.log("🚀 API Request Received!");
    console.log("Carrier IDs:", carrierIds);
    console.log("Ship To Address:", shipToAddress);
    console.log("Ship From Address:", shipFromAddress);
    console.log("Packages:", packages);

    let shipmentDetails;
    try {
      // Make request to ShipEngine
      shipmentDetails = await shipengine.getRatesWithShipmentDetails({
        shipment: {
          shipTo: shipToAddress,
          shipFrom: shipFromAddress,
          packages: packages,
        },
        rateOptions: { carrierIds },
      });

      console.log("✅ ShipEngine Response:", shipmentDetails);
    } catch (shipEngineError) {
      console.error("❌ Error fetching shipping rates from ShipEngine:", shipEngineError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch shipping rates", details: (shipEngineError as Error).message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ shipToAddress, packages, shipmentDetails }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Unexpected Server Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: (error as Error).message }), {
      status: 500,
    });
  }
}
