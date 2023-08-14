import ERROR from '../constants/ERROR'

export default (value: string) => {
  return Object.values(ERROR).includes(value as ERROR)
}
