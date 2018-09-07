export const parseFlags = () => {
  let flags = []
  try {
    if (process.env.RAZZLE_FLAGS) {
      flags = JSON.parse(process.env.RAZZLE_FLAGS)
      console.log(
        `%c FLAGS %c ${process.env.RAZZLE_FLAGS}  `,
        'background-color: green; color: #fff; padding: 2px; font-weight: bold;',
        'background-color: #efefef; padding: 2px;',
      )
    }
  } catch (e) {
    console.log(e.message)
  }

  return flags
}
