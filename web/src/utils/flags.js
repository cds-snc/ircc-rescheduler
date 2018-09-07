export const parseFlags = () => {
  let flags = []
  try {
    if (process.env.RAZZLE_FLAGS) {
      flags = JSON.parse(process.env.RAZZLE_FLAGS)
      // eslint-disable-next-line no-console
      console.log(
        `%c FLAGS %c ${process.env.RAZZLE_FLAGS}  `,
        'background-color: green; color: #fff; padding: 2px; font-weight: bold;',
        'background-color: #efefef; padding: 2px;',
      )
    }
  } catch (e) {
    // do nothing
  }

  return flags
}
