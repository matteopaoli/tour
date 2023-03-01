import { StylesConfig } from 'react-select'
import { LocationOption } from '../../types'

const customStyle: StylesConfig<LocationOption, false> = {
  option: (defaultStyles, state) => ({
    ...defaultStyles,
    color: state.isSelected ? "#fff" : "#212529",
    backgroundColor: state.isSelected ? "hsl(229, 53%,  53%)" : "#fff",
  })
}

export default customStyle  