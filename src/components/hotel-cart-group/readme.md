# hotel-cart-group



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type         | Default     |
| ----------- | ------------ | ----------- | ------------ | ----------- |
| `hotelName` | `hotel-name` |             | `string`     | `undefined` |
| `item`      | --           |             | `RoomData[]` | `[]`        |


## Dependencies

### Used by

 - [hotel-cart-list](../hotel-cart-list)

### Depends on

- [hotel-cart-card](../hotel-cart-card)

### Graph
```mermaid
graph TD;
  hotel-cart-group --> hotel-cart-card
  hotel-cart-card --> app-button
  hotel-cart-list --> hotel-cart-group
  style hotel-cart-group fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
