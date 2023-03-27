# Post-Tonal Theory Library
A simple JavaScript library for post-tonal music theory analysis, focusing on pitch class set operations. The library contains a single module with the PitchClassSet class, which provides methods for constructing pitch class sets, finding normal order, prime form, inverting, transposing, and other related operations.

## Installation
To install the library, clone the repository and run npm install in the project folder.
```
git clone https://github.com/yourusername/post-tonal_theory.git
cd post-tonal_theory
npm install
```

## Usage
Import the PitchClassSet class and create a new instance with a pitch class set.

```
const { PitchClassSet } = require('./path/to/PitchClassSet');
const pcs = new PitchClassSet([0, 4, 7]);
```

## Methods
```
constructor(pcs = [])
```
Construct a new PitchClassSet object. The input pcs array should contain pitch classes as integers.

```
static getInterval(bottom, top)
```
Return the interval between two pitch classes.

```
print()
```
Print the pitch class set to the console.

```
invert(n)
```
Invert the pitch class set around the given pitch class n.

```
sort()
```
Sort the pitch class set in ascending order.

```
getSetLength()
```
Return the number of pitch classes in the set.

```
transpose(n)
```
Transpose the pitch class set by the given interval n.

```
findNormalOrder()
```
Find and return the normal order of the pitch class set.

```
primeForm()
```
Find and return the prime form of the pitch class set.

## Running Tests
The library includes a set of unit tests that can be run using the npm test command.

```
npm test
```
This will run the Jest test suite for the PitchClassSet class, covering the basic functionality of the class and its methods.

## Contributing
If you'd like to contribute to the project by adding new features or improving existing code, feel free to fork the repository, make changes, and submit pull requests. Please ensure that any changes pass the existing test suite and include new tests if necessary. 

## License
This library is released under the ISC License.
