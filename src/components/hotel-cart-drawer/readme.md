# hotel-cart-drawer



<!-- Auto Generated Below -->


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [hotel-cart-list](../hotel-cart-list)
- [app-button](../app-button)

### Graph
```mermaid
graph TD;
  hotel-cart-drawer --> hotel-cart-list
  hotel-cart-drawer --> app-button
  hotel-cart-list --> hotel-cart-group
  hotel-cart-group --> hotel-cart-card
  hotel-cart-card --> app-button
  style hotel-cart-drawer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
