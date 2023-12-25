# JSON Parser from scratch

# String slice vs substring

How substring works: `string.substring(start, end)`.
For example, `string.substring(0, 3)` will return the first 3 characters of the string.

How slice works: `string.slice(start, end)`.
For example, `string.slice(0, 3)` will return the first 3 characters of the string.

## Code

### Example 1

```javascript
let str = 'Hello, World!'

// Using slice
let sliced = str.slice(7, 12) // "World"

// Using substring
let substringed = str.substring(7, 12) // "World"
```

Both `slice` and `substring` extract "World" from the string. The start index is inclusive, and the end index is exclusive.

### Example 2: Negative Indices

```javascript
let str = 'Hello, World!'

// Using slice with negative index
let sliced = str.slice(-6, -1) // "World"

// Using substring with negative index
let substringed = str.substring(-6, -1) // "" (Empty string)
```

`slice` correctly handles the negative indices, counting from the end of the string. `substring`, however, treats negative indices as 0.

### Example 3: Swapping Indices

```javascript
let str = 'Hello, World!'

// Using slice with indices swapped
let sliced = str.slice(12, 7) // "" (Empty string)

// Using substring with indices swapped
let substringed = str.substring(12, 7) // "World"
```

In `substring`, if the second parameter is smaller than the first, the method swaps them. `slice` doesn't swap and returns an empty string if the start index is greater than the end index.

### Example 4: Handling Out-of-Bounds Indices

```javascript
let str = 'Hello, World!'

// Using slice with out-of-bounds index
let sliced = str.slice(7, 50) // "World!"

// Using substring with out-of-bounds index
let substringed = str.substring(7, 50) // "World!"
```

Both methods handle out-of-bounds indices by going up to the end of the string.

### Example 5: Remove last character with -1

```javascript
let str = 'Hello, World!'
let sliced = str.slice(0, -1) // "Hello, World"
let substringed = str.substring(0, -1) // "Hello, World"
```
