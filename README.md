# NEA-Study-App
## Networking
### Ports
* 'User Api` - 3000
* 'Group Api` - 3001
* 'User Service` - 4000

## Database
### Scehmas
#### User
* username `string` `maxLength:20` `minLength:2` `required`
* hash `string` `required`
* email `string` `maxLength:50` `minLength:2` `required`
* firstName `string` `maxLength:40` `minLength:2` `required`
* lastName `string` `maxLength:40` `minLength:2` `required`
* phoneNumber `string` `maxLength:20` `minLength:2`
#### Social
* userID `ID` `Required`
* friends `Array` `required` `maxSize:100`
* pending `Array` `maxSize:100`
* groups `Array` `maxSize:100`
#### Groups
* GroupID `ID` `Required`
* members `Array` `required` `maxSize:100`
* admins `Array` `maxSize:100`
