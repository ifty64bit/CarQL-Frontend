import { gql } from "@apollo/client";

export const GET_ALL_VEHICLES = gql`
    query Vehicles {
        vehicles {
            count
            Vehicles {
                id
                brand
                model
                hourly_rate
                transmission
                type
                user {
                    name
                }
            }
        }
    }
`;
