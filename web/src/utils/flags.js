export const parseFlags = () => {
  let flags = []
  try {
    if (process.env.RAZZLE_FLAGS) {
      flags = JSON.parse(process.env.RAZZLE_FLAGS)
    }
  } catch (e) {
    // do nothing
  }

  return flags
}
