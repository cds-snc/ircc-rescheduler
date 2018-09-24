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

That's it.

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