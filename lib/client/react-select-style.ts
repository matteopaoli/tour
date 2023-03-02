import { StylesConfig } from 'react-select'
import { Option } from '../../types'

const customStyle: StylesConfig<Option, false> = {
  option: (defaultStyles, state) => ({
    ...defaultStyles,
    color: state.isSelected ? "#fff" : "#212529",
    backgroundColor: state.isSelected ? "hsl(229, 53%,  53%)" : "#fff",
  }),
  container: (defaultStyles) => ({
    ...defaultStyles,
    height: '50px'
  }),
  control: (defaultStyles) => ({
    ...defaultStyles,
    height: '50px'
  }),
}

export default customStyle  