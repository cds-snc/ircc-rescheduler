### Adding Locations

1. **Create** a new location (JavaScript) file `the-new-location.js`

2. **Add** it to the locations directory `ircc-rescheduler/src/locations/the-new-location.js`

3. The location file contain should have the following data / properties

```javascript
module.exports = {
  id: 'the-new-location',
  email: 'the-new-location@example.com',
  phone: '1-888-111-1111',
  receivingEmail:
    'the-new-location@example.com',
  recurring: {
    jan: ['mon', 'tues'],
    feb: ['mon', 'tues'],
    mar: ['mon', 'tues'],
    apr: ['mon', 'tues'],
    may: ['mon', 'tues'],
    jun: ['mon', 'tues'],
    jul: ['mon', 'tues'],
    aug: ['mon', 'tues'],
    sep: ['mon', 'tues'],
    oct: ['mon', 'tues'],
    nov: ['mon', 'tues'],
    dec: ['mon', 'tues'],
  },
}
```

**Note:**
The the name of the location file should match the id property

```javascript
module.exports = {
  id: 'the-new-location',
```

The id/name of file `the-new-location` will be used as the sub-domain

```
https://the-new-location.rescheduler-dev.cds-snc.ca
```

4. **Whitelist** the domain

The locations `index page` (/src/locations/index.js) contains a whitelist array of locations

Add the new location to the whitelist

```diff
/* ircc-rescheduler/src/locations/index.js */
- export const whitelist = ['vancouver', 'calgary', 'montreal']
+ export const whitelist = ['vancouver', 'calgary', 'montreal', 'the-new-location']
```

5. **Review and Deploy** your updates.

### Updating location properties

1. Locate the location file you need to make an update to i.e.
`ircc-rescheduler/src/locations/calgary.js`

2. Make your edits and save accordingly

<hr>

### Example:

Updating the available days for a location

Locate the recurring property in the location file

```javascript
 recurring: {
    ...
 }
 ```
 
Locate the month where you need to make the change
 
 ```
 recurring: {
    jan: ['tues', 'thurs'],
    ...
 }
 ```
 
 Update the available days for the month

  ```diff
  - jan: ['tues', 'thurs']
  
  + jan: ['mon', 'fri']
 ```

 <hr>


3. **Review and Deploy** your updates


### Blocked Days

If you need to block days i.e. holidays you can add a `blocked` property to the location file to block access to specific dates.

```javascript
recurring: {
    jan: ['tues', 'wed'],
    feb: ['tues', 'wed'],
    ...
  },
blocked: '2018-10-02, 2018-10-03, 2018-11-21', // use CSV format 
```

### Location File Properties

- Required String `id`: used for the subdomain.  Needs to match the location filename
- Required String `email`: publicly displayed in the app i.e. on the Cancel Page `/cancel`
- Required String `phone`: publicly displayed in the app i.e. on the Cancel Page `/cancel`
- Required String `receivingEmail`: email that will be used to send `staff` email (publicly displayed)
- Required Object `recurring`: Used to determine available days for a location. This property takes a month property and days in the month that will be available.  

```javascript
recurring: {
    jan: ['tues', 'wed'],
    feb: ['tues', 'wed'],
    ...
  },
```
Note: `recurring` can be empty object if using `checkLocationDays`

- Optional `blocked`: CSV string containing dates that should be blocked i.e. holidays
- Optional `checkLocationDays` function that can be used to handle custom day logic in place of the default `recurring` setup


### Using Custom Location Day Logic (if needed)

Each location can contain a custom checkLocationDays function.  This function can be used in place of the recurring property (days of the week setup).

#### Example:
```javascript
module.exports = {
  email: 'the-new-location@example.com',
  phone: '1-888-242-2100',
  recurring: {
    ...
  },
  checkLocationDays: (location, month, date) => {
   
    // dates pulled in from a resource as an array of dates
    // const dates = ['2018-10-17', '2018-11-06', '2018-11-07']
    
    const dateFormatted = format(date, 'YYYY-MM-DD')
    
    // if the date is contained in the date array return true
    if (dates[dateFormatted]) {
      return { valid: true }
    }

    // date wasn't found return false
    return { valid: false }
   
  },
}
```