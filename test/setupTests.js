import 'raf/polyfill'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as dotenv from 'dotenv'

configure({ adapter: new Adapter() })

dotenv.config()
