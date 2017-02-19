# Description
[https://www.codewars.com/kata/52e1476c8147a7547a000811/train/javascript](https://www.codewars.com/kata/52e1476c8147a7547a000811/train/javascript)

You need to write regex that will validate a password to make sure it meets the following criteria:

- At least six characters long
- contains a lowercase letter
- contains an uppercase letter
- contains a number

Valid passwords will only be alphanumeric characters.

# Test Cases

```
Test.expect(validate('fjd3IR9'), 'Expected true');
Test.expect(!validate('ghdfj32'), ' Expected false');
Test.expect(!validate('DSJKHD23'), 'Expected false');
Test.expect(!validate('dsF43'), 'Expected false');
Test.expect(validate('4fdg5Fj3'), 'Expected true');
Test.expect(!validate('DHSJdhjsU'), 'Expected false');
Test.expect(!validate('fjd3IR9.;'), 'Expected false');
Test.expect(!validate('fjd3  IR9'), 'Expected false');
Test.expect(validate('djI38D55'), 'Expected true');
Test.expect(!validate('a2.d412'), 'Expected false');
Test.expect(!validate('JHD5FJ53'), 'Expected false');
Test.expect(!validate('!fdjn345'), 'Expected false');
Test.expect(!validate('jfkdfj3j'), 'Expected false');
Test.expect(!validate('123'), 'Expected false');
Test.expect(!validate('abc'), 'Expected false');
Test.expect(validate('123abcABC'), 'Expected true');
Test.expect(validate('ABC123abc'), 'Expected true');
Test.expect(validate('Password123'), 'Expected true');
```

# Solution

```
function validate(password) {
  if(password){
    return /^[A-Za-z0-9]{6,}$/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[\d]/.test(password);
  }else{
    return false;
  }
}
```

```
function validate(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/.test(password);
}
```
