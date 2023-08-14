export { default } from './ui/WelcomeScreen'

export { default as useWelcomeScreenStore } from './model/store/useWelcomeScreenStore'

export {
  getLocalWelcomeScreenShowed,
  setLocalWelcomeScreenShowed,
} from './lib/utils/localWelcomeScreen'

export { default as isWelcomeScreenError } from './lib/utils/isWelcomeScreenError'
