import { gql } from "@apollo/client";

export const CreateVehicleMutation = gql`
    mutation CreateVehicle($vehicle: VehicleInput) {
        createVehicle(vehicle: $vehicle) {
            id
            brand
            model
        }
    }
`;
