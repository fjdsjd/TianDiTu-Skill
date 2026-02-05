# Testing Tianditu Applications

## 1. Unit Testing
Since Tianditu API is a global `T` object, you can mock it for unit tests.

### Jest Example
```javascript
// Mock T object
global.T = {
    Map: jest.fn(() => ({
        centerAndZoom: jest.fn(),
        addControl: jest.fn()
    })),
    Lnglat: jest.fn(),
    Control: {
        Zoom: jest.fn(),
        Scale: jest.fn()
    }
};

test('Map initialization calls centerAndZoom', () => {
    initMap(); // Your function that calls new T.Map()
    expect(T.Map).toHaveBeenCalled();
});
```

## 2. Integration Testing
Use Selenium or Cypress to verify map loads in the browser.

### Cypress Example
```javascript
describe('Map Test', () => {
    it('Loads the map container', () => {
        cy.visit('index.html');
        cy.get('#mapDiv').should('be.visible');
        // Check if map tiles are loaded (check for canvas or img tags inside mapDiv)
        cy.get('#mapDiv img').should('have.length.gt', 0);
    });
});
```

## 3. Performance Testing
*   **Tile Caching**: Tianditu tiles are cached by the browser. Ensure correct headers are sent.
*   **Network**: Check Network tab for tile load times.
*   **Memory**: Monitor heap usage when adding thousands of markers. Use `ClusterMarker` for large datasets.
