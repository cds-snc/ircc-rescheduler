### Updating locations

1. Locate the location file you need to make an update to i.e.
`ircc-rescheduler/web/src/locations/calgary.js`

2. Make your edits and save accordingly


### Adding Locations

1. Create a new location (JavaScript) file `the-new-location.js`

2. Add it to the locations directory `ircc-rescheduler/web/src/locations/the-new-location.js`

3. The location contain should have the following data / properties

```
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

Note: 
The the name of the location file should match the id property
```
module.exports = {
  id: 'the-new-location',
```

The id/name of file `the-new-location` will be used as the sub-domain

```
https://the-new-location.rescheduler-dev.cds-snc.ca
```

4. Whitelist the domain

The locations `index page` (`ircc-rescheduler/web/src/locations/index.js`) contains a whitelist array of locations


Add the new location to the whitelist

```
- export const whitelist = ['vancouver', 'calgary', 'montreal']
+ export const whitelist = ['vancouver', 'calgary', 'montreal', 'the-new-location']
```

That's it.

### Blocked Days

If you need to block days i.e. holidays you can add a `blocked` property to the location file to block access to specific dates.

```
recurring: {
    jan: ['tues', 'wed'],
    feb: ['tues', 'wed'],
    ...
  },
blocked: '2018-10-02, 2018-10-03, 2018-11-21', // use CSV format 
```

#### Location File Properties

- Required String `id`: used for the subdomain.  Needs to match the location filename
- Required String `email`: publicly displayed in the app i.e. on the Cancel Page `/cancel`
- Required String `phone`: publicly displayed in the app i.e. on the Cancel Page `/cancel`
- Required String `receivingEmail`: email that will be used to send `staff` email (publicly displayed)
- Required Object `recurring`: Used to determine available days for a location. This property takes a month property and days in the month that will be available.  
```
recurring: {
    jan: ['tues', 'wed'],
    feb: ['tues', 'wed'],
    ...
  },
```
Note: can be empty if using checkLocationDays

- Optional `blocked`: CSV string containing dates that should be blocked i.e. holidays
- Optional `checkLocationDays` function that can be used to handle custom day logic in place of the default `recurring` setup



### Using Custom Location Day Logic (if needed)

Each location can contain a custom checkLocationDays function.  This function can be used in place of the recurring property (days of the week setup).

#### Example:
```
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