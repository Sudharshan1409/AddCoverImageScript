const gql = require('graphql-tag');
const addFileMutation = gql`
  mutation addFile(
    $DestinationKey: String!
    $SourceBucket: String!
    $SourceKey: String!
    $SourceRegion: String!
  ) {
    add_File_async(
      input: {
        SourceBucket: $SourceBucket
        SourceKey: $SourceKey
        SourceRegion: $SourceRegion
        DestinationKey: $DestinationKey
      }
    ) {
      error
      result {
        id
        tx_id
        tx_version
      }
    }
  }
`;
const getUrl = gql`
  query get_File($id: ID!) {
    get_File(id: $id) {
      TemporaryUrl
    }
  }
`;
const updateEvent = gql`
  mutation MyMutation(
    $media_id: String!
    $media_type: String!
    $id: ID!
    $date: String!
    $node_created: String!
    $sub_type: String!
    $type: String!
    $animal_id: String!
    $address1: String
    $address2: String
    $city: String
    $state: String
    $zipcode: String
    $location_description: String
  ) {
    updateEvent_async(
      id: $id
      input: {
        media: { media_id: $media_id, media_type: $media_type }
        animal_id: $animal_id
        date: $date
        node_created: $node_created
        sub_type: $sub_type
        type: $type
        address1: $address1
        address2: $address2
        city: $city
        state: $state
        zipcode: $zipcode
        location_description: $location_description
      }
    ) {
      error
      result {
        id
        submission_time
        tx_id
      }
    }
  }
`
const additional_color_schema = {
    $group: String,
    $name: String
  }

const other_ids_schema = {
    $id: String,
    $id_type: String,
    $issuer: String,
}

const updateAnimal = gql`
mutation MyMutation(
  $id: ID!, 
  $type: String!, 
  $primary_color: String!, 
  $primary_color_group: String!,
  $additional_color_groups_string: [String],
  $additional_colors: [additional_colors_elementInput],
  $species: String,
  $site_id: String,
  $size: String,
  $sex: String,
  $primary_breed: String,
  $secondary_breed: String,
  $other_ids_string: String,
  $name: String,
  $node_created: String,
  $node_modified: String,
  $organization_id: String,
  $is_mixed_breed: Boolean,
  $is_unknown_breed: Boolean,
  $date_created: String,
  $date_modified: String,
  $date_of_birth: String,
  $altered_status: String,
  $animal_description: String,
  $coat: String,
  $color_pattern: String,
  $other_ids: [other_ids_elementInput],
  $approximate_age: Float,
  $weight: Float,
  $cover_image_media_id: String,
  ) {
  updateAnimal_async(
    id: $id, 
    input: 
    {
      type: $type,
      other_ids: $other_ids,
      approximate_age: $approximate_age,
      weight: $weight,
      primary_color: $primary_color, 
      primary_color_group: $primary_color_group, 
      cover_image_media_id: $cover_image_media_id,
      additional_color_groups_string: $additional_color_groups_string,
      additional_colors: $additional_colors,
      altered_status: $altered_status,
      animal_description: $animal_description,
      coat: $coat,
      color_pattern: $color_pattern,
      date_created: $date_created,
      date_modified: $date_modified,
      date_of_birth: $date_of_birth,
      is_mixed_breed: $is_mixed_breed,
      is_unknown_breed: $is_unknown_breed,
      name: $name,
      node_created: $node_created,
      node_modified: $node_modified,
      organization_id: $organization_id,
      other_ids_string: $other_ids_string,
      primary_breed: $primary_breed,
      secondary_breed: $secondary_breed,
      sex: $sex,
      site_id: $site_id,
      size: $size,
      species: $species,
    }
  ) {
    result {
      id
      submission_time
    }
    error
  }
}
`

const getAnimal = gql`
query getAnimal($id: ID!) {
  getAnimal(id: $id) {
    additional_color_groups_string
    additional_colors {
        group
        name
    }
    altered_status
    animal_description
    approximate_age
    coat
    color_pattern
    cover_image_media_id
    date_created
    date_modified
    date_of_birth
    id
    is_mixed_breed
    is_unknown_breed
    name
    node_created
    node_modified
    organization_id
    other_ids {
        id
        id_type
        issuer
    }
    other_ids_string
    primary_breed
    primary_color
    primary_color_group
    secondary_breed
    sex
    site_id
    size
    species
    type
    weight
  }
}
`;

const listEvents = gql`
  query listEvents($animal_id: String!) {
    listEvents(filter: {animal_id: {eq: $animal_id}}) {
      Events {
        id
        media {
            media_id
        }
      }
    }
  }
`;
const getEvent = gql`
  query getEvent($id: ID!) {
    getEvent(id: $id) {
      id
      type
      sub_type
      animal_id
      address1
      address2
      city
      state
      zipcode
      site_id
      node_created
      organization_id
      location_description
    }
  }
`
const listAnimals = gql`
    query MyQuery {
        listAnimals {
            Animals {
                additional_color_groups_string
                additional_colors {
                    group
                    name
                }
                altered_status
                animal_description
                approximate_age
                coat
                color_pattern
                cover_image_media_id
                date_created
                date_modified
                date_of_birth
                id
                is_mixed_breed
                is_unknown_breed
                name
                node_created
                node_modified
                organization_id
                other_ids {
                    id
                    id_type
                    issuer
                }
                other_ids_string
                primary_breed
                primary_color
                primary_color_group
                secondary_breed
                sex
                site_id
                size
                species
                type
                weight
            }
        }
    }
`
module.exports = { addFileMutation, getUrl, updateEvent, listEvents, getEvent, listAnimals, updateAnimal, getAnimal }
